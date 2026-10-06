
import { Helmet } from "react-helmet-async";

function SEO({
  title,
  description,
  canonical,
  image,
  type = "website",
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
    : undefined;

  return (
    <Helmet>
      <title>{title}</title>

      <meta
        name="description"
        content={description}
      />

      <meta
        name="robots"
        content="index, follow"
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

      {imageUrl && (
        <meta
          property="og:image"
          content={imageUrl}
        />
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

      {imageUrl && (
        <meta
          name="twitter:image"
          content={imageUrl}
        />
      )}
    </Helmet>
  );
}

export default SEO;
