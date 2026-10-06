import pg from "pg";
import dotenv from "dotenv";
import crypto from "crypto";
import bcrypt from "bcryptjs";

dotenv.config({ path: ".env.local" });

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/nexkode_db";

const isCloudOrSsl =
  connectionString.includes("sslmode=require") ||
  connectionString.includes("neon.tech") ||
  connectionString.includes("supabase.co") ||
  connectionString.includes("render.com") ||
  connectionString.includes("railway.app") ||
  connectionString.includes("aivencloud.com");

export const pool = new Pool({
  connectionString,
  ssl: isCloudOrSsl ? { rejectUnauthorized: false } : false,
  connectionTimeoutMillis: 5000,
});

/*
|--------------------------------------------------------------------------
| Schema Initialization & Auto-Migration
|--------------------------------------------------------------------------
*/

export async function initDb() {
  const client = await pool.connect();
  try {
    // 1. Admin Users Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        name TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW() 
      );
    `);

    // 2. Authors Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS authors (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        role TEXT,
        bio TEXT,
        image TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // 2. Categories Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // 3. Posts Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        excerpt TEXT,
        featured_image TEXT,
        author_id TEXT REFERENCES authors(id) ON DELETE SET NULL,
        category_id TEXT REFERENCES categories(id) ON DELETE SET NULL,
        categories JSONB DEFAULT '[]',
        published_at TIMESTAMPTZ,
        updated_at TIMESTAMPTZ,
        reading_time TEXT,
        seo_title TEXT,
        meta_description TEXT,
        primary_keyword TEXT,
        secondary_keywords JSONB DEFAULT '[]',
        canonical_url TEXT,
        show_table_of_contents BOOLEAN DEFAULT false,
        body JSONB DEFAULT '[]',
        related_articles JSONB DEFAULT '[]',
        external_references JSONB DEFAULT '[]',
        cta_title TEXT,
        cta_text TEXT,
        cta_label TEXT,
        cta_url TEXT,
        status TEXT DEFAULT 'draft',
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // Seed Default Admin User if empty
    const { rows: adminRows } = await client.query("SELECT COUNT(*) FROM admin_users");
    if (parseInt(adminRows[0].count, 10) === 0) {
      const adminEmail = process.env.ADMIN_EMAIL || "admin@nexkode.com";
      const adminPassword = process.env.ADMIN_PASSWORD || "adminpassword123";
      const passwordHash = await bcrypt.hash(adminPassword, 10);
      
      await client.query(
        `INSERT INTO admin_users (id, email, password_hash, name) VALUES ($1, $2, $3, $4)`,
        ["admin-" + crypto.randomUUID(), adminEmail, passwordHash, "System Admin"]
      );
      console.log("Seeded default admin user in database.");
    }

    // 4. Seed Default Authors if empty
    const { rows: authorRows } = await client.query("SELECT COUNT(*) FROM authors");
    if (parseInt(authorRows[0].count, 10) === 0) {
      await client.query(
        `INSERT INTO authors (id, name, role, bio, image)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          "author-nexkode-team",
          "Nexkode Team",
          "Cloud & DevOps Architects",
          "Insights and guides directly from Nexkode engineering team.",
          "/favicon.svg",
        ]
      );
      console.log("Seeded default author: Nexkode Team");
    }

    // 5. Seed Default Categories if empty
    const { rows: catRows } = await client.query("SELECT COUNT(*) FROM categories");
    if (parseInt(catRows[0].count, 10) === 0) {
      const defaultCategories = [
        { id: "cat-cloud", title: "Cloud", slug: "cloud" },
        { id: "cat-devops", title: "DevOps", slug: "devops" },
        { id: "cat-security", title: "Security", slug: "security" },
        { id: "cat-engineering", title: "Engineering", slug: "engineering" },
      ];

      for (const cat of defaultCategories) {
        await client.query(
          `INSERT INTO categories (id, title, slug) VALUES ($1, $2, $3)`,
          [cat.id, cat.title, cat.slug]
        );
      }
      console.log("Seeded default categories: Cloud, DevOps, Security, Engineering");
    }

    // 6. Seed Sample Post if empty
    const { rows: postRows } = await client.query("SELECT COUNT(*) FROM posts");
    if (parseInt(postRows[0].count, 10) === 0) {
      const samplePostId = "post-" + crypto.randomUUID();
      const sampleBody = [
        {
          _key: "block-1",
          _type: "block",
          style: "normal",
          children: [
            {
              _key: "span-1",
              _type: "span",
              text: "Modern cloud infrastructure requires reliability, automated CI/CD pipelines, and high security. In this guide, we explore the core principles that enable high-velocity engineering teams to ship resilient systems with confidence.",
            },
          ],
        },
        {
          _key: "block-2",
          _type: "block",
          style: "h2",
          children: [
            {
              _key: "span-2",
              _type: "span",
              text: "1. Infrastructure as Code & Immutable Deployments",
            },
          ],
        },
        {
          _key: "block-3",
          _type: "block",
          style: "normal",
          children: [
            {
              _key: "span-3",
              _type: "span",
              text: "By treating infrastructure configuration exactly like application source code, teams eliminate environment drift and can reproduce staging and production environments deterministically in minutes.",
            },
          ],
        },
        {
          _key: "block-4",
          _type: "block",
          style: "h2",
          children: [
            {
              _key: "span-4",
              _type: "span",
              text: "2. Observability and Proactive Monitoring",
            },
          ],
        },
        {
          _key: "block-5",
          _type: "block",
          style: "normal",
          children: [
            {
              _key: "span-5",
              _type: "span",
              text: "Comprehensive metrics, distributed tracing, and structured logging provide immediate feedback during deployments, reducing MTTR and ensuring seamless user experiences.",
            },
          ],
        },
      ];

      await client.query(
        `INSERT INTO posts (
          id, title, slug, excerpt, featured_image, author_id, category_id,
          categories, published_at, updated_at, reading_time, seo_title,
          meta_description, primary_keyword, show_table_of_contents,
          body, cta_title, cta_text, cta_label, cta_url, status
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7,
          $8, NOW(), NOW(), $9, $10,
          $11, $12, $13,
          $14, $15, $16, $17, $18, 'published'
        )`,
        [
          samplePostId,
          "Architecting Modern Cloud Solutions: Resilience, DevOps & Scale",
          "architecting-modern-cloud-solutions",
          "Discover how modern cloud architectures and automated DevOps workflows enable agile, secure, and scalable business infrastructure.",
          "/src/assets/images/page-heros/blog.jpg",
          "author-nexkode-team",
          "cat-cloud",
          JSON.stringify(["Cloud", "DevOps", "Engineering"]),
          "5 min read",
          "Architecting Modern Cloud Solutions | Nexkode",
          "Discover how modern cloud architectures and automated DevOps workflows enable agile, secure, and scalable business infrastructure.",
          "Cloud Architecture",
          true,
          JSON.stringify(sampleBody),
          "Need help modernizing your cloud infrastructure?",
          "Our certified architects design, build, and optimize scalable cloud foundations tailored to your business.",
          "Talk to an Expert",
          "/contact",
        ]
      );
      console.log("Seeded initial published blog post.");
    }

    console.log("PostgreSQL database initialized successfully.");
  } finally {
    client.release();
  }
}

