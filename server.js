import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";
import {
  initDb,
  getPublishedPosts,
  getPostBySlug,
  getAllArticlesAdmin,
  getArticleByIdAdmin,
  createArticle,
  updateArticle,
  deleteArticle,
  publishArticle,
  getReferenceOptions,
  getAdminByEmail,
} from "./db.js";

dotenv.config({ path: ".env.local" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(express.json({ limit: "10mb" }));

/*
|--------------------------------------------------------------------------
| Static Uploads Directory & Multer Configuration
|--------------------------------------------------------------------------
*/

const uploadsDir = path.join(__dirname, "public", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve uploaded files statically at /uploads
app.use("/uploads", express.static(uploadsDir));

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const sanitizedBase = path
      .basename(file.originalname, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-");
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e6);
    cb(null, `${sanitizedBase}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (_req, file, cb) => {
    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/svg+xml",
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid image format. Use JPG, PNG, WebP, GIF, or SVG."));
    }
  },
});

/*
|--------------------------------------------------------------------------
| Dynamic Sitemap
|--------------------------------------------------------------------------
*/

const SITE_URL = "https://fexkode.com";

const STATIC_SITEMAP_PAGES = [
  "/",
  "/about",
  "/solutions",
  "/cloud-services",
  "/industries",
  "/case-studies",
  "/blog",
  "/contact",
  "/solutions/cloud-migration",
  "/solutions/devops-automation",
  "/solutions/managed-cloud",
  "/solutions/cloud-security",
  "/solutions/kubernetes-containers",
  "/solutions/data-cloud-platform",
];

function escapeXml(value) {
  return String(value || "").replace(/[<>&'"]/g, (char) => {
    switch (char) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return char;
    }
  });
}

app.get("/sitemap.xml", async (_req, res) => {
  try {
    const staticUrls = STATIC_SITEMAP_PAGES.map((page) => ({
      loc: page === "/" ? `${SITE_URL}/` : `${SITE_URL}${page}`,
    }));

    let articleUrls = [];
    try {
      const articles = await getPublishedPosts();
      articleUrls = (articles || []).map((article) => ({
        loc: `${SITE_URL}/blog/${article.slug}`,
        lastmod: article.updatedAt || article.publishedAt,
      }));
    } catch (dbError) {
      console.error("Sitemap: unable to fetch articles from PostgreSQL:", dbError.message);
    }

    const seen = new Set();
    const allUrls = [...staticUrls, ...articleUrls].filter((entry) => {
      if (seen.has(entry.loc)) return false;
      seen.add(entry.loc);
      return true;
    });

    const urlEntries = allUrls
      .map((entry) => {
        const lastmod = entry.lastmod
          ? `\n    <lastmod>${escapeXml(new Date(entry.lastmod).toISOString())}</lastmod>`
          : "";
        return `  <url>\n    <loc>${escapeXml(entry.loc)}</loc>${lastmod}\n  </url>`;
      })
      .join("\n\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\n${urlEntries}\n\n</urlset>`;

    res.setHeader("Content-Type", "application/xml; charset=UTF-8");
    return res.status(200).send(xml);
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return res.status(500).send("Unable to generate sitemap.");
  }
});

/*
|--------------------------------------------------------------------------
| Public Blog API Endpoints
|--------------------------------------------------------------------------
*/

// GET /api/posts - Get all published posts
app.get("/api/posts", async (_req, res) => {
  try {
    const posts = await getPublishedPosts();
    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching published posts:", error);
    return res.status(500).json({ error: "Unable to load blog articles." });
  }
});

// GET /api/posts/:slug - Get single post by slug
app.get("/api/posts/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await getPostBySlug(slug);
    if (!post) {
      return res.status(404).json({ error: "Article not found." });
    }
    return res.status(200).json(post);
  } catch (error) {
    console.error(`Error fetching post ${req.params.slug}:`, error);
    return res.status(500).json({ error: "Unable to load this article." });
  }
});

/*
|--------------------------------------------------------------------------
| Admin Authentication Helper & Middleware
|--------------------------------------------------------------------------
*/

function getAdminToken(req) {
  const cookieHeader = req.headers.cookie || "";
  const tokenCookie = cookieHeader
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith("admin_token="));

  if (!tokenCookie) {
    return null;
  }
  return tokenCookie.substring("admin_token=".length);
}

function authenticateAdmin(req, res, next) {
  try {
    const token = getAdminToken(req);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const jwtSecret = process.env.JWT_SECRET || "fexkode-default-secret";
    const decoded = jwt.verify(token, jwtSecret);

    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required.",
      });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired admin session.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| Admin Login / Logout / Verify
|--------------------------------------------------------------------------
*/

app.post("/api/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const jwtSecret = process.env.JWT_SECRET || "fexkode-default-secret";

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const adminUser = await getAdminByEmail(email);

    if (!adminUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const passwordMatches = await bcrypt.compare(password, adminUser.password_hash);

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      {
        email: adminUser.email,
        role: "admin",
      },
      jwtSecret,
      {
        expiresIn: "8h",
      }
    );

    res.setHeader(
      "Set-Cookie",
      `admin_token=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=28800`
    );

    return res.status(200).json({
      success: true,
      message: "Login successful.",
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong during login.",
    });
  }
});

