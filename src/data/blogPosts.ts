export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  /** Opens on Medium or elsewhere instead of an on-site article page */
  externalUrl?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "10-backend-concepts",
    title:
      "10 Backend Concepts That Can Take You From Writing Code to Understanding Systems",
    excerpt:
      "Ten foundational backend ideas—APIs, data, auth, caching, and more—that help you reason about how real applications work beyond the syntax.",
    content: "",
    externalUrl:
      "https://medium.com/@sm2275470/10-backend-concepts-that-can-take-you-from-writing-code-to-understanding-systems-f6c2a46fc8f7",
  },
  {
    slug: "why-node-js-still-popular",
    title:
      "Why Is Node.js Still So Popular After More Than 15 Years? Let's Dive Into Its History",
    excerpt:
      "A look at how Node.js started, what made it take off, and why it still powers so much of the web more than a decade later.",
    content: "",
    externalUrl:
      "https://medium.com/@sm2275470/why-is-node-js-still-so-popular-after-more-than-15-years-lets-dive-into-its-history-951e3624e9cf",
  },
];
