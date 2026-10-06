import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const location = useLocation();

  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let isMounted = true;

    const verifyAdmin = async () => {
      try {
        const response = await fetch("/api/admin/verify", {
          method: "GET",
          credentials: "include",
        });

        if (!isMounted) return;

        if (response.ok) {
          setStatus("authenticated");
        } else {
          setStatus("unauthenticated");
        }
      } catch (error) {
        console.error("Admin verification error:", error);

        if (isMounted) {
          setStatus("unauthenticated");
        }
      }
    };

    verifyAdmin();

    return () => {
      isMounted = false;
    };
  }, []);

  if (status === "checking") {
    return (
      <main className="min-h-screen bg-ink px-5 py-10 text-white">
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-cyan" />

            <p className="text-sm text-slate-400">
              Checking admin access...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (status === "unauthenticated") {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
}

export default ProtectedRoute;