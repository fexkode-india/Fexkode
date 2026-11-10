import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import { trackEvent } from "./utils/analytics";

const AdminArticles = lazy(() => import("./pages/AdminArticles"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Solutions = lazy(() => import("./pages/Solutions"));
const CloudServices = lazy(() => import("./pages/CloudServices"));
const Industries = lazy(() => import("./pages/Industries"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const Contact = lazy(() => import("./pages/Contact"));
const AdminArticleNew = lazy(() => import("./pages/AdminArticleNew"));
const CloudMigration = lazy(() => import("./pages/Services/CloudMigration"));
const DevOpsAutomation = lazy(() => import("./pages/Services/DevopsAutomation"));
const ManagedCloud = lazy(() => import("./pages/Services/ManagedCloud"));
const CloudSecurity = lazy(() => import("./pages/Services/CloudSecurity"));
const KubernetesContainers = lazy(() => import("./pages/Services/KubernatesContainer"));
const DataCloudPlatform = lazy(() => import("./pages/Services/DataCloudPlatform"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Cookies = lazy(() => import("./pages/Cookies"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminArticleEdit = lazy(() => import("./pages/AdminArticleEdit"));
const WebDevelopment = lazy(() => import("./pages/WebDevelopment"));
const MobileAppDevelopment = lazy(() => import("./pages/MobileAppDevelopment"));
const Training = lazy(() => import("./pages/Training"));

function App() {
  const location = useLocation();
  const lenisRef = useRef(null);
  const initialLocationRef = useRef(true);

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

  // GTM records the initial page view. Notify it only of subsequent SPA routes
  // so GA4 is not sent the same initial page view twice.
  useEffect(() => {
    if (initialLocationRef.current) {
      initialLocationRef.current = false;
      return;
    }

    trackEvent("fexkode_route_change", {
      page_location: window.location.href,
      page_path: `${location.pathname}${location.search}${location.hash}`,
      page_title: document.title,
    });
  }, [location.hash, location.pathname, location.search]);

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
      <Suspense fallback={<div className="min-h-screen bg-[#050505]" aria-busy="true" />}>
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
              <Home organizationSchema={organizationSchema} websiteSchema={websiteSchema} />
              <Footer />
            </>
          }
        />
{/* Web Development */}
<Route
  path="/web-development"
  element={
    <>
      <Navbar />
      <WebDevelopment />
      <Footer />
    </>
  }
/>

{/* Mobile App Development */}
<Route
  path="/mobile-app-development"
  element={
    <>
      <Navbar />
      <MobileAppDevelopment />
      <Footer />
    </>
  }
/>

{/* Training */}
<Route
  path="/training"
  element={
    <>
      <Navbar />
      <Training />
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
      </Suspense>
    </>
  );
}

export default App;
