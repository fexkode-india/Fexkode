import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Loader2,
  FileText,
  Upload,
  Image as ImageIcon,
  X,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
} from "lucide-react";

import {
  EditorProvider,
  PortableTextEditable,
  defineDecorator,
  defineSchema,
  defineTextBlock,
  useEditor,
} from "@portabletext/editor";

import {
  EventListenerPlugin,
  NodePlugin,
} from "@portabletext/editor/plugins";

/* -------------------------------------------------------------------------- */
/* Portable Text Schema                                                       */
/* -------------------------------------------------------------------------- */

const schemaDefinition = defineSchema({
  decorators: [
    { name: "strong" },
    { name: "em" },
    { name: "underline" },
  ],

  annotations: [],

  styles: [
    { name: "normal" },
    { name: "h1" },
    { name: "h2" },
    { name: "h3" },
    { name: "h4" },
    { name: "blockquote" },
  ],

  /*
   * IMPORTANT:
   * These two entries are required for bullet
   * and numbered lists.
   */
  lists: [
    { name: "bullet" },
    { name: "number" },
  ],

  inlineObjects: [],

  blockObjects: [],
});

/* -------------------------------------------------------------------------- */
/* Text Block                                                                 */
/* -------------------------------------------------------------------------- */

const textBlock = defineTextBlock({
  type: "block",

  render: (props) => {
    const { node, children, attributes } = props;

    if (node.listItem === "bullet") {
      return (
        <li
          {...attributes}
          className="mb-1 ml-6 list-disc text-slate-200"
        >
          {children}
        </li>
      );
    }

    if (node.listItem === "number") {
      return (
        <li
          {...attributes}
          className="mb-1 ml-6 list-decimal text-slate-200"
        >
          {children}
        </li>
      );
    }

    if (node.style === "h1") {
      return (
        <h1
          {...attributes}
          className="mb-4 mt-6 text-3xl font-bold"
        >
          {children}
        </h1>
      );
    }

    if (node.style === "h2") {
      return (
        <h2
          {...attributes}
          className="mb-3 mt-6 text-2xl font-bold"
        >
          {children}
        </h2>
      );
    }

    if (node.style === "h3") {
      return (
        <h3
          {...attributes}
          className="mb-3 mt-5 text-xl font-semibold"
        >
          {children}
        </h3>
      );
    }

    if (node.style === "h4") {
      return (
        <h4
          {...attributes}
          className="mb-2 mt-4 text-lg font-semibold"
        >
          {children}
        </h4>
      );
    }

    if (node.style === "blockquote") {
      return (
        <blockquote
          {...attributes}
          className="my-4 border-l-2 border-cyan pl-4 italic text-slate-300"
        >
          {children}
        </blockquote>
      );
    }

    return (
      <p
        {...attributes}
        className="mb-4"
      >
        {children}
      </p>
    );
  },
});

/* -------------------------------------------------------------------------- */
/* Decorators                                                                 */
/* -------------------------------------------------------------------------- */

const strong = defineDecorator({
  type: "strong",

  render: ({ children }) => (
    <strong>{children}</strong>
  ),
});

const em = defineDecorator({
  type: "em",

  render: ({ children }) => (
    <em>{children}</em>
  ),
});

const underline = defineDecorator({
  type: "underline",

  render: ({ children }) => (
    <u>{children}</u>
  ),
});

/* -------------------------------------------------------------------------- */
/* Editor Nodes                                                               */
/* -------------------------------------------------------------------------- */

const editorNodes = [
  textBlock,
  strong,
  em,
  underline,
];

/* -------------------------------------------------------------------------- */
/* Toolbar                                                                    */
/* -------------------------------------------------------------------------- */

