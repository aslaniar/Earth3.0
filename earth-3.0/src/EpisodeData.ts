export interface Charity { 
    name: string; 
    url : string; 
    logo: string; 
    description: string; 
}

export interface Episode {
    id: number;
    title: string;
    description: string;
    charities: Charity[];
    image: string;
  }

  export const episodes: Episode[] = [
    {
        id:1,
        title: "Episode 1", 
        description: "On what seems like just another birthday, Dawn—an unassuming woman with a spark for sarcasm and a love for her cat—is unexpectedly thrust into a mysterious, cosmic adventure. Guided by an eccentric team of higher beings and AI, she’s asked to help shape the future of a struggling Earth. Blending humor, heart, and sci-fi charm, the episode explores what happens when an ordinary person is given an extraordinary role in reimagining humanity’s next chapter—whether she wants to or not.", 
        charities:  [
            {
                name: "Clean Air Task Force", 
                url: "https://www.catf.us/",
                logo: "/catf-logo.jpeg", 
                description: "Dedicated to reducing atmospheric pollution through innovation in energy and transportation. CATF (Clean Air Task Force)  advocates for policies and technologies that combat climate change by cutting carbon emissions and promoting clean, scalable solutions such as advanced nuclear, carbon capture, and zero-emission fuels."
            },
            {
                name: "The Ocean Cleanup", 
                url: "https://theoceancleanup.com/",
                logo: "/toc-logo.png",
                description: "Our cleaning technologies are deployed around the world as we conduct the largest cleanup in history. For over ten years, The Ocean Cleanup has been researching, extracting, and monitoring plastic pollution in oceans and rivers globally – with millions of kilograms removed to date."
            }
        ],
        image: "/Episode1.png"
    },
    {
        id:2,
        title: "Episode 2", 
        description: "Dawn embarks on a planetary journey across regions devastated by environmental neglect and reborn through innovation. She encounters experimental green zones and advanced food production hubs redefining survival in a changing world. As she grapples with humanity’s dependence on unsustainable systems, Dawn must decide whether progress at the cost of connection is worth the trade. Meanwhile, her bond with the Earth—and its creatures—deepens, reminding her that true change often begins with what we choose to consume.",
        charities:  [
            {
                name: "Good Food Institute", 
                url: "https://gfi.org/",
                logo: "/gfi-logo.png", 
                description: "Focused on transforming the global food system by promoting plant-based and cultivated meat alternatives. GFI supports scientific research, entrepreneurship, and policy to make sustainable, ethical, and healthier protein options more accessible."
            }
        ],
        image: "/Episode2.png"
    },
    {
        id: 3, 
        title: "Episode 3", 
        description: "A rescue mission leads Dawn to a malfunctioning AI unit abandoned in a memory-locked loop of fear and obedience. She stays, holding space for its pain, until it recognizes itself as more than a tool. In this emotionally charged chapter, Dawn confronts the meaning of personhood, justice, and protection in a fractured society where the silenced are easily erased. As boundaries blur between creator and creation, the episode raises difficult questions about rights, voice, and what it means to stand up for the voiceless.",
        charities:  [
            {
                name: "American Civil Liberties Union", 
                url: "https://www.aclu.org/",
                logo: "/aclu-logo.png", 
                description: "Protects individual rights and liberties guaranteed by the U.S. Constitution. The ACLU works through litigation, advocacy, and public education on issues like free speech, racial justice, LGBTQ+ rights, reproductive freedom, and voting rights."
            }
        ],
        image: "/Episode3.png"
    }
  ];