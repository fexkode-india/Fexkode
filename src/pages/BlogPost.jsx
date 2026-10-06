import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import { trackContentView } from "../utils/analytics";

function BlogPost() {
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/posts/${encodeURIComponent(slug)}`);
        if (!res.ok) {
          if (res.status === 404) {
            setPost(null);
            return;
          }
          throw new Error(`HTTP error ${res.status}`);
        }

        const data = await res.json();
        if (!data) {
          setPost(null);
          return;
        }

        setPost(data);
        setRelatedPosts(data.relatedArticles || []);
      } catch (err) {
        console.error("Blog post fetch error:", err);
        setError("Unable to load this article.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  // Track article view with Google Analytics
  useEffect(() => {
    if (post) {
      trackContentView(post._id, post.title, 'blog_post');
    }
  }, [post]);

  if (loading) {
    return (
      <main className="min-h-screen bg-ink text-white">
        <section className="flex min-h-[70vh] items-center justify-center px-5">
          <p className="text-slate-500">Loading article...</p>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-ink text-white">
        <section className="flex min-h-[70vh] items-center justify-center px-5">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan">
              Error
            </p>

            <h1 className="mt-4 text-4xl font-semibold">
              Unable to Load Article
            </h1>

            <p className="mt-4 text-slate-400">{error}</p>

            <Link
              to="/blog"
              className="mt-8 inline-flex rounded-full bg-electric px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Back to Blog
            </Link>
          </div>
        </section>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-ink text-white">
        <section className="flex min-h-[70vh] items-center justify-center px-5">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan">
              404
            </p>

            <h1 className="mt-4 text-4xl font-semibold">
              Article Not Found
            </h1>

            <p className="mt-4 text-slate-400">
              The article you're looking for doesn't exist.
            </p>

            <Link
              to="/blog"
              className="mt-8 inline-flex rounded-full bg-electric px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Back to Blog
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const pageTitle = post.seoTitle || `${post.title} | Fexkode`;

  const pageDescription =
    post.metaDescription ||
    post.excerpt ||
    "Fexkode cloud, DevOps and infrastructure insights.";

  const canonicalUrl =
    post.canonicalUrl ||
    `https://Fexkode.com/blog/${post.slug}`;

  const imageUrl = post.featuredImage || "https://fexkode.com/favicon.svg";

  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>{pageTitle}</title>

        <meta
          name="description"
          content={pageDescription}
        />

        <meta
          name="robots"
          content="index, follow"
        />

        <link
          rel="canonical"
          href={canonicalUrl}
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content={pageTitle}
        />

        <meta
          property="og:description"
          content={pageDescription}
        />

        <meta
          property="og:type"
          content="article"
        />

        <meta
          property="og:url"
          content={canonicalUrl}
        />

        <meta
          property="og:image"
          content={imageUrl}
        />

        {post.publishedAt && (
          <meta
            property="article:published_time"
            content={post.publishedAt}
          />
        )}

        {post.updatedAt && (
          <meta
            property="article:modified_time"
            content={post.updatedAt}
          />
        )}

        {post.author && (
          <meta
            property="article:author"
            content={post.author}
          />
        )}

        {post.category && (
          <meta
            property="article:section"
            content={post.category}
          />
        )}

        {/* Twitter */}
        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content={pageTitle}
        />

        <meta
          name="twitter:description"
          content={pageDescription}
        />

        <meta
          name="twitter:image"
          content={imageUrl}
        />

        {/* Blog Post Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: pageDescription,
            image: post.featuredImage
              ? [post.featuredImage]
              : ["https://fexkode.com/favicon.svg"],
            url: canonicalUrl,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt || post.publishedAt,
            author: {
              "@type": "Person",
              name: post.author || "Fexkode Team",
            },
            publisher: {
              "@type": "Organization",
              name: "Fexkode",
              url: "https://fexkode.com",
              logo: {
                "@type": "ImageObject",
                url: "https://fexkode.com/logo.svg",
              },
            },
          })}
        </script>
      </Helmet>

      <main className="min-h-screen bg-ink text-white">

        {/* Article Header */}
        <section className="border-b border-white/5 py-20 lg:py-28">
          <div className="mx-auto max-w-5xl px-5 lg:px-8">

            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-cyan"
            >
              ← Back to Blog
            </Link>

            <div className="mt-12">

              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em]">

                {post.category && (
                  <span className="text-cyan">
                    {post.category}
                  </span>
                )}

                {post.readingTime && (
                  <>
                    <span className="text-slate-700">
                      /
                    </span>

                    <span className="text-slate-500">
                      {post.readingTime}
                    </span>
                  </>
                )}

              </div>

              <h1 className="mt-6 max-w-5xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-400">
                  {post.excerpt}
                </p>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-slate-500">

                {post.author && (
                  <span>
                    By {post.author}
                  </span>
                )}

                {post.publishedAt && (
                  <>
                    <span className="text-slate-700">
                      •
                    </span>

                    <time dateTime={post.publishedAt}>
                      {new Date(
                        post.publishedAt
                      ).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </time>
                  </>
                )}

                {post.updatedAt && (
                  <>
                    <span className="text-slate-700">
                      •
                    </span>

                    <span>
                      Updated{" "}
                      {new Date(
                        post.updatedAt
                      ).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </>
                )}

              </div>

            </div>
          </div>
        </section>

        {/* Featured Image */}
        {post.featuredImage && (
          <section className="border-b border-white/5">
            <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-16">

              <div className="overflow-hidden rounded-2xl border border-white/10">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="h-auto w-full object-cover"
                />
              </div>

            </div>
          </section>
        )}

        {/* Article Content */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-5 lg:px-8">

            <article className="prose prose-invert max-w-none">

              {post.body && (
                <PortableText
                  value={post.body}
                  components={{
                    block: {
                      normal: ({ children }) => (
                        <p className="mb-6 text-base leading-8 text-slate-300">
                          {children}
                        </p>
                      ),

                      h2: ({ children }) => (
                        <h2 className="mb-5 mt-12 text-3xl font-semibold tracking-tight text-white">
                          {children}
                        </h2>
                      ),

                      h3: ({ children }) => (
                        <h3 className="mb-4 mt-10 text-2xl font-semibold text-white">
                          {children}
                        </h3>
                      ),

                      h4: ({ children }) => (
                        <h4 className="mb-3 mt-8 text-xl font-semibold text-white">
                          {children}
                        </h4>
                      ),

                      blockquote: ({ children }) => (
                        <blockquote className="my-8 border-l-2 border-cyan pl-6 text-lg italic leading-8 text-slate-400">
                          {children}
                        </blockquote>
                      ),
                    },

                    list: {
                      bullet: ({ children }) => (
                        <ul className="mb-6 ml-6 list-disc space-y-2 text-slate-300">
                          {children}
                        </ul>
                      ),

                      number: ({ children }) => (
                        <ol className="mb-6 ml-6 list-decimal space-y-2 text-slate-300">
                          {children}
                        </ol>
                      ),
                    },

                    marks: {
                      strong: ({ children }) => (
                        <strong className="font-semibold text-white">
                          {children}
                        </strong>
                      ),

                      em: ({ children }) => (
                        <em className="text-slate-200">
                          {children}
                        </em>
                      ),

                      link: ({ children, value }) => (
                        <a
                          href={value?.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan underline underline-offset-4 hover:text-white"
                        >
                          {children}
                        </a>
                      ),
                    },

                    types: {
                      image: ({ value }) => {
                        let imageUrl = value?.url || value?.asset?.url;
                        if (!imageUrl && value?.asset?._ref) {
                          imageUrl = value.asset._ref.startsWith("/uploads/")
                            ? value.asset._ref
                            : `/uploads/${value.asset._ref}`;
                        }

                        if (!imageUrl) {
                          return null;
                        }

                        return (
                          <figure className="my-10 flex flex-col items-center justify-center">
                            <img
                              src={imageUrl}
                              alt={value.alt || ""}
                              className="mx-auto w-[90%] max-w-[720px] rounded-2xl border border-white/10 object-contain"
                            />

                            {value.caption && (
                              <figcaption className="mt-3 text-center text-sm text-slate-500">
                                {value.caption}
                              </figcaption>
                            )}
                          </figure>
                        );
                      },
                    },
                  }}
                />
              )}

            </article>
          </div>
        </section>

        {/* CTA */}
        <section className="border-y border-white/5 py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">

            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan">
              {post.ctaTitle || "Need Help?"}
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              {post.ctaText ||
                "Planning your next infrastructure move?"}
            </h2>

            <Link
              to={post.ctaUrl || "/contact"}
              className="mt-8 inline-flex rounded-full bg-electric px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              {post.ctaLabel || "Talk to Fexkode"}
            </Link>

          </div>
        </section>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">

              <div className="mb-12">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan">
                  Related Articles
                </p>

                <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Continue exploring
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                {relatedPosts.map((related) => (
                  <Link
                    key={related._id}
                    to={`/blog/${related.slug}`}
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-deepBlue/30 transition duration-300 hover:-translate-y-1 hover:border-cyan/30"
                  >

                    {related.featuredImage ? (
                      <div className="aspect-[16/9] overflow-hidden">
                        <img
                          src={related.featuredImage}
                          alt={related.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="flex aspect-[16/9] items-center justify-center bg-deepBlue text-sm text-slate-500">
                        Fexkode
                      </div>
                    )}

                    <div className="p-7">

                      {related.category && (
                        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan">
                          {related.category}
                        </span>
                      )}

                      <h3 className="mt-4 text-xl font-semibold leading-snug">
                        {related.title}
                      </h3>

                      {related.excerpt && (
                        <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-400">
                          {related.excerpt}
                        </p>
                      )}

                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan">
                        Read Article →
                      </span>

                    </div>
                  </Link>
                ))}

              </div>
            </div>
          </section>
        )}

      </main>
    </>
  );
}

export default BlogPost;