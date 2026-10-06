import cloudMigration from "./posts/what-is-cloud-migration";
import cloudMigrationStrategies from "./posts/cloud-migration-strategies";
import whatIsDevOps from "./posts/what-is-devops";
import whatIsKubernetes from "./posts/what-is-kubernetes";
import cloudSecurityBestPractices from "./posts/cloud-security-best-practices";

/*
 * All blog posts
 */
export const blogPosts = [
  cloudMigration,
  cloudMigrationStrategies,
  whatIsDevOps,
  whatIsKubernetes,
  cloudSecurityBestPractices,
];

/*
 * Main categories
 *
 * Blog.jsx expects these to be simple strings.
 */
export const categories = [
  "Cloud",
  "DevOps",
  "Security",
  "Engineering",
];

/*
 * Category structure required for the blog system.
 *
 * This keeps the subcategory information available
 * without breaking the existing Blog.jsx.
 */
export const categoryDetails = [
  {
    name: "Cloud",
    subcategories: [
      "Cloud Computing",
      "Cloud Migration",
      "Cloud Architecture",
      "Cloud Infrastructure",
    ],
  },
  {
    name: "DevOps",
    subcategories: [
      "CI/CD",
      "Kubernetes",
      "Docker",
      "Infrastructure as Code",
    ],
  },
  {
    name: "Security",
    subcategories: [
      "Cloud Security",
      "IAM",
      "Infrastructure Security",
      "Backup & Disaster Recovery",
    ],
  },
  {
    name: "Engineering",
    subcategories: [
      "Linux",
      "Networking",
      "Automation",
      "Observability",
    ],
  },
];

/*
 * Find one article by its SEO-friendly slug.
 */
export function getPostBySlug(slug) {
  return blogPosts.find(
    (post) => post.slug === slug
  );
}

/*
 * Get related articles.
 */
export function getRelatedPosts(currentPost, limit = 3) {
  return blogPosts
    .filter(
      (post) => post.slug !== currentPost.slug
    )
    .filter(
      (post) =>
        post.category === currentPost.category ||
        post.subcategory === currentPost.subcategory
    )
    .slice(0, limit);
}

/*
 * Get articles by category.
 */
export function getPostsByCategory(category) {
  return blogPosts.filter(
    (post) => post.category === category
  );
}

/*
 * Export individual posts if needed elsewhere.
 */
export {
  cloudMigration,
  cloudMigrationStrategies,
  whatIsDevOps,
  whatIsKubernetes,
  cloudSecurityBestPractices,
};