/*
|--------------------------------------------------------------------------
| Query Helpers
|--------------------------------------------------------------------------
*/

function formatPostRow(row) {
  if (!row) return null;

  let categories = [];
  try {
    categories = typeof row.categories === "string" ? JSON.parse(row.categories) : (row.categories || []);
  } catch {
    categories = [];
  }

  let secondaryKeywords = [];
  try {
    secondaryKeywords = typeof row.secondary_keywords === "string" ? JSON.parse(row.secondary_keywords) : (row.secondary_keywords || []);
  } catch {
    secondaryKeywords = [];
  }

  let relatedArticles = [];
  try {
    relatedArticles = typeof row.related_articles === "string" ? JSON.parse(row.related_articles) : (row.related_articles || []);
  } catch {
    relatedArticles = [];
  }

  let externalReferences = [];
  try {
    externalReferences = typeof row.external_references === "string" ? JSON.parse(row.external_references) : (row.external_references || []);
  } catch {
    externalReferences = [];
  }

  let body = [];
  try {
    body = typeof row.body === "string" ? JSON.parse(row.body) : (row.body || []);
  } catch {
    body = [];
  }

  const primaryCategory = row.category_title || (categories.length > 0 ? categories[0] : "Engineering");

  return {
    _id: row.id,
    _createdAt: row.created_at,
    _updatedAt: row.updated_at,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt || "",
    featuredImage: row.featured_image || null,
    image: row.featured_image || null,
    mainImage: row.featured_image ? { asset: { url: row.featured_image } } : null,
    author: row.author_name || "Nexkode Team",
    authorId: row.author_id,
    authorImage: row.author_image || "/favicon.svg",
    category: primaryCategory,
    categoryId: row.category_id,
    categories: categories.length > 0 ? categories : [primaryCategory],
    publishedAt: row.published_at,
    updatedAt: row.updated_at,
    readingTime: row.reading_time || "4 min read",
    seoTitle: row.seo_title || row.title,
    metaDescription: row.meta_description || row.excerpt || "",
    primaryKeyword: row.primary_keyword || "",
    secondaryKeywords,
    canonicalUrl: row.canonical_url || "",
    showTableOfContents: Boolean(row.show_table_of_contents),
    body,
    relatedArticles,
    externalReferences,
    ctaTitle: row.cta_title || "Need help with your cloud infrastructure?",
    ctaText: row.cta_text || "",
    ctaLabel: row.cta_label || "Talk to Nexkode",
    ctaUrl: row.cta_url || "/contact",
    status: row.status || "draft",
  };
}

