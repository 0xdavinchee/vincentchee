export type YearMonth = `${number}-${string}`;

export interface Role {
  company: string;
  title: string;
  start: YearMonth;
  /** null = present */
  end: YearMonth | null;
  location: string;
  url?: string;
  highlights: string[];
  /** only shown for recent roles */
  stack?: string[];
}

export interface Project {
  name: string;
  blurb: string;
  url: string;
  tags: string[];
  note?: string;
}

export interface Video {
  id: string;
  title: string;
  views: string;
  /** filename in src/assets/videos */
  thumb: string;
}

export interface Social {
  label: string;
  handle: string;
  url: string;
  side: "build" | "create";
}

export interface Stat {
  value: string;
  label: string;
}

export const identity = {
  name: "Vincent Chee",
  first: "Vincent",
  last: "Chee",
  chinese: "徐冠雄",
  greeting: "gm, I'm Vincent.",
  tagline: "Life is too short to not have fun.",
  now: "Building something.",
  email: "itsdavinchee@gmail.com",
  languages: ["English", "中文", "Français"],
  siteUrl: "https://vincentchee.com",
  description:
    "Vincent Chee: AI-first engineer and fun builder. Malaysian-Chinese and Taiwanese, raised in Beijing, now in Vietnam.",
};

export const buildIntro =
  "I enjoy leveraging technology to create products and experiences that have an impact on people's lives. Seven years shipping software, most of it onchain. These days I build AI-first, using models as leverage to ship more than I could alone.";

export const heritage = ["Malaysian-Chinese", "Taiwanese"];

export interface Place {
  city: string;
  country: string;
  years: string;
  note: string;
  now?: boolean;
}

/** Everywhere I've lived, oldest first */
export const places: Place[] = [
  { city: "Beijing", country: "China", years: "→ 2013", note: "Grew up" },
  { city: "Schenectady", country: "New York", years: "2013 – 17", note: "Union College" },
  { city: "New York City", country: "USA", years: "2017 – 20", note: "First eng job" },
  { city: "Kota Kinabalu", country: "Malaysia", years: "2020 – 21", note: "Co-founded Rootinify" },
  { city: "Tallinn", country: "Estonia", years: "2021 – 24", note: "Superfluid" },
  { city: "Da Nang", country: "Vietnam", years: "Now", note: "Building, filming, eating", now: true },
];

export const buildStats: Stat[] = [
  { value: "7+", label: "years shipping" },
  { value: "2y10m", label: "at Superfluid" },
  { value: "1h → 30m", label: "CI build time" },
  { value: "SDK-Core", label: "owned end to end" },
];

export const roles: Role[] = [
  {
    company: "Hypotenuse Labs",
    title: "Software Engineer",
    start: "2024-10",
    end: "2025-01",
    location: "Remote",
    highlights: [
      "Redesigned and reimplemented smart contracts enabling generalized cross-chain actions for the t3rn protocol.",
      "Shipped an end-to-end cross-chain NFT mint demo: source-chain order, off-chain listener, destination-chain execution.",
    ],
    stack: ["Solidity", "Foundry", "TypeScript"],
  },
  {
    company: "Superfluid",
    title: "Senior Web3 Engineer",
    start: "2021-08",
    end: "2024-05",
    location: "Tallinn, Estonia",
    url: "https://superfluid.org",
    highlights: [
      "Owned the smart contracts and subgraph for AlfaFrens, the viral app built on Superfluid, and pitched in on frontend and backend.",
      "Designed and shipped core protocol features: General Distribution Agreement, ERC20x, 3Ps, minimum deposit, ACL, App Credit Rule CFA-2.",
      "Led SDK-Core, rebuilt on ethers.js, and managed the Superfluid subgraphs with multi-network deploys and e2e tests in CI.",
      "Drove Truffle → Hardhat → Foundry, halving contract test CI from ~1h to ~30m.",
    ],
    stack: ["Solidity", "Foundry", "Hardhat", "The Graph", "ethers.js", "wagmi", "viem", "GitHub Actions"],
  },
  {
    company: "Freelance",
    title: "Smart Contract Engineer",
    start: "2021-06",
    end: "2021-08",
    location: "Kota Kinabalu, Malaysia",
    highlights: [
      "Built an NFT-collateralized lending vault prototype for Wurla, with interest accruing every block.",
      "Designed tokenomics for an NFT liquidity protocol priced off Uniswap TWAP oracles.",
      "Implemented UUPS upgradability for Treasure Chess.",
    ],
  },
  {
    company: "Rootinify",
    title: "Co-Founder",
    start: "2020-07",
    end: "2021-04",
    location: "Kota Kinabalu, Malaysia",
    highlights: [
      "Took a habit tracker from idea to Wyoming LLC to MVP.",
      "Owned growth strategy, the Gatsby landing page, and a Node + MongoDB backend.",
    ],
  },
  {
    company: "Operatic",
    title: "Developer II",
    start: "2020-02",
    end: "2020-04",
    location: "New York, NY",
    highlights: [
      "Learned PHP on the job and shipped membership permissions and UPS shipping logic.",
      "Built a Slack-like community feature for EveryMother on getstream.io.",
    ],
  },
  {
    company: "UpTop",
    title: "Software Engineer",
    start: "2017-10",
    end: "2020-02",
    location: "New York, NY",
    highlights: [
      "Built v1 of the renter platform from scratch: search, schedule, apply, sign, pay.",
      "Live-updating map search over all listings with clustered Google Maps markers and Haversine distance sort.",
      "Built the transactions ledger for v1 of the owner accounting product.",
    ],
  },
  {
    company: "Deloitte",
    title: "Front-End Web Developer Intern",
    start: "2016-07",
    end: "2016-09",
    location: "Beijing, China",
    highlights: ["Implemented the frontend of BMW's IT management system with the consulting team."],
  },
  {
    company: "EY",
    title: "IT Advisory and Tax Intern",
    start: "2015-06",
    end: "2015-08",
    location: "Beijing, China",
    highlights: ["Researched mobile-payment market entry for Huawei, and China's VAT reform for the tax practice."],
  },
];

