export interface Episode {
    id: number;
    title: string;
    description: string;
    charities: string;
    image: string;
  }
  
  export const episodes: Episode[] = [
    {
        id:1,
        title: "Episode 1", 
        description: "On what seems like just another birthday, Dawn—an unassuming woman with a spark for sarcasm and a love for her cat—is unexpectedly thrust into a mysterious, cosmic adventure. Guided by an eccentric team of higher beings and AI, she’s asked to help shape the future of a struggling Earth. Blending humor, heart, and sci-fi charm, the episode explores what happens when an ordinary person is given an extraordinary role in reimagining humanity’s next chapter—whether she wants to or not.", 
        charities:  "https://www.catf.us /https://gfi.org/", 
        image: "/Episode1.png"
    },
    {
        id:2,
        title: "Episode 2", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        charities:  "Charaties", 
        image: "/Episode2.png"
    },
    {
        id: 3, 
        title: "Episode 3", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        charities: "Charity 3", 
        image: "/Episode3.png"
    }
  ];