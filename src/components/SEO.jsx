
import { Helmet } from "react-helmet-async";

function SEO({
  title,
  description,
  canonical,
  image,
  type = "website",
  noindex = false,
  schema,
  publishedTime,
  modifiedTime,
}) {
  const siteUrl = "https://fexkode.com";

  const canonicalUrl = canonical
    ? canonical.startsWith("http")
      ? canonical
      : `${siteUrl}${canonical.startsWith("/") ? canonical : `/${canonical}`}`
    : siteUrl;

  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `${siteUrl}${image.startsWith("/") ? image : `/${image}`}`
    : `${siteUrl}/Fexkode-symbol.png`;

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: canonicalUrl,
  };

  const schemas = [pageSchema, ...(Array.isArray(schema) ? schema : schema ? [schema] : [])];

  return (
    <Helmet>
      <title>{title}</title>

      <meta
        name="description"
        content={description}
      />

      <meta
        name="robots"
        content={noindex ? "noindex, follow" : "index, follow"}
      />

      <link
        rel="canonical"
        href={canonicalUrl}
      />

      <link
        rel="icon"
        type="image/png"
        href="/Fexkode-symbol.png"
      />

      <link
        rel="shortcut icon"
        type="image/png"
        href="/Fexkode-symbol.png"
      />

      <link
        rel="apple-touch-icon"
        href="/Fexkode-symbol.png"
      />

      <meta
        property="og:title"
        content={title}
      />

      <meta
        property="og:description"
        content={description}
      />

      <meta
        property="og:type"
        content={type}
      />

      <meta
        property="og:url"
        content={canonicalUrl}
      />

      <meta
        property="og:image"
        content={imageUrl}
      />

      <meta property="og:site_name" content="Fexkode" />

      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}

      {type === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}

      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={title}
      />

      <meta
        name="twitter:description"
        content={description}
      />

      <meta name="twitter:image" content={imageUrl} />

      <script type="application/ld+json">{JSON.stringify(schemas)}</script>
    </Helmet>
  );
}

export default SEO;
