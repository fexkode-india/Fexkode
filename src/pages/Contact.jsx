import { Mail, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import SEO from "../components/SEO";
import { trackFormSubmission } from "../utils/analytics";
import PageHero from "../components/PageHero";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    emailjs.init("jwqI-hJtsIYUuTRSv");
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.service.trim()) {
      newErrors.service = "Please select a service";
    }

    if (!formData.message.trim()) {
      newErrors.message = "How can we help? field is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await emailjs.send(
        "service_uvfg0vq",
        "template_uchcxm5",
        {
          to_email: "aravindhant200@gmail.com",
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          company: formData.company || "Not provided",
          service: formData.service,
          message: formData.message,
          subject: `Business enquiry from: ${formData.name}`,
        }
      );

      console.log("Email sent successfully:", response);

      // Track form submission with Google Analytics
      trackFormSubmission("contact_form");

      setSubmitSuccess(true);

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: "",
      });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Email sending failed:", error);
      console.error("Error details:", {
        status: error.status,
        text: error.text,
        message: error.message,
      });

      let errorMessage = "Failed to send message. Please try again.";

      if (error.status === 400) {
        errorMessage =
          "Invalid email template or service configuration. Please check your EmailJS settings.";
      } else if (error.status === 401) {
        errorMessage =
          "Authentication failed. Please verify your Public Key, Service ID, and Template ID.";
      } else if (error.status === 422) {
        errorMessage =
          "Template parameter mismatch. Please check your EmailJS template variables.";
      }

      setErrors({ submit: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact | Fexkode"
        description="Contact Fexkode to discuss cloud migration, cloud infrastructure, DevOps, cloud security, managed cloud services, and other technology challenges."
        canonical="/contact"
      />

      <main className="min-h-screen pt-20">

        {/* Hero */}
        <PageHero
          eyebrow="Contact"
          title="Let's talk about your next technology challenge."
          description="Tell us what you're building, modernizing, or trying to improve. We'll help you identify the right path forward."
          image="/src/assets/images/page-heros/contact.png"
        />

        {/* Contact Area — Light */}
        <section className="border-t border-slate-200 bg-white py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">

            {/* Contact Information */}
            <div>

              <h1 className="text-3xl font-semibold uppercase tracking-[0.22em] text-cyan sm:text-4xl">
                Start a Conversation
              </h1>

              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Tell us what you need.
              </h2>

              <h3 className="mt-6 max-w-lg text-sm font-normal leading-7 text-slate-600 sm:text-base">
                Whether you're planning a cloud migration, improving
                infrastructure, or looking for better operational efficiency,
                we're ready to understand the challenge.
              </h3>

              <a
                href="mailto:COMPANY MAIL"
                className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-cyan/30 hover:bg-white hover:shadow-sm"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700">
                  <Mail size={20} />
                </span>

                <span>
                  <span className="block text-xs uppercase tracking-[0.12em] text-slate-500">
                    Email
                  </span>

                  <span className="mt-1 block text-sm font-medium text-slate-900">
                    info@fexcode.com
                  </span>
                </span>
              </a>

            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-sm sm:p-9"
            >
              {submitSuccess && (
                <div className="mb-6 rounded-xl border border-green-500/50 bg-green-50 p-4 text-sm text-green-700">
                  ✓ Message sent successfully! We'll get back to you soon.
                </div>
              )}

              {errors.submit && (
                <div className="mb-6 rounded-xl border border-red-500/50 bg-red-50 p-4 text-sm text-red-700">
                  ✗ {errors.submit}
                </div>
              )}

              <div className="grid gap-6 sm:grid-cols-2">

                <div>
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-slate-700"
                  >
                    Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`mt-2 w-full rounded-xl border ${
                      errors.name
                        ? "border-red-500 bg-red-50"
                        : "border-slate-200 bg-white"
                    } px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 transition focus:border-cyan/50`}
                  />

                  {errors.name && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-slate-700"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`mt-2 w-full rounded-xl border ${
                      errors.email
                        ? "border-red-500 bg-red-50"
                        : "border-slate-200 bg-white"
                    } px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 transition focus:border-cyan/50`}
                  />

                  {errors.email && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-slate-700"
                  >
                    Phone
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className={`mt-2 w-full rounded-xl border ${
                      errors.phone
                        ? "border-red-500 bg-red-50"
                        : "border-slate-200 bg-white"
                    } px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 transition focus:border-cyan/50`}
                  />

                  {errors.phone && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="text-sm font-medium text-slate-700"
                  >
                    Company
                  </label>

                  <input
                    id="company"
                    name="company"
                    type="text"
                    placeholder="Company name"
                    value={formData.company}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-cyan/50"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="service"
                    className="text-sm font-medium text-slate-700"
                  >
                    Service
                  </label>

                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className={`mt-2 w-full rounded-xl border ${
                      errors.service
                        ? "border-red-500 bg-red-50"
                        : "border-slate-200 bg-white"
                    } px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan/50`}
                  >
                    <option value="" className="text-slate-400">
                      Select a service
                    </option>

                    <option value="Cloud Migration">
                      Cloud Migration
                    </option>

                    <option value="Cloud Infrastructure">
                      Cloud Infrastructure
                    </option>

                    <option value="DevOps">
                      DevOps
                    </option>

                    <option value="Cloud Security">
                      Cloud Security
                    </option>

                    <option value="Managed Cloud">
                      Managed Cloud
                    </option>

                    <option value="Cloud Optimization">
                      Cloud Optimization
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>

                  {errors.service && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.service}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-slate-700"
                  >
                    How can we help?
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    placeholder="Tell us about your project or challenge..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className={`mt-2 w-full resize-none rounded-xl border ${
                      errors.message
                        ? "border-red-500 bg-red-50"
                        : "border-slate-200 bg-white"
                    } px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 transition focus:border-cyan/50`}
                  />

                  {errors.message && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.message}
                    </p>
                  )}
                </div>

              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group mt-7 inline-flex items-center gap-2 rounded-full bg-electric px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-electric/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}

                <ArrowRight
                  size={17}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </button>

            </form>

          </div>
        </section>

      </main>
    </>
  );
}

export default Contact;