export const education = {
  school: "Union College",
  degree: "B.S. Computer Science, minor in Economics",
  years: "2013 – 2017",
};

export const projects: Project[] = [
  {
    name: "Piped Piper",
    blurb: "A Superfluid Super App that takes many incoming money streams and reroutes them to many outflows.",
    url: "https://github.com/0xdavinchee/piped-piper",
    tags: ["Solidity", "React", "The Graph"],
    note: "ETHGlobal HackMoney 2021",
  },
  {
    name: "react-typescript-boilerplate",
    blurb: "A batteries-included starting point for React + TypeScript projects.",
    url: "https://github.com/0xdavinchee/react-typescript-boilerplate",
    tags: ["React", "TypeScript"],
    note: "16 ★",
  },
  {
    name: "farmer",
    blurb: "Automates yield farming across multiple networks to keep returns maximized.",
    url: "https://github.com/0xdavinchee/farmer",
    tags: ["TypeScript", "DeFi"],
  },
  {
    name: "turborepo-foundry-template",
    blurb: "Monorepo template wiring Foundry contracts to a TypeScript app.",
    url: "https://github.com/0xdavinchee/turborepo-foundry-template",
    tags: ["Solidity", "Turborepo"],
  },
];

export const createIntro =
  "I love to laugh, learn and live life to the fullest. I splurge on experiences: traveling, cooking and eating delicious food. Lately I film it.";

export const createStats: Stat[] = [
  { value: "156", label: "videos published" },
  { value: "463", label: "YouTube subscribers" },
  { value: "3", label: "languages spoken" },
];

export const videos: Video[] = [
  {
    id: "SQgRv4CuwQo",
    title: "Can a Programmer Survive a Day in a Fine Dining Kitchen",
    views: "491",
    thumb: "SQgRv4CuwQo.jpg",
  },
  { id: "uoww13AJWSY", title: "$1 vs $100 Meal in Vietnam", views: "1.1K", thumb: "uoww13AJWSY.jpg" },
  {
    id: "4xJb9iK5iE4",
    title: "Is life in the West really better? A Viet Kieu on returning to Da Nang",
    views: "2K",
    thumb: "4xJb9iK5iE4.jpg",
  },
  {
    id: "6vK-00pMAwk",
    title: "I Tried Vietnam's Spiciest Burger Challenge (Big Mistake)",
    views: "1.2K",
    thumb: "6vK-00pMAwk.jpg",
  },
];

export const standup = {
  headline: "I quit my job to try stand-up comedy.",
  body: "I'm comfortable with extreme discomfort, collecting experiences that seem random but are challenging.",
};

export const socials: Social[] = [
  { label: "GitHub", handle: "0xdavinchee", url: "https://github.com/0xdavinchee", side: "build" },
  { label: "X", handle: "0xdavinchee", url: "https://x.com/0xdavinchee", side: "build" },
  { label: "Farcaster", handle: "0xdavinchee", url: "https://farcaster.xyz/0xdavinchee", side: "build" },
  { label: "YouTube", handle: "itsdavinchee", url: "https://www.youtube.com/@itsdavinchee", side: "create" },
  { label: "TikTok", handle: "itsdavinchee", url: "https://www.tiktok.com/@itsdavinchee", side: "create" },
  { label: "Instagram", handle: "itsdavinchee", url: "https://www.instagram.com/itsdavinchee/", side: "create" },
];

export const elsewhereWriting = [
  { label: "Substack", url: "https://0xdavinchee.substack.com/" },
  { label: "Medium", url: "https://0xdavinchee.medium.com/" },
  { label: "Paragraph", url: "https://paragraph.xyz/@0x688390820b57cd65c1f76b5509ba28f79a343343" },
];

/** "2021-08" → "Aug 2021" */
export const formatYm = (ym: YearMonth | null): string => {
  if (ym === null) return "Now";
  const [y, m] = ym.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1)).toLocaleString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
};

/** Duration between two YearMonths, inclusive, e.g. "2y 10m". */
export const duration = (start: YearMonth, end: YearMonth | null, today = new Date()): string => {
  const [sy, sm] = start.split("-").map(Number);
  const [ey, em] = end ? end.split("-").map(Number) : [today.getUTCFullYear(), today.getUTCMonth() + 1];
  const months = (ey - sy) * 12 + (em - sm) + 1;
  const y = Math.floor(months / 12);
  const m = months % 12;
  return [y && `${y}y`, m && `${m}m`].filter(Boolean).join(" ");
};