// Get all published posts for the public blog
export async function getPublishedPosts() {
  const query = `
    SELECT 
      p.*,
      a.name as author_name,
      a.image as author_image,
      c.title as category_title
    FROM posts p
    LEFT JOIN authors a ON p.author_id = a.id
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.status = 'published'
    ORDER BY p.published_at DESC NULLS LAST, p.created_at DESC;
  `;
  const { rows } = await pool.query(query);
  return rows.map(formatPostRow);
}

// Get single post by slug
export async function getPostBySlug(slug) {
  const query = `
    SELECT 
      p.*,
      a.name as author_name,
      a.image as author_image,
      c.title as category_title
    FROM posts p
    LEFT JOIN authors a ON p.author_id = a.id
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.slug = $1 AND p.status = 'published'
    LIMIT 1;
  `;
  const { rows } = await pool.query(query, [slug]);
  if (rows.length === 0) return null;

  const post = formatPostRow(rows[0]);

  // Fetch related articles
  const relatedQuery = `
    SELECT 
      p.id, p.title, p.slug, p.excerpt, p.featured_image, p.published_at,
      c.title as category_title
    FROM posts p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.slug != $1 AND p.status = 'published'
    ORDER BY p.published_at DESC
    LIMIT 3;
  `;
  const { rows: relatedRows } = await pool.query(relatedQuery, [slug]);
  post.relatedArticles = relatedRows.map((r) => ({
    _id: r.id,
    title: r.title,
    slug: r.slug,
    excerpt: r.excerpt,
    category: r.category_title || "Engineering",
    featuredImage: r.featured_image,
    publishedAt: r.published_at,
  }));

  return post;
}

// Get all articles (drafts + published) for admin table
export async function getAllArticlesAdmin() {
  const query = `
    SELECT 
      p.*,
      a.name as author_name,
      c.title as category_title
    FROM posts p
    LEFT JOIN authors a ON p.author_id = a.id
    LEFT JOIN categories c ON p.category_id = c.id
    ORDER BY COALESCE(p.published_at, p.created_at) DESC;
  `;
  const { rows } = await pool.query(query);
  return rows.map(formatPostRow);
}

