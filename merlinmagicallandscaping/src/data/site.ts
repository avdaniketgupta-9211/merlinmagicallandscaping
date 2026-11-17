export type Photograph = {
  src: string;
  alt: string;
  position?: string;
  reference?: boolean;
  credit?: { creator: string; url: string };
};

export type Service = {
  slug: string;
  title: string;
  summary: string;
  detail: string;
  image: Photograph;
};

export type PortfolioEntry = {
  id: string;
  title: string;
  category: string;
  caption: string;
  image: Photograph;
  /** Add only when this image and `image` show the same real project from a comparable angle. */
  before?: Photograph;
};

export type Review = {
  name: string;
  text: string;
  source: string;
  url?: string;
};

type Address = {
  street: string;
  locality: string;
  region: string;
  postalCode: string;
  country: string;
};

export const site = {
  name: "Merlin Magicallandscapi",
  url: "https://merlinmagicallandscapi.com",
  description: "Merlin Magicallandscapi is focused on landscaping and outdoor spaces. Explore garden inspiration and tell us what you have in mind for your outdoors.",
};

/** Owner-editable placeholders: publish only information the business has verified. */
export const business: {
  phone: { display: string; tel: string } | null;
  email: string | null;
  address: Address | null;
  serviceArea: string | null;
  introduction: string | null;
  mission: string | null;
  approach: string | null;
  values: string[];
  teamPhoto: Photograph | null;
  socials: { label: string; url: string }[];
} = {
  phone: null,
  email: null,
  address: null,
  serviceArea: null,
  introduction: null,
  mission: null,
  approach: null,
  values: [],
  teamPhoto: null,
  socials: [],
};

export const services: Service[] = [];
export const projects: PortfolioEntry[] = [];
export const reviews: Review[] = [];

function pexels(src: string, alt: string, creator: string, path: string, position?: string): Photograph {
  return { src: `/images/${src}.webp`, alt, position, reference: true, credit: { creator, url: `https://www.pexels.com/photo/${path}/` } };
}

export const photography = {
  hero: pexels("hero", "A winding garden path edged with sunlit lawn and mature trees", "Kim Lawrie", "sunny-garden-pathway-in-the-villages-florida-35493104", "center 56%"),
  manifesto: pexels("manifesto", "A sweeping lawn between layered green planting and flowering borders", "Silviu Muresan", "grass-covered-pathway-on-a-garden-13465670", "center 57%"),
  detail: pexels("plant-detail", "Green leaves with clusters of dark pink flowers", "Jonathan Cooper", "a-close-up-of-a-green-and-purple-bush-27451358"),
  patio: pexels("patio", "A stone dining terrace beneath a lush canopy of vines", "hi room", "sofa-chairs-and-a-table-on-the-patio-in-the-garden-17086144", "center 54%"),
  planting: pexels("alliums", "Purple allium flowers rising above a bed of green foliage", "Alex Ohan", "vibrant-purple-allium-flowers-in-bloom-outdoors-33353243", "center 55%"),
  stone: pexels("stone-path", "A paved garden walk between a low stone wall and dense ornamental planting", "Sergej", "charming-garden-pathway-in-summer-coesfeld-38548344", "center 59%"),
  arbour: pexels("arbour", "A gravel path and bench under a series of greenery-covered arches", "Willemijn Doelman", "serene-garden-pathway-lined-with-lush-greenery-35995121", "center 58%"),
  contact: pexels("contact", "A garden path shaded by hanging purple wisteria", "tommy picone", "beautiful-wisteria-and-tulip-garden-pathway-31523834", "center 52%"),
  steps: pexels("stepping-stones", "Natural stepping stones winding past tall grasses and a garden pond", "Skyler Ewing", "shed-on-a-botanical-garden-9898888", "center 58%"),
};

/** Keep media captions honest when changing the files below. */
export const film = {
  // The compiled film is not included in this source package; preview in image-only mode.
  source: "",
  poster: photography.hero.src,
  avifPoster: "/images/hero.avif",
  mediumPoster: "/images/hero-medium.avif",
  mobilePoster: "/images/hero-mobile.avif",
  isReference: true,
  credits: [
    { creator: "John One", url: "https://www.pexels.com/video/serene-garden-pathway-at-sunset-in-autumn-29111908/", title: "Garden pathway at sunset" },
    { creator: "Alef Morais", url: "https://www.pexels.com/video/modern-luxury-home-with-outdoor-patio-40807487/", title: "Outdoor patio" },
    { creator: "K", url: "https://www.pexels.com/video/gardener-spreading-mulch-in-backyard-37019470/", title: "Spreading mulch" },
    { creator: "Alex Kad", url: "https://www.pexels.com/video/close-up-shot-of-a-garden-pond-4166295/", title: "Garden pond detail" },
    { creator: "Pon Thhao", url: "https://www.pexels.com/video/tranquil-garden-scene-after-rainfall-32441197/", title: "A garden after rain" },
  ],
};

export const visualReferences: PortfolioEntry[] = [
  { id: "stone-and-greenery", title: "Stone & greenery", category: "Pathways", caption: "A low stone edge and a winding path bring structure to layered planting.", image: photography.stone },
  { id: "an-outdoor-room", title: "An outdoor room", category: "Outdoor living", caption: "A vine-covered canopy makes a natural ceiling for an open-air dining space.", image: photography.patio },
  { id: "layers-in-bloom", title: "Layers in bloom", category: "Planting", caption: "Repeating purple blooms make a loose, textured rhythm through the border.", image: photography.planting },
  { id: "the-slow-route", title: "The slow route", category: "Pathways", caption: "Broad stepping stones slow the pace by the water’s edge.", image: photography.steps },
];

export const navigation = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Our Work", id: "work" },
  { label: "Process", id: "process" },
] as const;

export const processSteps = [
  { title: "Discover", text: "Talk through the property, what you need and how you’d like your outdoor space to feel." },
  { title: "Plan", text: "Develop an approach that makes sense for the site and the way you use it." },
  { title: "Create", text: "Carry out the landscaping work agreed in the plan." },
  { title: "Enjoy", text: "Settle into the finished space and make it part of everyday life." },
];
