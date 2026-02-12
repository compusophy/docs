import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import tailwindPlugin from "./plugins/tailwind-config.cjs";
import "dotenv/config";

const COPYRIGHT = `
Copyright © ${new Date().getFullYear()} Quilibrium, Inc. \
<span>Licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY-SA 4.0.</a></span></br>
Built with Docusaurus.`;

const config: Config = {
  title: "Quilibrium Docs",
  tagline:
    "Learn how to get started building on the network, run a node, or just understand the technology",
  favicon: "img/favicon.ico",

  headTags: [
    {
      tagName: "link",
      attributes: {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/img/apple-touch-icon.png",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "manifest",
        href: "/manifest.webmanifest",
      },
    },
    {
      tagName: "meta",
      attributes: {
        name: "theme-color",
        content: "#ff056d",
      },
    },
  ],

  // Set the production url of your site here
  url: "https://docs.quilibrium.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // custom fields for the site
  customFields: {
    apiTesterEnabled: process.env.ENABLE_API_TESTER === "true",
  },


  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "QuilibriumNetwork", // Usually your GitHub org/user name.
  projectName: "docs", // Usually your repo name.

  // Fail the build for broken anchor (e.g. `/broken-link#anchor`) declared with 
  // the Heading component of Docusaurus.
  onBrokenAnchors: "throw",
  // Fail the build for broken links (e.g. `./broken-link`)
  onBrokenLinks: "throw",
  // Applies to duplicate routes created with the `@docusaurus/plugin-content-pages`
  // plugin.
  onDuplicateRoutes: 'throw',

  markdown: {
    hooks: {
      // Fail the build for broken markdown links. Note that this only applies to links
      // that have `.md` or `.mdx` extensions.
      onBrokenMarkdownLinks: "throw",
    },
  },

  // Make Docusaurus add a trailing slash to the URLs so that links like `/docs/foo` 
  // will be rewritten to `/docs/foo/`.
  // This is necessary to make the local environment match the production environment 
  // as GitHub Pages that adds trailing slashes to URLs unless they have an extension.
  trailingSlash: true,

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  future: {
    v4: {
      removeLegacyPostBuildHeadAttribute: true,
      useCssCascadeLayers: false,
    },
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/QuilibriumNetwork/docs/tree/main/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [tailwindPlugin],

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        hashed: true,
        indexBlog: false,
      }),
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    // Replace with your project's social card
    image: "img/socialcard-docs.png",
    navbar: {
      title: "",
      logo: {
        alt: "Quilibrium",
        src: "img/logo.svg",
        srcDark: "img/logo-dark.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "discover",
          position: "left",
          label: "Discover",
        },
        {
          type: "docSidebar",
          sidebarId: "learn",
          position: "left",
          label: "Learn",
        },
        {
          type: "docSidebar",
          sidebarId: "build",
          position: "left",
          label: "Build",
        },
        {
          type: "docSidebar",
          sidebarId: "protocol",
          position: "left",
          label: "Protocol"
        },
        {
          type: "docSidebar",
          sidebarId: "run",
          position: "left",
          label: "Run",
        },
              {
          type: "docSidebar",
          sidebarId: "api",
          position: "left",
          label: "API",
        },

        {
          label: "Quilibrium Website",
          href: "https://quilibrium.com",
          position: "right",
        },
        {
          label: "Code",
          href: "https://github.com/QuilibriumNetwork",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Discover Q",
              to: "/docs/discover/FAQ/",
            },
            {
              label: "Learn Q",
              to: "/docs/learn/block-storage/",
            },
            {
              label: "Build Applications",
              to: "/docs/category/applications",
            },
            {
              label: "API Docs",
              to: "/docs/api/overview",
            },

            {
              label: "Run a Node",
              to: "/docs/run-node/quick-start",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Discourse Forum",
              href: "https://discourse.quilibrium.com/",
            },
            {
              label: "Farcaster",
              href: "https://warpcast.com/~/channel/quilibrium",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Quilibrium Website",
              href: "https://quilibrium.com",
            },
            {
              label: "Blog",
              href: "https://paragraph.xyz/@quilibrium.com",
            },
            {
              label: "X",
              href: "https://x.com/QuilibriumInc",
            },
            {
              label: "Code",
              href: "https://github.com/QuilibriumNetwork",
            },
          ],
        },
      ],
      copyright: COPYRIGHT,
    },
    prism: {
      theme: prismThemes.oneLight,
      darkTheme: prismThemes.oneDark,
      additionalLanguages: ["protobuf", "go", "turtle"],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
