import { defineCollection, z } from "astro:content";

function removeDupsAndLowerCase(array: string[]) {
  if (!array.length) return array;
  const lowercaseItems = array.map((str) => str.toLowerCase());
  const distinctItems = new Set(lowercaseItems);
  return Array.from(distinctItems);
}

const postSchema = z.object({
  title: z.string(),
  description: z.string().min(50).max(160),
  publishDate: z
    .string()
    .or(z.date())
    .transform((val) => new Date(val)),
  coverImage: z
    .object({
      src: z.string().optional(),
      alt: z.string().default(""),
    })
    .optional(),
  tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
  draft: z.boolean().default(false),
  updatedDate: z
    .date()
    .optional()
    .transform((str) => (str ? new Date(str) : undefined)),
  ogImage: z.string().optional(),
  videoOnly: z.boolean().optional(),
  externalUrl: z.string().optional(),


  order: z.object({
    discriminant: z.boolean(),
    value: z.number().optional(),
  }).optional(),
  
  youtube: z.object({
    discriminant: z.boolean(),
    value: z.object({
      url: z.string().optional(),
      title: z.string().optional(),
      controls: z.boolean().optional(),
      mute: z.boolean().optional(),
      loop: z.boolean().optional(),
      start: z.number().optional(),
      end: z.number().optional(),
      useCustomPlayer: z.boolean().optional(),
      videoOnly: z.boolean().optional(),
    }).optional()
  }).optional(),
});
const postCollection = defineCollection({
  schema: postSchema.extend({
    body: z.string(),
  }),
  type: "content",
});


const faqs = defineCollection({
  type: 'content',
  schema: z.object({
    faqTitle: z.string().optional(),
    question: z.string(),
    order: z.number().default(0),
  }),
});


const testimonials = defineCollection({
  type: 'data',
  schema: z.object({
    testimonialTitle: z.string().optional(),
    name: z.string().optional(),
    location: z.string().optional(),
    quote: z.string().optional(),
    image: z.string().optional(),
    order: z.number().optional(),
  }),
});

const home = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    tagline: z.string().optional(),
    description: z.string(),
    phone: z.string().optional(),
    subheading: z.string().optional(),
    faqtitle: z.string().optional(),
    showMore: z.string().optional(),
    showApp: z.string().optional(),
    testimonialtitle: z.string().optional(),
    postsectiontitle: z.string().optional(),
    featureImage: z.object({
      src: z.string().optional(),
      alt: z.string().optional(),
    }).optional(),
    youtube: z.object({
      discriminant: z.boolean(),
      value: z.object({
        url: z.string().optional(),
        title: z.string().optional(),
        controls: z.boolean().optional(),
        useCustomPlayer: z.boolean().optional(),
        mute: z.boolean().optional(),
        loop: z.boolean().optional(),
        start: z.number().optional(),
        end: z.number().optional(),
        videoOnly: z.boolean().optional(),
        cta: z.string().optional(),

      }).optional()
    }).optional(),
  }),
});const siteSettings = defineCollection({
  type: 'data',
  schema: z.object({
    showHeader: z.boolean().optional(),
    showLogo: z.boolean().optional(),
    showHome: z.boolean().optional(),
    showTheme: z.boolean().optional(),
    showSwitch: z.boolean().optional(),
    showSearch: z.boolean().optional(),
    showFeature: z.boolean().optional(),
    showBio: z.boolean().optional(),
    showPosts: z.boolean().optional(),
    showTestimonials: z.boolean().optional(),
    showFAQ: z.boolean().optional(),
    showFooter: z.boolean().optional(),
    showTitles: z.boolean().optional(),
    showTags: z.boolean().optional(),
    enableImageBlur: z.boolean().optional(),
    showDates: z.boolean().optional(),
    showHomeGallery: z.boolean().optional(),
    MAX_POSTS: z.number().optional(),
    MAX_POSTS_PER_PAGE: z.number().optional(),
    showShare: z.boolean().optional(),
    logoImage: z.string().optional(),
    defaultView: z.enum(['grid', 'swipe']).optional(),
  }),
});
const pwaSettings = defineCollection({
  type: 'data',
  schema: z.object({
    showRobots: z.boolean().optional(),
    siteUrl: z.string().optional(),
    name: z.string(),
    shortName: z.string(),
    description: z.string(),
    themeColor: z.string(),
    backgroundColor: z.string(),
    startUrl: z.string(),
    display: z.enum(['standalone', 'fullscreen', 'minimal-ui', 'browser']),
    icon192: z.string(),
    icon512: z.string(),
    screenshot: z.string().optional(),
  })
});