// Get single article by ID (admin edit)
export async function getArticleByIdAdmin(id) {
  const query = `
    SELECT 
      p.*,
      a.name as author_name,
      a.image as author_image,
      c.title as category_title
    FROM posts p
    LEFT JOIN authors a ON p.author_id = a.id
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.id = $1
    LIMIT 1;
  `;
  const { rows } = await pool.query(query, [id]);
  if (rows.length === 0) return null;
  return formatPostRow(rows[0]);
}

// Get authors and categories for dropdowns
export async function getReferenceOptions() {
  const { rows: authors } = await pool.query("SELECT id as _id, name FROM authors ORDER BY name ASC;");
  const { rows: categories } = await pool.query("SELECT id as _id, title FROM categories ORDER BY title ASC;");
  return { authors, categories };
}

// Create new article
export async function createArticle(data) {
  const id = "post-" + (data.id || crypto.randomUUID());
  const now = new Date().toISOString();

  let authorId = data.authorId || (data.author?._ref) || (data.author?.id) || null;
  let categoryId = data.categoryId || (data.categories?.[0]?._ref) || null;

  // Extract categories as string array
  let categoriesArray = [];
  if (Array.isArray(data.categories)) {
    categoriesArray = data.categories.map((c) => (typeof c === "string" ? c : c?.title || c?._ref)).filter(Boolean);
  }

  // Handle main image url
  let featuredImage = null;
  if (typeof data.mainImage === "string") {
    featuredImage = data.mainImage;
  } else if (data.mainImage?.url) {
    featuredImage = data.mainImage.url;
  } else if (data.mainImage?.asset?.url) {
    featuredImage = data.mainImage.asset.url;
  } else if (data.featuredImage) {
    featuredImage = data.featuredImage;
  }

  const query = `
    INSERT INTO posts (
      id, title, slug, excerpt, featured_image, author_id, category_id,
      categories, published_at, updated_at, reading_time, seo_title,
      meta_description, primary_keyword, secondary_keywords, canonical_url,
      show_table_of_contents, body, related_articles, external_references,
      cta_title, cta_text, cta_label, cta_url, status, created_at
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7,
      $8, $9, $10, $11, $12,
      $13, $14, $15, $16,
      $17, $18, $19, $20,
      $21, $22, $23, $24, $25, $26
    )
    RETURNING *;
  `;

  const values = [
    id,
    data.title,
    typeof data.slug === "object" ? data.slug.current : data.slug,
    data.excerpt || "",
    featuredImage,
    authorId,
    categoryId,
    JSON.stringify(categoriesArray),
    data.status === "published" ? (data.publishedAt || now) : (data.publishedAt || null),
    now,
    data.readingTime || "4 min read",
    data.seoTitle || data.title,
    data.metaDescription || data.excerpt || "",
    data.primaryKeyword || "",
    JSON.stringify(Array.isArray(data.secondaryKeywords) ? data.secondaryKeywords : []),
    data.canonicalUrl || "",
    Boolean(data.showTableOfContents),
    JSON.stringify(Array.isArray(data.body) ? data.body : []),
    JSON.stringify(Array.isArray(data.relatedArticles) ? data.relatedArticles : []),
    JSON.stringify(Array.isArray(data.externalReferences) ? data.externalReferences : []),
    data.ctaTitle || "Need help with your cloud infrastructure?",
    data.ctaText || "",
    data.ctaLabel || "Talk to Nexkode",
    data.ctaUrl || "/contact",
    data.status || "draft",
    now,
  ];

  const { rows } = await pool.query(query, values);
  return formatPostRow(rows[0]);
}