function ArticleToolbar() {
  const editor = useEditor();

  const buttonClass =
    "flex h-9 min-w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] px-2 text-slate-300 transition hover:border-cyan/30 hover:bg-white/[0.06] hover:text-white";

  const sendCommand = (command) => {
    editor.send(command);

    editor.send({
      type: "focus",
    });
  };

  return (
    <div className="border-b border-white/10 bg-black/20 p-3">

      <div className="flex flex-wrap gap-2">

        {/* Bold */}

        <button
          type="button"
          className={buttonClass}
          title="Bold"
          onClick={() =>
            sendCommand({
              type: "decorator.toggle",
              decorator: "strong",
            })
          }
        >
          <Bold size={16} />
        </button>

        {/* Italic */}

        <button
          type="button"
          className={buttonClass}
          title="Italic"
          onClick={() =>
            sendCommand({
              type: "decorator.toggle",
              decorator: "em",
            })
          }
        >
          <Italic size={16} />
        </button>

        {/* Underline */}

        <button
          type="button"
          className={buttonClass}
          title="Underline"
          onClick={() =>
            sendCommand({
              type: "decorator.toggle",
              decorator: "underline",
            })
          }
        >
          <Underline size={16} />
        </button>

        <div className="mx-1 hidden h-9 w-px bg-white/10 sm:block" />

        {/* Paragraph */}

        <button
          type="button"
          className={`${buttonClass} px-3`}
          onClick={() =>
            sendCommand({
              type: "style.toggle",
              style: "normal",
            })
          }
        >
          P
        </button>

        {/* H1 */}

        <button
          type="button"
          className={`${buttonClass} px-3 text-xs font-bold`}
          onClick={() =>
            sendCommand({
              type: "style.toggle",
              style: "h1",
            })
          }
        >
          H1
        </button>

        {/* H2 */}

        <button
          type="button"
          className={`${buttonClass} px-3 text-xs font-bold`}
          onClick={() =>
            sendCommand({
              type: "style.toggle",
              style: "h2",
            })
          }
        >
          H2
        </button>

        {/* H3 */}

        <button
          type="button"
          className={`${buttonClass} px-3 text-xs font-bold`}
          onClick={() =>
            sendCommand({
              type: "style.toggle",
              style: "h3",
            })
          }
        >
          H3
        </button>

        {/* H4 */}

        <button
          type="button"
          className={`${buttonClass} px-3 text-xs font-bold`}
          onClick={() =>
            sendCommand({
              type: "style.toggle",
              style: "h4",
            })
          }
        >
          H4
        </button>

        {/* Blockquote */}

        <button
          type="button"
          className={`${buttonClass} px-3`}
          onClick={() =>
            sendCommand({
              type: "style.toggle",
              style: "blockquote",
            })
          }
        >
          "
        </button>

        <div className="mx-1 hidden h-9 w-px bg-white/10 sm:block" />

        {/* BULLET LIST */}

        <button
          type="button"
          className={buttonClass}
          title="Bullet list"
          onClick={() =>
            sendCommand({
              type: "list item.toggle",
              listItem: "bullet",
            })
          }
        >
          <List size={17} />
        </button>

        {/* NUMBERED LIST */}

        <button
          type="button"
          className={buttonClass}
          title="Numbered list"
          onClick={() =>
            sendCommand({
              type: "list item.toggle",
              listItem: "number",
            })
          }
        >
          <ListOrdered size={17} />
        </button>

      </div>

    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Rich Text Editor                                                           */
/* -------------------------------------------------------------------------- */

function RichTextEditor({
  value,
  onChange,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">

      <EditorProvider
        initialConfig={{
          schemaDefinition,

          initialValue:
            Array.isArray(value) &&
            value.length > 0
              ? value
              : undefined,
        }}
      >

        <EventListenerPlugin
          on={(event) => {
            if (event.type === "mutation") {
              onChange(event.value || []);
            }
          }}
        />

        <ArticleToolbar />

        <NodePlugin nodes={editorNodes} />

        <PortableTextEditable
          className="min-h-[420px] p-5 text-white outline-none"
          style={{
            lineHeight: "1.8",
            fontSize: "15px",
          }}
        />

      </EditorProvider>

    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Main Component                                                             */
/* -------------------------------------------------------------------------- */

function AdminArticleNew() {
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  /* ---------------------------------------------------------------------- */
  /* Article fields                                                           */
  /* ---------------------------------------------------------------------- */

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");

  const [authorId, setAuthorId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  const [publishedAt, setPublishedAt] = useState("");
  const [readingTime, setReadingTime] = useState("");

  /* ---------------------------------------------------------------------- */
  /* SEO                                                                      */
  /* ---------------------------------------------------------------------- */

  const [seoTitle, setSeoTitle] = useState("");
  const [metaDescription, setMetaDescription] =
    useState("");

  const [primaryKeyword, setPrimaryKeyword] =
    useState("");

  const [secondaryKeywords, setSecondaryKeywords] =
    useState("");

  const [canonicalUrl, setCanonicalUrl] =
    useState("");

  const [showTableOfContents, setShowTableOfContents] =
    useState(false);

  /* ---------------------------------------------------------------------- */
  /* Content                                                                  */
  /* ---------------------------------------------------------------------- */

  const [body, setBody] = useState([]);

  /* ---------------------------------------------------------------------- */
  /* Image                                                                    */
  /* ---------------------------------------------------------------------- */

  const [mainImage, setMainImage] = useState(null);

  const [imagePreview, setImagePreview] =
    useState("");

  const [isUploadingImage, setIsUploadingImage] =
    useState(false);

  /* ---------------------------------------------------------------------- */
  /* CTA                                                                      */
  /* ---------------------------------------------------------------------- */

  const [ctaTitle, setCtaTitle] = useState("");
  const [ctaText, setCtaText] = useState("");
  const [ctaLabel, setCtaLabel] = useState("");
  const [ctaUrl, setCtaUrl] = useState("");

  const [publishStatus, setPublishStatus] = useState("draft");

  /* ---------------------------------------------------------------------- */
  /* Status                                                                    */
  /* ---------------------------------------------------------------------- */

  const [isSaving, setIsSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* ---------------------------------------------------------------------- */
  /* Generate Slug                                                            */
  /* ---------------------------------------------------------------------- */

  const createSlug = (value) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleTitleChange = (event) => {
    const value = event.target.value;

    setTitle(value);

    if (!slug) {
      setSlug(createSlug(value));
    }
  };

  useEffect(() => {
    const fetchReferenceOptions = async () => {
      try {
        const response = await fetch(
          "/api/admin/reference-options",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Unable to load available authors and categories."
          );
        }

        setAuthors(data.authors || []);
        setCategories(data.categories || []);
      } catch (loadError) {
        console.error(
          "Reference options load error:",
          loadError
        );

        setError(
          loadError.message ||
            "Unable to load author and category options."
        );
      }
    };

    fetchReferenceOptions();
  }, []);

  /* ---------------------------------------------------------------------- */
  /* Image Upload                                                             */
  /* ---------------------------------------------------------------------- */

  const handleImageSelect = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");
    setSuccess("");

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError(
        "Invalid image format. Please use JPG, PNG, WebP, or GIF."
      );

      event.target.value = "";

      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError(
        "Image is too large. Maximum size is 10 MB."
      );

      event.target.value = "";

      return;
    }

    const localPreview =
      URL.createObjectURL(file);

    setImagePreview(localPreview);
    setIsUploadingImage(true);

    try {
      const formData = new FormData();

      formData.append("image", file);

      const response = await fetch(
        "/api/admin/upload-image",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to upload image."
        );
      }

      if (!data.asset && !data.url) {
        throw new Error(
          "Server did not return an image asset."
        );
      }

      setMainImage(data.asset);

      if (data.url) {
        setImagePreview(data.url);
      }

      setSuccess(
        "Featured image uploaded successfully."
      );
    } catch (uploadError) {
      console.error(
        "Image upload error:",
        uploadError
      );

      setError(
        uploadError.message ||
          "Unable to upload image."
      );

      setImagePreview("");
      setMainImage(null);
    } finally {
      setIsUploadingImage(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      URL.revokeObjectURL(localPreview);
    }
  };

  /* ---------------------------------------------------------------------- */
  /* Remove Image                                                             */
  /* ---------------------------------------------------------------------- */

  const handleRemoveImage = () => {
    setImagePreview("");
    setMainImage(null);

    setError("");
    setSuccess("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /* ---------------------------------------------------------------------- */
  /* Submit                                                                   */
  /* ---------------------------------------------------------------------- */

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!title.trim()) {
      setError("Article title is required.");
      return;
    }

    if (!slug.trim()) {
      setError("Article slug is required.");
      return;
    }

    if (!authorId) {
      setError("Please select an author.");
      return;
    }

    if (!categoryId) {
      setError("Please select a category.");
      return;
    }

    if (isUploadingImage) {
      setError(
        "Please wait until the image upload is complete."
      );

      return;
    }

    if (
      !Array.isArray(body) ||
      body.length === 0
    ) {
      setError(
        "Please add some article content."
      );

      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(
        "/api/admin/articles",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            title: title.trim(),

            slug: slug.trim(),

            excerpt: excerpt.trim(),

            author: authorId
              ? {
                  _type: "reference",
                  _ref: authorId,
                }
              : undefined,

            categories: categoryId
              ? [
                  {
                    _type: "reference",
                    _ref: categoryId,
                  },
                ]
              : [],

            publishedAt:
              publishedAt || undefined,

            readingTime:
              readingTime.trim() || undefined,

            seoTitle:
              seoTitle.trim() || undefined,

            metaDescription:
              metaDescription.trim() ||
              undefined,

            primaryKeyword:
              primaryKeyword.trim() ||
              undefined,

            secondaryKeywords:
              secondaryKeywords
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean),

            canonicalUrl:
              canonicalUrl.trim() ||
              undefined,

            showTableOfContents,

            body,

            mainImage:
              mainImage || undefined,

            ctaTitle:
              ctaTitle.trim() || undefined,

            ctaText:
              ctaText.trim() || undefined,

            ctaLabel:
              ctaLabel.trim() || undefined,

            ctaUrl:
              ctaUrl.trim() || undefined,

            status: publishStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Unable to create article."
        );

        return;
      }

      setSuccess(
        "Article created successfully."
      );

      setTimeout(() => {
        navigate("/admin/articles");
      }, 700);
    } catch (createError) {
      console.error(
        "Create article error:",
        createError
      );

      setError(
        "Unable to connect to the article management service."
      );
    } finally {
      setIsSaving(false);
    }
  };

  /* ---------------------------------------------------------------------- */
  /* Common styles                                                            */
  /* ---------------------------------------------------------------------- */

  const inputClass =
    "mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-cyan/50 focus:bg-white/[0.04]";

  const textareaClass =
    "mt-2 w-full resize-y rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm leading-7 text-white placeholder:text-slate-600 outline-none transition focus:border-cyan/50";

  /* ---------------------------------------------------------------------- */
  /* Render                                                                   */
  /* ---------------------------------------------------------------------- */

  return (
    <main className="min-h-screen bg-ink px-5 py-10 text-white">

      <div className="mx-auto max-w-5xl">

        {/* Header */}

        <header className="mb-8 border-b border-white/10 pb-6">

          <Link
            to="/admin/articles"
            className="mb-5 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Articles
          </Link>

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan/20 bg-cyan/10 text-cyan">
              <FileText size={21} />
            </div>

            <div>

              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Create Article
              </h1>

              <p className="mt-1 text-sm text-slate-400">
                Create a new Fexkode blog article.
              </p>

            </div>

          </div>

        </header>

        {/* Error */}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-400/20 bg-red-400/10 px-5 py-4 text-sm leading-6 text-red-300">
            {error}
          </div>
        )}

        {/* Success */}

        {success && (
          <div className="mb-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-5 py-4 text-sm leading-6 text-emerald-300">
            {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* ---------------------------------------------------------------- */}
          {/* Article Basics                                                   */}
          {/* ---------------------------------------------------------------- */}

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

            <h2 className="text-lg font-semibold">
              Article Basics
            </h2>

            <div className="mt-6 space-y-5">

              {/* Title */}

              <div>

                <label className="block text-sm font-medium">
                  Article Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Enter article title"
                  required
                  maxLength={120}
                  className={inputClass}
                />

              </div>

              {/* Slug */}

              <div>

                <label className="block text-sm font-medium">
                  URL Slug
                </label>

                <div className="flex items-center gap-2">

                  <span className="mt-2 text-sm text-slate-500">
                    /blog/
                  </span>

                  <input
                    type="text"
                    value={slug}
                    onChange={(event) =>
                      setSlug(event.target.value)
                    }
                    placeholder="article-url-slug"
                    required
                    maxLength={96}
                    className={inputClass}
                  />

                </div>

              </div>

              {/* Excerpt */}

              <div>

                <label className="block text-sm font-medium">
                  Short Introduction / Excerpt
                </label>

                <textarea
                  value={excerpt}
                  onChange={(event) =>
                    setExcerpt(event.target.value)
                  }
                  placeholder="Write a short introduction..."
                  rows={4}
                  maxLength={300}
                  className={textareaClass}
                />

              </div>

              {/* ---------------------------------------------------------------- */}
              {/* Featured Image                                                    */}
              {/* ---------------------------------------------------------------- */}

              <div>

                <label className="block text-sm font-medium">
                  Featured Image
                </label>

                <div className="mt-2 overflow-hidden rounded-2xl border border-white/10 bg-black/20">

                  {imagePreview ? (
                    <div className="relative">

                      <img
                        src={imagePreview}
                        alt="Featured article"
                        className="max-h-80 w-full object-cover"
                      />

                      {!isUploadingImage && (
                        <button
                          type="button"
                          onClick={
                            handleRemoveImage
                          }
                          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white"
                        >
                          <X size={17} />
                        </button>
                      )}

                      {isUploadingImage && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60">

                          <div className="flex items-center gap-2 rounded-full bg-black/80 px-5 py-3 text-sm">

                            <Loader2
                              size={17}
                              className="animate-spin text-cyan"
                            />

                            Uploading image...

                          </div>

                        </div>
                      )}

                    </div>
                  ) : (
                    <div className="flex min-h-48 flex-col items-center justify-center px-6 py-10 text-center">

                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 text-slate-500">
                        <ImageIcon size={22} />
                      </div>

                      <p className="text-sm text-slate-300">
                        No featured image selected
                      </p>

                    </div>
                  )}

                  <div className="border-t border-white/10 p-4">

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      onChange={
                        handleImageSelect
                      }
                      className="hidden"
                    />

                    <button
                      type="button"
                      disabled={
                        isUploadingImage
                      }
                      onClick={() =>
                        fileInputRef.current?.click()
                      }
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-300 hover:border-cyan/30 hover:text-white disabled:opacity-50"
                    >

                      {isUploadingImage ? (
                        <>
                          <Loader2
                            size={17}
                            className="animate-spin"
                          />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload size={17} />

                          {imagePreview
                            ? "Change Featured Image"
                            : "Choose Featured Image"}
                        </>
                      )}

                    </button>

                    <p className="mt-2 text-center text-xs text-slate-600">
                      Maximum file size: 10 MB
                    </p>

                  </div>

                </div>

              </div>

              {/* Author / Category */}

              <div className="grid gap-5 sm:grid-cols-2">

                <div>

                  <label className="block text-sm font-medium">
                    Author
                  </label>

                  <select
                    value={authorId}
                    onChange={(event) =>
                      setAuthorId(event.target.value)
                    }
                    className={inputClass}
                    style={{
                      color: "#f8fafc",
                      backgroundColor: "#0b1120",
                    }}
                  >
                    <option
                      value=""
                      style={{
                        color: "#0f172a",
                        backgroundColor: "#ffffff",
                      }}
                    >
                      Select an author
                    </option>

                    {authors.map((author) => (
                      <option
                        key={author._id}
                        value={author._id}
                        style={{
                          color: "#0f172a",
                          backgroundColor: "#ffffff",
                        }}
                      >
                        {author.name}
                      </option>
                    ))}
                  </select>

                </div>

                <div>

                  <label className="block text-sm font-medium">
                    Category
                  </label>

                  <select
                    value={categoryId}
                    onChange={(event) =>
                      setCategoryId(
                        event.target.value
                      )
                    }
                    className={inputClass}
                    style={{
                      color: "#f8fafc",
                      backgroundColor: "#0b1120",
                    }}
                  >
                    <option
                      value=""
                      style={{
                        color: "#0f172a",
                        backgroundColor: "#ffffff",
                      }}
                    >
                      Select a category
                    </option>

                    {categories.map((category) => (
                      <option
                        key={category._id}
                        value={category._id}
                        style={{
                          color: "#0f172a",
                          backgroundColor: "#ffffff",
                        }}
                      >
                        {category.title}
                      </option>
                    ))}
                  </select>

                </div>

              </div>

              {/* Published / Reading */}

              <div className="grid gap-5 sm:grid-cols-2">

                <div>

                  <label className="block text-sm font-medium">
                    Published Date
                  </label>

                  <input
                    type="datetime-local"
                    value={publishedAt}
                    onChange={(event) =>
                      setPublishedAt(
                        event.target.value
                      )
                    }
                    className={inputClass}
                  />

                </div>

                <div>

                  <label className="block text-sm font-medium">
                    Reading Time
                  </label>

                  <input
                    type="text"
                    value={readingTime}
                    onChange={(event) =>
                      setReadingTime(
                        event.target.value
                      )
                    }
                    placeholder="8 min read"
                    className={inputClass}
                  />

                </div>

              </div>

            </div>

          </section>

          {/* ---------------------------------------------------------------- */}
          {/* SEO                                                               */}
          {/* ---------------------------------------------------------------- */}

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

            <h2 className="text-lg font-semibold">
              SEO Information
            </h2>

            <div className="mt-6 space-y-5">

              <div>

                <label className="block text-sm font-medium">
                  SEO Title
                </label>

                <input
                  type="text"
                  value={seoTitle}
                  onChange={(event) =>
                    setSeoTitle(
                      event.target.value
                    )
                  }
                  placeholder="SEO optimized title"
                  maxLength={70}
                  className={inputClass}
                />

              </div>

              <div>

                <label className="block text-sm font-medium">
                  Meta Description
                </label>

                <textarea
                  value={metaDescription}
                  onChange={(event) =>
                    setMetaDescription(
                      event.target.value
                    )
                  }
                  placeholder="Write a compelling meta description..."
                  rows={4}
                  maxLength={160}
                  className={textareaClass}
                />

              </div>

              <div className="grid gap-5 sm:grid-cols-2">

                <div>

                  <label className="block text-sm font-medium">
                    Primary Keyword
                  </label>

                  <input
                    type="text"
                    value={primaryKeyword}
                    onChange={(event) =>
                      setPrimaryKeyword(
                        event.target.value
                      )
                    }
                    placeholder="cloud migration"
                    className={inputClass}
                  />

                </div>

                <div>

                  <label className="block text-sm font-medium">
                    Secondary Keywords
                  </label>

                  <input
                    type="text"
                    value={secondaryKeywords}
                    onChange={(event) =>
                      setSecondaryKeywords(
                        event.target.value
                      )
                    }
                    placeholder="AWS, cloud, infrastructure"
                    className={inputClass}
                  />

                </div>

              </div>

              <div>

                <label className="block text-sm font-medium">
                  Canonical URL
                </label>

                <input
                  type="url"
                  value={canonicalUrl}
                  onChange={(event) =>
                    setCanonicalUrl(
                      event.target.value
                    )
                  }
                  placeholder="https://fexkode.com/blog/example"
                  className={inputClass}
                />

              </div>

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-4">

                <input
                  type="checkbox"
                  checked={
                    showTableOfContents
                  }
                  onChange={(event) =>
                    setShowTableOfContents(
                      event.target.checked
                    )
                  }
                  className="h-4 w-4"
                />

                <span className="text-sm text-slate-300">
                  Show table of contents
                </span>

              </label>

            </div>

          </section>

          {/* ---------------------------------------------------------------- */}
          {/* Article Content                                                   */}
          {/* ---------------------------------------------------------------- */}

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

            <h2 className="text-lg font-semibold">
              Article Content
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Write and format your article below.
            </p>

            <div className="mt-5">

              <RichTextEditor
                value={body}
                onChange={setBody}
              />

            </div>

          </section>

          {/* ---------------------------------------------------------------- */}
          {/* CTA                                                               */}
          {/* ---------------------------------------------------------------- */}

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

            <h2 className="text-lg font-semibold">
              CTA
            </h2>

            <div className="mt-6 space-y-5">

              <div>

                <label className="block text-sm font-medium">
                  CTA Title
                </label>

                <input
                  type="text"
                  value={ctaTitle}
                  onChange={(event) =>
                    setCtaTitle(
                      event.target.value
                    )
                  }
                  placeholder="Need help with your cloud infrastructure?"
                  className={inputClass}
                />

              </div>

              <div>

                <label className="block text-sm font-medium">
                  CTA Text
                </label>

                <textarea
                  value={ctaText}
                  onChange={(event) =>
                    setCtaText(
                      event.target.value
                    )
                  }
                  placeholder="Explain the call to action..."
                  rows={4}
                  className={textareaClass}
                />

              </div>

              <div className="grid gap-5 sm:grid-cols-2">

                <div>

                  <label className="block text-sm font-medium">
                    CTA Label
                  </label>

                  <input
                    type="text"
                    value={ctaLabel}
                    onChange={(event) =>
                      setCtaLabel(
                        event.target.value
                      )
                    }
                    placeholder="Talk to Fexkode"
                    className={inputClass}
                  />

                </div>

                <div>

                  <label className="block text-sm font-medium">
                    CTA URL
                  </label>

                  <input
                    type="text"
                    value={ctaUrl}
                    onChange={(event) =>
                      setCtaUrl(
                        event.target.value
                      )
                    }
                    placeholder="/contact"
                    className={inputClass}
                  />

                </div>

              </div>

            </div>

          </section>

          {/* ---------------------------------------------------------------- */}
          {/* Publication Status                                                */}
          {/* ---------------------------------------------------------------- */}

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

            <h2 className="text-lg font-semibold">
              Publication Status
            </h2>

            <div className="mt-6 space-y-4">

              <div className="space-y-3">

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-4 transition hover:border-white/20">

                  <input
                    type="radio"
                    name="status"
                    value="draft"
                    checked={
                      publishStatus === "draft"
                    }
                    onChange={(event) =>
                      setPublishStatus(
                        event.target.value
                      )
                    }
                    className="h-4 w-4"
                  />

                  <span className="flex-1">

                    <span className="block text-sm font-semibold text-white">
                      Draft
                    </span>

                    <span className="block text-xs text-slate-400">
                      Article will not be visible on the public blog
                    </span>

                  </span>

                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-4 transition hover:border-white/20">

                  <input
                    type="radio"
                    name="status"
                    value="published"
                    checked={
                      publishStatus === "published"
                    }
                    onChange={(event) =>
                      setPublishStatus(
                        event.target.value
                      )
                    }
                    className="h-4 w-4"
                  />

                  <span className="flex-1">

                    <span className="block text-sm font-semibold text-white">
                      Published
                    </span>

                    <span className="block text-xs text-slate-400">
                      Article will be visible on the public blog
                    </span>

                  </span>

                </label>

              </div>

            </div>

          </section>

          {/* ---------------------------------------------------------------- */}
          {/* Bottom Buttons                                                    */}
          {/* ---------------------------------------------------------------- */}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <Link
              to="/admin/articles"
              className="flex items-center justify-center rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-slate-300 hover:border-white/20 hover:text-white"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={
                isSaving ||
                isUploadingImage
              }
              className="flex items-center justify-center gap-2 rounded-full bg-electric px-6 py-3 text-sm font-semibold text-white hover:bg-electric/90 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {isSaving ? (
                <>
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />

                  Creating...
                </>
              ) : (
                <>
                  <Save size={17} />

                  Create Article
                </>
              )}

            </button>

          </div>

        </form>

      </div>

    </main>
  );
}

export default AdminArticleNew;