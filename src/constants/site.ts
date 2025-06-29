export type NavigationItem = {
  name: string;
  path: string;
};

export const SITE = {
  name: "Vedanshi Prajapati",
  title: "FullStack Engineer & Curious Tinkerer",
  description: "Personal portfolio and blog",
} as const;

export const NAVIGATION: {
  main: NavigationItem[];
} = {
  main: [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: "Notes", path: "/notes" },
    { name: "Bookmarks", path: "/bookmarks" },
    { name: "Experience", path: "/experience" },
    { name: "Projects", path: "/projects" },
  ],
} as const;

export const CONTENT = {
  postsPerPage: 10,
  recentPostsLimit: 3,
  featuredProjectsLimit: 3,
} as const;

export const META = {
  openGraph: {
    type: "website",
    locale: "en_US",
  },
  twitter: {
    cardType: "summary_large_image",
  },
} as const;
