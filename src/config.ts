import icon from "../src/assets/icon.png";

interface IConfig {
  me: {
    name: string;
    projectLink: string;
  };
  socials: {
    [name: string]: string;
  };
  projects: {
    [name: string]: {
      url: string;
      tags: string[];
    };
  };
  og: {
    image: string;
  };
}

export const Config: IConfig = {
  me: {
    name: "Vincent Chee | 徐冠雄",
    projectLink: "https://github.com/0xdavinchee?tab=repositories",
  },
  socials: {
    warpcast: "https://warpcast.com/0xdavinchee",
    twitter: "https://twitter.com/0xdavinchee",
    gitHub: "https://github.com/0xdavinchee",
    paragraph:
      "https://paragraph.xyz/@0x688390820b57cd65c1f76b5509ba28f79a343343",
    medium: "https://0xdavinchee.medium.com/",
    substack: "https://0xdavinchee.substack.com/",
  },
  projects: {},
  og: {
    image: icon.src,
  },
};
