import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Loader2,
  Save,
  CheckCircle2,
  AlertCircle,
  Upload,
  Image as ImageIcon,
  X,
  Trash2,
  AlertTriangle,
} from "lucide-react";

function AdminArticleEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const [imagePreview, setImagePreview] = useState("");
  const [mainImage, setMainImage] = useState(null);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    publishedAt: "",
    readingTime: "",
    seoTitle: "",
    metaDescription: "",
    primaryKeyword: "",
    secondaryKeywords: "",
    canonicalUrl: "",
    showTableOfContents: false,
    ctaTitle: "",
    ctaText: "",
    ctaLabel: "",
    ctaUrl: "",
    status: "published",
  });

  /*
  |--------------------------------------------------------------------------
  | Helpers
  |--------------------------------------------------------------------------
  */

  const toDateTimeLocal = (value) => {
    if (!value) {
      return "";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | Load Article
  |--------------------------------------------------------------------------
  */

  const fetchArticle = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`/api/admin/articles/${id}`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to load article.");
        return;
      }

      const loadedArticle = data.article;

      setArticle(loadedArticle);

      setForm({
        title: loadedArticle.title || "",
        slug: loadedArticle.slug?.current || "",
        excerpt: loadedArticle.excerpt || "",

        publishedAt: toDateTimeLocal(
          loadedArticle.publishedAt
        ),

        readingTime: loadedArticle.readingTime || "",

        seoTitle: loadedArticle.seoTitle || "",

        metaDescription:
          loadedArticle.metaDescription || "",

        primaryKeyword:
          loadedArticle.primaryKeyword || "",

        secondaryKeywords:
          Array.isArray(loadedArticle.secondaryKeywords)
            ? loadedArticle.secondaryKeywords.join(", ")
            : "",

        canonicalUrl:
          loadedArticle.canonicalUrl || "",

        showTableOfContents:
          Boolean(loadedArticle.showTableOfContents),

        ctaTitle:
          loadedArticle.ctaTitle || "",

        ctaText:
          loadedArticle.ctaText || "",

        ctaLabel:
          loadedArticle.ctaLabel || "",

        ctaUrl:
          loadedArticle.ctaUrl || "",
      });

      /*
       * Load existing featured image.
       */

      if (loadedArticle.mainImage?.asset?.url) {
        setImagePreview(
          loadedArticle.mainImage.asset.url
        );
      } else {
        setImagePreview("");
      }

      /*
       * Keep the existing Sanity image reference.
       */

      if (loadedArticle.mainImage) {
        setMainImage(loadedArticle.mainImage);
      } else {
        setMainImage(null);
      }
    } catch (loadError) {
      console.error(
        "Article loading error:",
        loadError
      );

      setError(
        "Unable to connect to the article management service."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchArticle();
    }
  }, [id]);

  /*
  |--------------------------------------------------------------------------
  | Select Image
  |--------------------------------------------------------------------------
  */

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

    /*
     * Show local preview immediately.
     */

    const localPreview =
      URL.createObjectURL(file);

    setImagePreview(localPreview);

    /*
     * Upload image to Sanity.
     */

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

      if (!data.asset) {
        throw new Error(
          "Sanity did not return an image asset."
        );
      }

      /*
       * Store the Sanity image reference.
       */

      setMainImage(data.asset);

      /*
       * Use Sanity's image URL after successful upload.
       */

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

      /*
       * Restore existing image if upload failed.
       */

      if (article?.mainImage?.asset?.url) {
        setImagePreview(
          article.mainImage.asset.url
        );
      } else {
        setImagePreview("");
      }
    } finally {
      setIsUploadingImage(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      URL.revokeObjectURL(localPreview);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Remove Selected Image
  |--------------------------------------------------------------------------
  */

  const handleRemoveImage = () => {
    setImagePreview("");
    setMainImage(null);
    setError("");
    setSuccess("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Save Article
  |--------------------------------------------------------------------------
  */

  const handleSave = async (event) => {
    event.preventDefault();

    setIsSaving(true);
    setError("");
    setSuccess("");

    try {
      if (!form.title.trim()) {
        setError("Article title is required.");
        return;
      }

      if (!form.slug.trim()) {
        setError("Article slug is required.");
        return;
      }

      if (!form.publishedAt) {
        setError("Published date is required.");
        return;
      }

      if (isUploadingImage) {
        setError(
          "Please wait until the image upload is complete."
        );
        return;
      }

      const secondaryKeywords =
        form.secondaryKeywords
          .split(",")
          .map((keyword) => keyword.trim())
          .filter(Boolean);

      const response = await fetch(
        `/api/admin/articles/${id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            title: form.title.trim(),

            slug: {
              current: form.slug.trim(),
            },

            excerpt: form.excerpt.trim(),

            publishedAt: new Date(
              form.publishedAt
            ).toISOString(),

            readingTime:
              form.readingTime.trim() || "",

            seoTitle:
              form.seoTitle.trim() || "",

            metaDescription:
              form.metaDescription.trim() || "",

            primaryKeyword:
              form.primaryKeyword.trim() || "",

            secondaryKeywords,

            canonicalUrl:
              form.canonicalUrl.trim() || "",

            showTableOfContents:
              form.showTableOfContents,

            /*
             * Featured image.
             *
             * If the user selected a new image,
             * this is the new Sanity asset reference.
             *
             * If they didn't change the image,
             * the existing reference is preserved.
             */

            mainImage: mainImage || undefined,

            ctaTitle:
              form.ctaTitle.trim() || "",

            ctaText:
              form.ctaText.trim() || "",

            ctaLabel:
              form.ctaLabel.trim() || "",

            ctaUrl:
              form.ctaUrl.trim() || "",

            status: form.status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Unable to save article changes."
        );

        return;
      }

      /*
       * Reload the article so we verify
       * the saved content and image.
       */

      await fetchArticle();

      setSuccess(
        "Changes saved and published successfully."
      );
    } catch (saveError) {
      console.error(
        "Article save error:",
        saveError
      );

      setError(
        "Unable to connect to the article management service."
      );
    } finally {
      setIsSaving(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Delete Article
  |--------------------------------------------------------------------------
  */

  const handleDelete = async () => {
    setIsDeleting(true);
    setDeleteError("");

    try {
      const response = await fetch(
        `/api/admin/articles/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setDeleteError(
          data.message || "Unable to delete article."
        );
        return;
      }

      /*
       * Redirect back to the admin article listing
       * once the article has been removed from Sanity.
       */

      navigate("/admin/articles", {
        replace: true,
        state: {
          flashMessage: "Article deleted successfully.",
        },
      });
    } catch (deleteRequestError) {
      console.error(
        "Article delete error:",
        deleteRequestError
      );

      setDeleteError(
        "Unable to connect to the article management service."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Reusable Input Classes
  |--------------------------------------------------------------------------
  */

  const inputClass =
    "mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-cyan/50 focus:bg-white/[0.04]";

  const textareaClass =
    "mt-2 w-full resize-y rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-white placeholder:text-slate-600 outline-none transition focus:border-cyan/50 focus:bg-white/[0.04]";

  const labelClass =
    "text-xs font-medium uppercase tracking-wide text-slate-500";

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <main className="min-h-screen bg-ink px-5 py-10 text-white">
      <div className="mx-auto max-w-5xl">

        {/* Back */}

        <Link
          to="/admin/articles"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Articles
        </Link>

        {/* Loading */}

        {isLoading && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
            <Loader2
              size={28}
              className="mx-auto mb-4 animate-spin text-cyan"
            />

            <p className="text-sm text-slate-400">
              Loading article...
            </p>
          </div>
        )}

        {/* Error */}

        {!isLoading && error && !article && (
          <div className="rounded-2xl border border-red-400/20 bg-red-400/10 px-5 py-4 text-sm leading-6 text-red-300">
            {error}
          </div>
        )}

        {!isLoading && article && (
          <>
            {/* Header */}

            <div className="mb-8 flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-cyan/20 bg-cyan/10 text-cyan">
                  <FileText size={21} />
                </div>

                <p className="text-sm font-medium uppercase tracking-wide text-cyan">
                  Article Editor
                </p>

                <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                  Edit Article
                </h1>

                <p className="mt-2 text-sm text-slate-400">
                  Edit your Fexkode article and save your changes.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setDeleteError("");
                  setShowDeleteConfirm(true);
                }}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-red-400/30 bg-red-400/10 px-5 py-2.5 text-sm font-semibold text-red-300 transition hover:border-red-400/50 hover:bg-red-400/20"
              >
                <Trash2 size={16} />
                Delete Article
              </button>
            </div>

            {/* Status messages */}

            {error && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm leading-6 text-red-300">
                <AlertCircle
                  size={18}
                  className="mt-0.5 shrink-0"
                />

                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm leading-6 text-emerald-300">
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0"
                />

                <span>{success}</span>
              </div>
            )}

            <form
              onSubmit={handleSave}
              className="space-y-6"
            >

              {/* =====================================================
                  ARTICLE BASICS
              ====================================================== */}

              <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h2 className="mb-6 text-lg font-semibold">
                  Article Information
                </h2>

                <div className="space-y-5">

                  {/* Title */}

                  <div>
                    <label
                      htmlFor="article-title"
                      className={labelClass}
                    >
                      Title
                    </label>

                    <input
                      id="article-title"
                      type="text"
                      value={form.title}
                      onChange={(event) =>
                        updateField(
                          "title",
                          event.target.value
                        )
                      }
                      className={inputClass}
                    />
                  </div>

                  {/* Slug */}

                  <div>
                    <label
                      htmlFor="article-slug"
                      className={labelClass}
                    >
                      URL Slug
                    </label>

                    <div className="flex items-center gap-2">
                      <span className="mt-2 shrink-0 text-sm text-slate-500">
                        /blog/
                      </span>

                      <input
                        id="article-slug"
                        type="text"
                        value={form.slug}
                        onChange={(event) =>
                          updateField(
                            "slug",
                            event.target.value
                          )
                        }
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Excerpt */}

                  <div>
                    <label
                      htmlFor="article-excerpt"
                      className={labelClass}
                    >
                      Excerpt
                    </label>

                    <textarea
                      id="article-excerpt"
                      rows={4}
                      value={form.excerpt}
                      onChange={(event) =>
                        updateField(
                          "excerpt",
                          event.target.value
                        )
                      }
                      className={textareaClass}
                    />
                  </div>

                  {/* =================================================
                      FEATURED IMAGE
                  ================================================== */}

                  <div>
                    <label className={labelClass}>
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
                              onClick={handleRemoveImage}
                              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white backdrop-blur transition hover:bg-black"
                              title="Remove image"
                            >
                              <X size={17} />
                            </button>
                          )}

                          {isUploadingImage && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/70 px-5 py-3 text-sm text-white">
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
                          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-500">
                            <ImageIcon size={22} />
                          </div>

                          <p className="text-sm font-medium text-slate-300">
                            No featured image
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            Upload a JPG, PNG, WebP, or GIF image.
                          </p>
                        </div>
                      )}

                      <div className="border-t border-white/10 p-4">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/gif"
                          onChange={handleImageSelect}
                          className="hidden"
                        />

                        <button
                          type="button"
                          disabled={isUploadingImage}
                          onClick={() =>
                            fileInputRef.current?.click()
                          }
                          className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-cyan/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
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

                  {/* Dates / Reading */}

                  <div className="grid gap-5 md:grid-cols-2">

                    <div>
                      <label
                        htmlFor="published-date"
                        className={labelClass}
                      >
                        Published Date
                      </label>

                      <input
                        id="published-date"
                        type="datetime-local"
                        value={form.publishedAt}
                        onChange={(event) =>
                          updateField(
                            "publishedAt",
                            event.target.value
                          )
                        }
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="reading-time"
                        className={labelClass}
                      >
                        Reading Time
                      </label>

                      <input
                        id="reading-time"
                        type="text"
                        placeholder="8 min read"
                        value={form.readingTime}
                        onChange={(event) =>
                          updateField(
                            "readingTime",
                            event.target.value
                          )
                        }
                        className={inputClass}
                      />
                    </div>

                  </div>

                  {/* Existing author/category */}

                  <div className="grid gap-5 md:grid-cols-2">

                    <div>
                      <p className={labelClass}>
                        Author
                      </p>

                      <p className="mt-2 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-300">
                        {article.author?.name ||
                          "Not set"}
                      </p>
                    </div>

                    <div>
                      <p className={labelClass}>
                        Category
                      </p>

                      <p className="mt-2 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-300">
                        {article.categories?.length
                          ? article.categories
                              .map(
                                (category) =>
                                  category.title
                              )
                              .join(", ")
                          : "Not set"}
                      </p>
                    </div>

                  </div>

                </div>
              </section>

              {/* =====================================================
                  SEO
              ====================================================== */}

              <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h2 className="mb-6 text-lg font-semibold">
                  SEO Information
                </h2>

                <div className="space-y-5">

                  <div>
                    <label
                      htmlFor="seo-title"
                      className={labelClass}
                    >
                      SEO Title
                    </label>

                    <input
                      id="seo-title"
                      type="text"
                      value={form.seoTitle}
                      onChange={(event) =>
                        updateField(
                          "seoTitle",
                          event.target.value
                        )
                      }
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="meta-description"
                      className={labelClass}
                    >
                      Meta Description
                    </label>

                    <textarea
                      id="meta-description"
                      rows={4}
                      value={form.metaDescription}
                      onChange={(event) =>
                        updateField(
                          "metaDescription",
                          event.target.value
                        )
                      }
                      className={textareaClass}
                    />
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">

                    <div>
                      <label
                        htmlFor="primary-keyword"
                        className={labelClass}
                      >
                        Primary Keyword
                      </label>

                      <input
                        id="primary-keyword"
                        type="text"
                        value={form.primaryKeyword}
                        onChange={(event) =>
                          updateField(
                            "primaryKeyword",
                            event.target.value
                          )
                        }
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="canonical-url"
                        className={labelClass}
                      >
                        Canonical URL
                      </label>

                      <input
                        id="canonical-url"
                        type="url"
                        placeholder="https://fexkode.com/blog/..."
                        value={form.canonicalUrl}
                        onChange={(event) =>
                          updateField(
                            "canonicalUrl",
                            event.target.value
                          )
                        }
                        className={inputClass}
                      />
                    </div>

                  </div>

                  <div>
                    <label
                      htmlFor="secondary-keywords"
                      className={labelClass}
                    >
                      Secondary Keywords
                    </label>

                    <input
                      id="secondary-keywords"
                      type="text"
                      placeholder="cloud migration, AWS, infrastructure"
                      value={form.secondaryKeywords}
                      onChange={(event) =>
                        updateField(
                          "secondaryKeywords",
                          event.target.value
                        )
                      }
                      className={inputClass}
                    />

                    <p className="mt-2 text-xs text-slate-500">
                      Separate keywords with commas.
                    </p>
                  </div>

                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={form.showTableOfContents}
                      onChange={(event) =>
                        updateField(
                          "showTableOfContents",
                          event.target.checked
                        )
                      }
                      className="h-4 w-4 accent-cyan"
                    />

                    <span className="text-sm text-slate-300">
                      Show Table of Contents
                    </span>
                  </label>

                </div>
              </section>

              {/* =====================================================
                  ARTICLE CONTENT
              ====================================================== */}

              <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h2 className="mb-2 text-lg font-semibold">
                  Article Content
                </h2>

                <p className="mb-5 text-sm leading-6 text-slate-400">
                  The existing Portable Text content is preserved
                  during this save. The full rich-text editor will be
                  added in the next step.
                </p>

                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <p className="text-sm text-slate-400">
                    Portable Text blocks:
                    {" "}
                    <span className="font-semibold text-white">
                      {article.body?.length || 0}
                    </span>
                  </p>
                </div>
              </section>

              {/* =====================================================
                  CTA
              ====================================================== */}

              <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h2 className="mb-6 text-lg font-semibold">
                  CTA
                </h2>

                <div className="space-y-5">

                  <div className="grid gap-5 md:grid-cols-2">

                    <div>
                      <label
                        htmlFor="cta-title"
                        className={labelClass}
                      >
                        CTA Title
                      </label>

                      <input
                        id="cta-title"
                        type="text"
                        value={form.ctaTitle}
                        onChange={(event) =>
                          updateField(
                            "ctaTitle",
                            event.target.value
                          )
                        }
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="cta-label"
                        className={labelClass}
                      >
                        CTA Button Label
                      </label>

                      <input
                        id="cta-label"
                        type="text"
                        value={form.ctaLabel}
                        onChange={(event) =>
                          updateField(
                            "ctaLabel",
                            event.target.value
                          )
                        }
                        className={inputClass}
                      />
                    </div>

                  </div>

                  <div>
                    <label
                      htmlFor="cta-text"
                      className={labelClass}
                    >
                      CTA Text
                    </label>

                    <textarea
                      id="cta-text"
                      rows={4}
                      value={form.ctaText}
                      onChange={(event) =>
                        updateField(
                          "ctaText",
                          event.target.value
                        )
                      }
                      className={textareaClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="cta-url"
                      className={labelClass}
                    >
                      CTA URL
                    </label>

                    <input
                      id="cta-url"
                      type="text"
                      value={form.ctaUrl}
                      onChange={(event) =>
                        updateField(
                          "ctaUrl",
                          event.target.value
                        )
                      }
                      className={inputClass}
                    />
                  </div>

                </div>
              </section>

              {/* =====================================================
                  PUBLICATION STATUS
              ====================================================== */}

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
                          form.status === "draft"
                        }
                        onChange={(event) =>
                          updateField(
                            "status",
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
                          form.status === "published"
                        }
                        onChange={(event) =>
                          updateField(
                            "status",
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

              {/* =====================================================
                  SAVE
              ====================================================== */}

              <div className="sticky bottom-4 z-10 flex justify-end">
                <button
                  type="submit"
                  disabled={
                    isSaving ||
                    isUploadingImage
                  }
                  className="flex items-center gap-2 rounded-full bg-electric px-6 py-3.5 text-sm font-semibold text-white shadow-xl transition hover:bg-electric/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving ? (
                    <>
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />

                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={17} />

                      Save Changes
                    </>
                  )}
                </button>
              </div>

            </form>
          </>
        )}

        {/* =====================================================
            DELETE CONFIRMATION MODAL
        ====================================================== */}

        {showDeleteConfirm && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-article-heading"
          >
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-ink p-6 shadow-2xl">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-400/30 bg-red-400/10 text-red-300">
                <AlertTriangle size={21} />
              </div>

              <h2
                id="delete-article-heading"
                className="mt-4 text-lg font-semibold text-white"
              >
                Delete this article?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                This will permanently remove{" "}
                <span className="font-medium text-white">
                  {article?.title || "this article"}
                </span>{" "}
                from your database and from the public blog. This
                action cannot be undone.
              </p>

              {deleteError && (
                <div className="mt-4 flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm leading-6 text-red-300">
                  <AlertCircle
                    size={18}
                    className="mt-0.5 shrink-0"
                  />

                  <span>{deleteError}</span>
                </div>
              )}

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (isDeleting) {
                      return;
                    }

                    setShowDeleteConfirm(false);
                    setDeleteError("");
                  }}
                  disabled={isDeleting}
                  className="rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="inline-flex items-center gap-2 rounded-full bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isDeleting ? (
                    <>
                      <Loader2
                        size={16}
                        className="animate-spin"
                      />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 size={16} />
                      Delete Article
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default AdminArticleEdit;