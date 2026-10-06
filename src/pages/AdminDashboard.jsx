import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FileText,
  Plus,
  LogOut,
  ArrowRight,
  Settings,
} from "lucide-react";

function AdminDashboard() {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      navigate("/admin/login", { replace: true });
    }
  };

  return (
    <main className="min-h-screen bg-ink px-5 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-10 flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              to="/"
              className="text-xl font-bold tracking-tight"
            >
              NEX<span className="text-cyan">KODE</span>
            </Link>

            <p className="mt-2 text-sm text-slate-400">
              Blog Administration
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-red-400/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LogOut size={16} />

            {isLoggingOut ? "Signing out..." : "Sign Out"}
          </button>
        </header>

        {/* Welcome */}
        <section className="mb-10">
          <p className="mb-2 text-sm font-medium text-cyan">
            ADMINISTRATION
          </p>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Manage Blog Content
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            Create, edit, and publish Fexkode blog articles using your PostgreSQL CMS.
          </p>
        </section>

        {/* Actions */}
        <section className="grid gap-5 md:grid-cols-2">
          {/* Articles */}
          <Link
            to="/admin/articles"
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-cyan/30 hover:bg-white/[0.05]"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-cyan/20 bg-cyan/10 text-cyan">
              <FileText size={22} />
            </div>

            <div className="flex items-end justify-between gap-5">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Articles
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  View existing articles and edit their content.
                </p>
              </div>

              <ArrowRight
                size={20}
                className="shrink-0 text-slate-500 transition duration-200 group-hover:translate-x-1 group-hover:text-cyan"
              />
            </div>
          </Link>

          {/* Create Article */}
          <Link
            to="/admin/articles/new"
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-cyan/30 hover:bg-white/[0.05]"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-cyan/20 bg-cyan/10 text-cyan">
              <Plus size={22} />
            </div>

            <div className="flex items-end justify-between gap-5">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Create Article
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Create a new blog article with your custom fields.
                </p>
              </div>

              <ArrowRight
                size={20}
                className="shrink-0 text-slate-500 transition duration-200 group-hover:translate-x-1 group-hover:text-cyan"
              />
            </div>
          </Link>
        </section>

        {/* CMS Information */}
        <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-400">
              <Settings size={19} />
            </div>

            <div>
              <h2 className="font-semibold text-white">
                Content Management
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Your PostgreSQL database is the source of truth for Fexkode blog content.
                All articles, authors, categories, and images are stored in your own system.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default AdminDashboard;