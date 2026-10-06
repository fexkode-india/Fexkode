import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import PageHero from "../components/PageHero";

const categories = [
  "Cloud",
  "DevOps",
  "Security",
  "Engineering",
];

function BlogCard({ post }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition duration-300 hover:-translate-y-1 hover:border-cyan/30 hover:bg-white hover:shadow-lg">
      <Link
        to={`/blog/${post.slug}`}
        className="block overflow-hidden"
      >
        <div className="aspect-[16/9] overflow-hidden">
          {post.featuredImage ? (
            <img
              src={post.featuredImage}
              alt={post.title || "Fexkode article"}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-100 text-sm text-slate-500">
              Fexkode
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan">
            {post.category || "Engineering"}
          </span>

          {post.readingTime && (
            <span className="text-xs text-slate-500">
              {post.readingTime}
            </span>
          )}
        </div>

        <h2 className="mt-5 text-xl font-semibold leading-snug text-slate-900">
          <Link
            to={`/blog/${post.slug}`}
            className="transition hover:text-cyan"
          >
            {post.title}
          </Link>
        </h2>

        <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">
          {post.excerpt || ""}
        </p>

        <div className="mt-7 border-t border-slate-200 pt-5">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>{post.author || "Fexkode Team"}</span>

            {post.publishedAt && (
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString(
                  "en-GB",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }
                )}
              </time>
            )}
          </div>

          <Link
            to={`/blog/${post.slug}`}
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-cyan transition hover:text-slate-900"
          >
            Read Article

            <span className="transition group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}

function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        const data = await res.json();
        setPosts(data || []);
      } catch (err) {
        console.error("Posts fetch error:", err);
        setError("Unable to load blog articles.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((post) =>
          post.categories?.includes(activeCategory)
        );

  /*
   * Your Sanity schema does not currently have
   * a "featured" field.
   *
   * Therefore, the newest article is used as
   * the featured article.
   */
  const featuredPost =
    activeCategory === "All" && posts.length > 0
      ? posts[0]
      : null;

  return (
    <>
      <SEO
        title="Cloud & DevOps Blog | Fexkode"
        description="Practical insights on cloud computing, cloud migration, infrastructure, DevOps, Kubernetes, security and modern engineering from Fexkode."
        canonical="https://fexkode.com/blog"
        image={featuredPost?.featuredImage}
      />

      <main className="min-h-screen bg-ink text-white">

        {/* =========================
            HERO
        ========================= */}

        <PageHero
          eyebrow="Fexkode Insights"
          title="Cloud technology. Explained properly."
          description="Practical insights on cloud computing, infrastructure, DevOps, security, automation and modern engineering."
          image="/src/assets/images/page-heros/blog.jpg"
        />

        {/* =========================
            CATEGORIES — Light
        ========================= */}

        <section className="border-b border-slate-200 bg-white text-slate-900">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">

            <nav
              aria-label="Blog categories"
              className="flex gap-2 overflow-x-auto py-5"
            >
              <button
                type="button"
                onClick={() => setActiveCategory("All")}
                className={`whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-medium transition ${
                  activeCategory === "All"
                    ? "border-electric bg-electric text-white"
                    : "border-slate-200 text-slate-600 hover:border-cyan/30 hover:text-slate-900"
                }`}
              >
                All
              </button>

              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-medium transition ${
                    activeCategory === category
                      ? "border-electric bg-electric text-white"
                      : "border-slate-200 text-slate-600 hover:border-cyan/30 hover:text-slate-900"
                  }`}
                >
                  {category}
                </button>
              ))}
            </nav>

          </div>
        </section>

        {/* =========================
            FEATURED ARTICLE — Dark
        ========================= */}

        {!loading && featuredPost && (
          <section className="border-b border-white/5 bg-ink py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">

              <div className="mb-8">
                <h1 className="text-3xl font-semibold uppercase tracking-[0.22em] text-cyan sm:text-4xl">
                  Featured Article
                </h1>
              </div>

              <Link
                to={`/blog/${featuredPost.slug}`}
                className="group grid overflow-hidden rounded-2xl border border-white/10 bg-deepBlue/30 lg:grid-cols-2"
              >

                <div className="aspect-[16/10] overflow-hidden lg:aspect-auto">
                  {featuredPost.featuredImage ? (
                    <img
                      src={featuredPost.featuredImage}
                      alt={
                        featuredPost.title ||
                        "Fexkode featured article"
                      }
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full min-h-[300px] items-center justify-center bg-deepBlue text-slate-500">
                      Fexkode
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">

                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.15em]">

                    <span className="text-cyan">
                      {featuredPost.category ||
                        "Engineering"}
                    </span>

                    {featuredPost.readingTime && (
                      <>
                        <span className="text-slate-700">
                          /
                        </span>

                        <span className="text-slate-600">
                          {featuredPost.readingTime}
                        </span>
                      </>
                    )}

                  </div>

                  <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
                    {featuredPost.title}
                  </h2>

                  <h3 className="mt-6 text-sm font-normal leading-7 text-slate-400 sm:text-base">
                    {featuredPost.excerpt || ""}
                  </h3>

                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-cyan">

                    Read Article

                    <span className="transition group-hover:translate-x-1">
                      →
                    </span>

                  </span>

                </div>
              </Link>

            </div>
          </section>
        )}

        {/* =========================
            ARTICLES — Light
        ========================= */}

        <section className="bg-white py-20 text-slate-900 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">

            <div className="mb-12">
              <h1 className="text-3xl font-semibold uppercase tracking-[0.22em] text-cyan sm:text-4xl">
                Articles
              </h1>

              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Explore our latest insights
              </h2>
            </div>

            {loading ? (
              <div className="py-20 text-center">
                <p className="text-slate-500">
                  Loading articles...
                </p>
              </div>
            ) : error ? (
              <div className="py-20 text-center">
                <p className="text-red-400">
                  {error}
                </p>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-slate-500">
                  No articles in this category yet.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                {filteredPosts
                  .filter(
                    (post) =>
                      activeCategory !== "All" ||
                      post._id !== featuredPost?._id
                  )
                  .map((post) => (
                    <BlogCard
                      key={post._id}
                      post={post}
                    />
                  ))}

              </div>
            )}

          </div>
        </section>

        {/* =========================
            CONTENT CLUSTERS — Dark
        ========================= */}

        <section className="border-y border-white/5 bg-deepBlue/20 py-20 lg:py-28">

          <div className="mx-auto max-w-7xl px-5 lg:px-8">

            <div className="max-w-3xl">

              <h1 className="text-3xl font-semibold uppercase tracking-[0.22em] text-cyan sm:text-4xl">
                Content Clusters
              </h1>

              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Go deeper into modern infrastructure.
              </h2>

              <h3 className="mt-5 text-sm font-normal leading-7 text-slate-400 sm:text-base">
                Explore connected topics across cloud migration,
                DevOps and cloud security instead of isolated
                articles.
              </h3>

            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">

              <Link
                to="/blog/what-is-cloud-migration"
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition hover:border-cyan/30"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan">
                  Cloud
                </span>

                <h3 className="mt-5 text-2xl font-semibold">
                  Cloud Migration
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  Migration strategies, planning,
                  modernization and common challenges.
                </p>

                <span className="mt-6 inline-block text-sm text-slate-300">
                  Explore →
                </span>
              </Link>

              <Link
                to="/blog/what-is-kubernetes"
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition hover:border-cyan/30"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan">
                  DevOps
                </span>

                <h3 className="mt-5 text-2xl font-semibold">
                  DevOps & Kubernetes
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  CI/CD, containers, Kubernetes and
                  infrastructure automation.
                </p>

                <span className="mt-6 inline-block text-sm text-slate-300">
                  Explore →
                </span>
              </Link>

              <Link
                to="/blog/cloud-security-best-practices"
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition hover:border-cyan/30"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan">
                  Security
                </span>

                <h3 className="mt-5 text-2xl font-semibold">
                  Cloud Security
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  IAM, infrastructure security,
                  monitoring and disaster recovery.
                </p>

                <span className="mt-6 inline-block text-sm text-slate-300">
                  Explore →
                </span>
              </Link>

            </div>

          </div>
        </section>

        {/* =========================
            CTA — Light
        ========================= */}

        <section className="border-t border-slate-200 bg-white py-20 text-slate-900 lg:py-28">

          <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">

            <h1 className="text-3xl font-semibold uppercase tracking-[0.22em] text-cyan sm:text-4xl">
              Need Help?
            </h1>

            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Planning your next infrastructure move?
            </h2>

            <h3 className="mx-auto mt-5 max-w-2xl text-sm font-normal leading-7 text-slate-600 sm:text-base">
              Talk with Fexkode about cloud, infrastructure,
              DevOps, automation and security.
            </h3>

            <Link
              to="/contact"
              className="mt-8 inline-flex rounded-full bg-electric px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Talk to Fexkode
            </Link>

          </div>

        </section>

      </main>
    </>
  );
}

export default Blog;