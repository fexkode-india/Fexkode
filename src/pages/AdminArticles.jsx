import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  Plus,
  RefreshCw,
} from "lucide-react";

function AdminArticles() {
  const location = useLocation();
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [flashMessage] = useState(
    location.state?.flashMessage || ""
  );

  /*
   * Clear the flash message from router state once shown,
   * so it doesn't reappear on refresh or back-navigation.
   */

  useEffect(() => {
    if (location.state?.flashMessage) {
      navigate(location.pathname, {
        replace: true,
        state: {},
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchArticles = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/articles", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to load articles.");
        return;
      }

      setArticles(data.articles || []);
    } catch (error) {
      console.error("Articles error:", error);

      setError(
        "Unable to connect to the article management service."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <main className="min-h-screen bg-ink px-5 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-10 flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              to="/admin"
              className="mb-4 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan/20 bg-cyan/10 text-cyan">
                <FileText size={21} />
              </div>

              <div>
                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Articles
                </h1>

                <p className="mt-1 text-sm text-slate-400">
                  Manage your Fexkode blog articles.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={fetchArticles}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-cyan/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                size={16}
                className={isLoading ? "animate-spin" : ""}
              />
              Refresh
            </button>

            <Link
              to="/admin/articles/new"
              className="flex items-center justify-center gap-2 rounded-full bg-electric px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-electric/90"
            >
              <Plus size={17} />
              Create Article
            </Link>
          </div>
        </header>

        {/* Flash message */}
        {flashMessage && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-5 py-4 text-sm leading-6 text-emerald-300">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
            <span>{flashMessage}</span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-400/20 bg-red-400/10 px-5 py-4 text-sm leading-6 text-red-300">
            {error}
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-cyan" />

            <p className="text-sm text-slate-400">
              Loading articles...
            </p>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !error && articles.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-400">
              <FileText size={21} />
            </div>

            <h2 className="text-lg font-semibold">
              No articles found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
              There are currently no blog articles in your database.
            </p>
          </div>
        )}

        {/* Articles */}
        {!isLoading && !error && articles.length > 0 && (
          <div className="space-y-4">
            {articles.map((article) => (
              <article
                key={article._id}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/15 hover:bg-white/[0.05]"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex min-w-0 gap-4">
                    {/* Image */}
                    <div className="hidden h-20 w-28 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] sm:block">
                      {article.image ? (
                        <img
                          src={article.image}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-slate-600">
                          <FileText size={20} />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="min-w-0">
                      <h2 className="truncate text-lg font-semibold text-white">
                        {article.title || "Untitled Article"}
                      </h2>

                      {article.excerpt && (
                        <p className="mt-2 line-clamp-2 max-w-3xl text-sm leading-6 text-slate-400">
                          {article.excerpt}
                        </p>
                      )}

                      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-slate-500">
                        {article.author && (
                          <span>By {article.author}</span>
                        )}

                        {article.categories?.length > 0 && (
                          <span>
                            {article.categories.join(", ")}
                          </span>
                        )}

                        {article.publishedAt && (
                          <span>
                            {new Date(
                              article.publishedAt
                            ).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        )}

                        {article.readingTime && (
                          <span>{article.readingTime}</span>
                        )}
                      </div>

                      {article.slug && (
                        <p className="mt-2 truncate text-xs text-cyan/70">
                          /blog/{article.slug}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Edit */}
                  <Link
                    to={`/admin/articles/${article._id}/edit`}
                    className="group flex shrink-0 items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-cyan/30 hover:text-white"
                  >
                    Edit Article
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default AdminArticles;