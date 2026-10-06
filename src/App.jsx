import { Helmet } from "react-helmet-async";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminArticles from "./pages/AdminArticles";
import Home from "./pages/Home";
import About from "./pages/About";
import Solutions from "./pages/Solutions";
import CloudServices from "./pages/CloudServices";
import Industries from "./pages/Industries";
import CaseStudies from "./pages/CaseStudies";
import Contact from "./pages/Contact";
import AdminArticleNew from "./pages/AdminArticleNew";

import CloudMigration from "./pages/Services/CloudMigration";
import DevOpsAutomation from "./pages/Services/DevopsAutomation";
import ManagedCloud from "./pages/Services/ManagedCloud";
import CloudSecurity from "./pages/Services/CloudSecurity";
import KubernetesContainers from "./pages/Services/KubernatesContainer";
import DataCloudPlatform from "./pages/Services/DataCloudPlatform";

import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminArticleEdit from "./pages/AdminArticleEdit";

function App() {
  const location = useLocation();
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
  duration: 0.55,
  easing: (t) => 1 - Math.pow(1 - t, 4),
  orientation: "vertical",
  gestureOrientation: "vertical",
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1.2,
});

    lenisRef.current = lenis;

    let rafId;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Reset scroll when changing pages
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, {
        immediate: true,
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  // Track page views with Google Analytics
  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", "G-XXXXXXXXXX", {
        page_path: location.pathname,
        page_title: document.title,
      });
    }
  }, [location]);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Fexkode",
    url: "https://fexkode.com",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Fexkode",
    url: "https://fexkode.com",
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>

        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
      </Helmet>

      <Routes>
        {/* Admin Login */}
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Home */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />

        {/* About */}
        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <About />
              <Footer />
            </>
          }
        />

        {/* Solutions */}
        <Route
          path="/solutions"
          element={
            <>
              <Navbar />
              <Solutions />
              <Footer />
            </>
          }
        />

        {/* Cloud Services */}
        <Route
          path="/cloud-services"
          element={
            <>
              <Navbar />
              <CloudServices />
              <Footer />
            </>
          }
        />

        {/* Industries */}
        <Route
          path="/industries"
          element={
            <>
              <Navbar />
              <Industries />
              <Footer />
            </>
          }
        />

        {/* Case Studies */}
        <Route
          path="/case-studies"
          element={
            <>
              <Navbar />
              <CaseStudies />
              <Footer />
            </>
          }
        />

        {/* Blog */}
        <Route
          path="/blog"
          element={
            <>
              <Navbar />
              <Blog />
              <Footer />
            </>
          }
        />

        {/* Blog Post */}
        <Route
          path="/blog/:slug"
          element={
            <>
              <Navbar />
              <BlogPost />
              <Footer />
            </>
          }
        />

        {/* Contact */}
        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <Contact />
              <Footer />
            </>
          }
        />

        {/* Cloud Migration */}
        <Route
          path="/solutions/cloud-migration"
          element={
            <>
              <Navbar />
              <CloudMigration />
              <Footer />
            </>
          }
        />

        {/* DevOps Automation */}
        <Route
          path="/solutions/devops-automation"
          element={
            <>
              <Navbar />
              <DevOpsAutomation />
              <Footer />
            </>
          }
        />

        {/* Managed Cloud */}
        <Route
          path="/solutions/managed-cloud"
          element={
            <>
              <Navbar />
              <ManagedCloud />
              <Footer />
            </>
          }
        />

        {/* Cloud Security */}
        <Route
          path="/solutions/cloud-security"
          element={
            <>
              <Navbar />
              <CloudSecurity />
              <Footer />
            </>
          }
        />

        {/* Kubernetes Containers */}
        <Route
          path="/solutions/kubernetes-containers"
          element={
            <>
              <Navbar />
              <KubernetesContainers />
              <Footer />
            </>
          }
        />

        {/* Data Cloud Platform */}
        <Route
          path="/solutions/data-cloud-platform"
          element={
            <>
              <Navbar />
              <DataCloudPlatform />
              <Footer />
            </>
          }
        />

        {/* Privacy */}
        <Route
          path="/privacy"
          element={
            <>
              <Navbar />
              <Privacy />
              <Footer />
            </>
          }
        />

        {/* Terms */}
        <Route
          path="/terms"
          element={
            <>
              <Navbar />
              <Terms />
              <Footer />
            </>
          }
        />

        {/* Cookies */}
        <Route
          path="/cookies"
          element={
            <>
              <Navbar />
              <Cookies />
              <Footer />
            </>
          }
        />

        {/* Admin Articles */}
        <Route
          path="/admin/articles"
          element={
            <ProtectedRoute>
              <AdminArticles />
            </ProtectedRoute>
          }
        />

        {/* New Admin Article */}
        <Route
          path="/admin/articles/new"
          element={<AdminArticleNew />}
        />

        {/* Edit Admin Article */}
        <Route
          path="/admin/articles/:id/edit"
          element={
            <ProtectedRoute>
              <AdminArticleEdit />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <NotFound />
              <Footer />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;