const menuItems = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string().optional(),
    path: z.string().optional(),
    order: z.number().optional()
  }),
});

const photoSettings = defineCollection({
  type: 'data',
  schema: z.object({
    defaultDirectory: z.string().optional(),
    showCaptions: z.string().optional(),
    showGallerySelector: z.string().optional()
  }),
});

const styleAppearance = defineCollection({
  type: 'data',
  schema: z.object({
backgroundImage: z.string().optional(),
    lightBg: z.string().optional(),
    darkBg: z.string().optional(),
    lightAccent: z.string().optional(),
    darkAccent: z.string().optional(),
    lightAccent2: z.string().optional(),
    darkAccent2: z.string().optional(),
    lightHeader: z.string().optional(),
    darkHeader: z.string().optional(),
    lightLink: z.string().optional(),
    darkLink: z.string().optional(),
    lightText: z.string().optional(),
    darkText: z.string().optional(),
    siteFont: z.string().optional(),
    borderRadius: z.string().optional(),
  }),
});

const language = defineCollection({
  type: 'data',
  schema: z.object({
    copyright: z.string().optional(),
    homelink: z.string().optional(),
    viewmore: z.string().optional(),
    allimages: z.string().optional(),
    close: z.string().optional(),
    search: z.string().optional(),
    mute: z.string().optional(),
    progress: z.string().optional(),
    volume: z.string().optional(),
    tags: z.string().optional(),
    viewall: z.string().optional(),
    goback: z.string().optional(),
    shareText: z.string().optional(),
    copyButton: z.string().optional()
  }),
});

const social = defineCollection({
  type: 'data',
  schema: z.object({
    profile: z.string().optional(),
  }),
});


const post = defineCollection({
  type: 'content',
  schema: postSchema
});

const pitches = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string().optional(),
    showTitle: z.boolean().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    description: z.string().optional(),
    tagline: z.string().optional(),
    subheading1: z.string().optional(),
    text1: z.string().optional(),
    subheading2: z.string().optional(),
    subheading3: z.string().optional(),
    text2: z.string().optional(),
    text3: z.string().optional(),
  }),
});

const CTAs = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    ctaUrl: z.string(),
    description: z.string().optional(),
    showFancy: z.boolean().optional(),
  }),
});

const resume = defineCollection({
  type: 'content',
  schema: z.object({
    section: z.string(),
    showTitle: z.boolean().optional()
  }),
});

const resumeSettings = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string().optional(),
    showTitle: z.boolean().optional(),
    leftColumnItems: z.array(z.string()),
    rightColumnItems: z.array(z.string()),
  }),
});

export const collections = {
  post,
  faqs, 
  testimonials, 
  home, 
  siteSettings, 
  pwaSettings,
  menuItems,
  pitches,
  CTAs: CTAs,
  resume,
  resumeSettings,
};



export type PitchData = {
  slug: string;
  showTitle: boolean | null;
  tagline: string;
  text1: string;
  text2: string;
  text3: string;
  subheading1: string;
  subheading2: string;
  subheading3: string;
  image: string | null;
  imageAlt: string;
  description: string;
  title: string | null;
  divider: string | null;
  divider2: string | null;
};