// Update article
export async function updateArticle(id, data) {
  const now = new Date().toISOString();

  let authorId = data.authorId !== undefined ? data.authorId : (data.author?._ref || undefined);
  let categoryId = data.categoryId !== undefined ? data.categoryId : undefined;

  let featuredImage = undefined;
  if (data.mainImage !== undefined) {
    if (typeof data.mainImage === "string") {
      featuredImage = data.mainImage;
    } else if (data.mainImage?.url) {
      featuredImage = data.mainImage.url;
    } else if (data.mainImage?.asset?.url) {
      featuredImage = data.mainImage.asset.url;
    } else {
      featuredImage = null;
    }
  } else if (data.featuredImage !== undefined) {
    featuredImage = data.featuredImage;
  }

  const slug = data.slug ? (typeof data.slug === "object" ? data.slug.current : data.slug) : undefined;

  // Build dynamic update set
  const fields = [];
  const values = [];
  let paramIndex = 1;

  function addField(colName, val) {
    if (val !== undefined) {
      fields.push(`${colName} = $${paramIndex++}`);
      values.push(val);
    }
  }

  addField("title", data.title);
  addField("slug", slug);
  addField("excerpt", data.excerpt);
  addField("featured_image", featuredImage);
  addField("author_id", authorId);
  addField("category_id", categoryId);

  if (data.categories !== undefined) {
    const cats = Array.isArray(data.categories)
      ? data.categories.map((c) => (typeof c === "string" ? c : c?.title || c?._ref)).filter(Boolean)
      : [];
    addField("categories", JSON.stringify(cats));
  }

  if (data.publishedAt !== undefined) {
    addField("published_at", data.publishedAt ? new Date(data.publishedAt).toISOString() : null);
  }

  addField("reading_time", data.readingTime);
  addField("seo_title", data.seoTitle);
  addField("meta_description", data.metaDescription);
  addField("primary_keyword", data.primaryKeyword);

  if (data.secondaryKeywords !== undefined) {
    addField("secondary_keywords", JSON.stringify(Array.isArray(data.secondaryKeywords) ? data.secondaryKeywords : []));
  }

  addField("canonical_url", data.canonicalUrl);
  if (data.showTableOfContents !== undefined) {
    addField("show_table_of_contents", Boolean(data.showTableOfContents));
  }

  if (data.body !== undefined) {
    addField("body", JSON.stringify(Array.isArray(data.body) ? data.body : []));
  }

  if (data.relatedArticles !== undefined) {
    addField("related_articles", JSON.stringify(Array.isArray(data.relatedArticles) ? data.relatedArticles : []));
  }

  if (data.externalReferences !== undefined) {
    addField("external_references", JSON.stringify(Array.isArray(data.externalReferences) ? data.externalReferences : []));
  }

  addField("cta_title", data.ctaTitle);
  addField("cta_text", data.ctaText);
  addField("cta_label", data.ctaLabel);
  addField("cta_url", data.ctaUrl);
  addField("status", data.status);
  addField("updated_at", now);

  if (fields.length === 0) {
    return getArticleByIdAdmin(id);
  }

  values.push(id);
  const query = `
    UPDATE posts
    SET ${fields.join(", ")}
    WHERE id = $${paramIndex}
    RETURNING *;
  `;

  const { rows } = await pool.query(query, values);
  if (rows.length === 0) return null;
  return formatPostRow(rows[0]);
}

// Delete article
export async function deleteArticle(id) {
  const { rowCount } = await pool.query("DELETE FROM posts WHERE id = $1", [id]);
  return rowCount > 0;
}

// Publish article
export async function publishArticle(id) {
  const now = new Date().toISOString();
  const query = `
    UPDATE posts
    SET status = 'published', published_at = COALESCE(published_at, $1), updated_at = $1
    WHERE id = $2
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [now, id]);
  if (rows.length === 0) return null;
  return formatPostRow(rows[0]);
}

// Fetch admin by email
export async function getAdminByEmail(email) {
  const { rows } = await pool.query(
    "SELECT * FROM admin_users WHERE email = $1 LIMIT 1",
    [email.trim().toLowerCase()]
  );
  return rows[0] || null;
}