app.get("/api/admin/verify", (req, res) => {
  try {
    const token = getAdminToken(req);
    if (!token) {
      return res.status(401).json({ authenticated: false });
    }

    const jwtSecret = process.env.JWT_SECRET || "fexkode-default-secret";
    const decoded = jwt.verify(token, jwtSecret);

    if (decoded.role !== "admin") {
      return res.status(401).json({ authenticated: false });
    }

    return res.status(200).json({
      authenticated: true,
      email: decoded.email,
    });
  } catch {
    return res.status(401).json({ authenticated: false });
  }
});

app.post("/api/admin/logout", (_req, res) => {
  res.setHeader(
    "Set-Cookie",
    "admin_token=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0"
  );
  return res.status(200).json({ success: true });
});

/*
|--------------------------------------------------------------------------
| Admin Image Upload
|--------------------------------------------------------------------------
*/

app.post(
  "/api/admin/upload-image",
  authenticateAdmin,
  upload.single("image"),
  (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No image was uploaded.",
        });
      }

      const imageUrl = `/uploads/${req.file.filename}`;

      return res.status(200).json({
        success: true,
        message: "Image uploaded successfully.",
        url: imageUrl,
        assetId: req.file.filename,
        asset: {
          _type: "image",
          url: imageUrl,
          asset: {
            _type: "reference",
            _ref: req.file.filename,
          },
        },
      });
    } catch (error) {
      console.error("Image upload error:", error);
      return res.status(500).json({
        success: false,
        message: error?.message || "Unable to upload image.",
      });
    }
  }
);

/*
|--------------------------------------------------------------------------
| Admin Authors & Categories Reference Options
|--------------------------------------------------------------------------
*/

app.get("/api/admin/reference-options", authenticateAdmin, async (_req, res) => {
  try {
    const options = await getReferenceOptions();
    return res.status(200).json({
      success: true,
      authors: options.authors || [],
      categories: options.categories || [],
    });
  } catch (error) {
    console.error("Reference options fetch error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to load author and category options.",
    });
  }
});

/*
|--------------------------------------------------------------------------
| Admin Articles CRUD
|--------------------------------------------------------------------------
*/

// GET /api/admin/articles - List all articles
app.get("/api/admin/articles", authenticateAdmin, async (_req, res) => {
  try {
    const articles = await getAllArticlesAdmin();
    return res.status(200).json({
      success: true,
      articles,
    });
  } catch (error) {
    console.error("Admin fetch articles error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch articles from database.",
    });
  }
});

// GET /api/admin/articles/:id - Get single article
app.get("/api/admin/articles/:id", authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const article = await getArticleByIdAdmin(id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found.",
      });
    }

    return res.status(200).json({
      success: true,
      article,
      isDraft: article.status === "draft",
    });
  } catch (error) {
    console.error("Admin get article error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch the article.",
    });
  }
});

// POST /api/admin/articles - Create article
app.post("/api/admin/articles", authenticateAdmin, async (req, res) => {
  try {
    const data = req.body || {};
    if (!data.title || (!data.slug && !data.slug?.current)) {
      return res.status(400).json({
        success: false,
        message: "Article title and slug are required.",
      });
    }

    const createdArticle = await createArticle(data);

    return res.status(201).json({
      success: true,
      message: "Article created successfully.",
      article: createdArticle,
    });
  } catch (error) {
    console.error("Article creation error:", error);
    return res.status(500).json({
      success: false,
      message: error?.message || "Unable to create article in database.",
    });
  }
});

// PUT /api/admin/articles/:id - Update article
app.put("/api/admin/articles/:id", authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body || {};

    const updatedArticle = await updateArticle(id, data);

    if (!updatedArticle) {
      return res.status(404).json({
        success: false,
        message: "Article not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Article changes saved successfully.",
      article: updatedArticle,
    });
  } catch (error) {
    console.error("Article update error:", error);
    return res.status(500).json({
      success: false,
      message: error?.message || "Unable to save article changes.",
    });
  }
});

// DELETE /api/admin/articles/:id - Delete article
app.delete("/api/admin/articles/:id", authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteArticle(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Article not found or already deleted.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Article deleted successfully.",
    });
  } catch (error) {
    console.error("Article deletion error:", error);
    return res.status(500).json({
      success: false,
      message: error?.message || "Unable to delete article.",
    });
  }
});

// POST /api/admin/articles/:id/publish - Publish article
app.post("/api/admin/articles/:id/publish", authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const published = await publishArticle(id);

    if (!published) {
      return res.status(404).json({
        success: false,
        message: "Article not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Article published successfully.",
      article: published,
    });
  } catch (error) {
    console.error("Article publish error:", error);
    return res.status(500).json({
      success: false,
      message: error?.message || "Unable to publish article.",
    });
  }
});

/*
|--------------------------------------------------------------------------
| Start Server & Initialize Database
|--------------------------------------------------------------------------
*/

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  try {
    await initDb();
  } catch (err) {
    console.warn("⚠️ PostgreSQL connection note:", err.message);
    console.warn("Make sure PostgreSQL is running and DATABASE_URL in .env.local is valid.");
  }
});