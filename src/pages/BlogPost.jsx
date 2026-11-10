import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import { trackContentView } from "../utils/analytics";
import SEO from "../components/SEO";
import { getPostBySlug, getRelatedPosts } from "../data/blog";

const normalizeBundledPost = (post) => ({
  ...post,
  _id: post._id || post.slug,
  publishedAt: post.publishedAt || post.datePublished,
  updatedAt: post.updatedAt || post.dateModified,
});

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
          if (res.status === 404) throw new Error("Article not found in API");
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
        const bundledPost = getPostBySlug(slug);
        if (bundledPost) {
          setPost(normalizeBundledPost(bundledPost));
          setRelatedPosts(getRelatedPosts(bundledPost).map(normalizeBundledPost));
        } else {
          console.error("Blog post fetch error:", err);
          setError("Unable to load this article.");
        }
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
      <>
        <SEO title="Article Unavailable | Fexkode" description="This article is currently unavailable." noindex />
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
      </>
    );
  }

  if (!post) {
    return (
      <>
        <SEO title="Article Not Found | Fexkode" description="The article you're looking for could not be found." noindex />
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
      </>
    );
  }

  const pageTitle = post.seoTitle || `${post.title} | Fexkode`;

  const pageDescription =
    post.metaDescription ||
    post.excerpt ||
    "Fexkode cloud, DevOps and infrastructure insights.";

  const canonicalUrl =
    post.canonicalUrl ||
    `https://fexkode.com/blog/${post.slug}`;

  const imageUrl = post.featuredImage || "https://fexkode.com/Fexkode-symbol.png";

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
        image={imageUrl}
        type="article"
        publishedTime={post.publishedAt}
        modifiedTime={post.updatedAt || post.publishedAt}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: pageDescription,
            image: post.featuredImage
              ? [post.featuredImage]
              : ["https://fexkode.com/Fexkode-symbol.png"],
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
                url: "https://fexkode.com/Fexkode-symbol.png",
              },
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://fexkode.com/" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://fexkode.com/blog" },
              { "@type": "ListItem", position: 3, name: post.title, item: canonicalUrl },
            ],
          },
        ]}
      />

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
                  loading="lazy"
                  decoding="async"
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
                              loading="lazy"
                              decoding="async"
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

              {!post.body && post.content?.map((block, index) => {
                if (block.type === "heading") {
                  const Heading = `h${Math.min(Math.max(block.level || 2, 2), 4)}`;
                  return (
                    <Heading
                      key={`${block.id || block.text}-${index}`}
                      id={block.id}
                      className={block.level === 3 ? "mb-4 mt-10 text-2xl font-semibold text-white" : "mb-5 mt-12 text-3xl font-semibold tracking-tight text-white"}
                    >
                      {block.text}
                    </Heading>
                  );
                }

                if (block.type === "list") {
                  return (
                    <ul key={`list-${index}`} className="mb-6 ml-6 list-disc space-y-2 text-slate-300">
                      {block.items?.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  );
                }

                return <p key={`paragraph-${index}`} className="mb-6 text-base leading-8 text-slate-300">{block.text}</p>;
              })}

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
                          loading="lazy"
                          decoding="async"
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
