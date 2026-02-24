export interface NewsClipping {
  id: number;
  src: string;
  alt: string;
  headline: string;
  source: string;
}

export const newsClippings: NewsClipping[] = [
  { id: 1, src: "/news/clipping-001.jpg", alt: "Space Scientist Shubhanshu Shukla to join Rocket Launching", headline: "Astronaut Shubhanshu Shukla to participate in CanSat Rocket Launching event", source: "Regional Daily" },
  { id: 2, src: "/news/clipping-002.jpg", alt: "70 CanSat Model Rockets launched from Kushinagar", headline: "70 CanSat model rockets launched with 700 participants in national competition", source: "Hindustan" },
  { id: 3, src: "/news/clipping-003.jpg", alt: "MP and officials inspect the launching pad", headline: "MP and ISRO team inspect launch pad — 500 students from 200 institutions to compete", source: "Amar Ujala" },
  { id: 4, src: "/news/clipping-004.jpg", alt: "Sewarhi to witness gathering of young scientists", headline: "Space technology should benefit health, education & agriculture: MP Shashank Mani", source: "Ek Sandesh" },
  { id: 5, src: "/news/clipping-005.jpg", alt: "Launching will inspire science-minded youth: DM", headline: "First rocket launching competition in North India held in UP's Kushinagar", source: "United Bharat" },
  { id: 6, src: "/news/clipping-006.jpg", alt: "Rocket Launching Competition from 27 October", headline: "National rocket launching competition on banks of Narayani River — 700 participants expected", source: "Khwaja Express" },
  { id: 7, src: "/news/clipping-007.jpg", alt: "Site inspection for Rocket Launching competition", headline: "ISRO, IN-SPACe & ASI joint inspection — 100+ model rockets and payloads to be launched", source: "Purvanchal Bureau" },
  { id: 8, src: "/news/clipping-008.jpg", alt: "Preparations for Rocket Launching competition", headline: "Historic moment for India's space mission — first high-tech competition in Kushinagar", source: "Swatantra Bharat" },
  { id: 9, src: "/news/clipping-009.jpg", alt: "Kushinagar becomes North India's first Launch Pad", headline: "Kushinagar becomes the country's first North Indian launch pad for student rocketry", source: "State Daily" },
  { id: 10, src: "/news/clipping-010.jpg", alt: "Fair of young scientists at Sewarhi", headline: "Young scientists from 6 states gather in Sewarhi for national rocketry competition", source: "Lok Bharti" },
  { id: 11, src: "/news/clipping-011.jpg", alt: "SSDF News Coverage 11", headline: "CanSat India competition draws nationwide attention to Deoria's science movement", source: "Local Media" },
  { id: 12, src: "/news/clipping-012.jpg", alt: "SSDF News Coverage 12", headline: "Rural students get hands-on experience with satellite technology and model rocketry", source: "Local Media" },
  { id: 13, src: "/news/clipping-013.jpg", alt: "SSDF News Coverage 13", headline: "SSDF's mission to bridge science education gap in eastern Uttar Pradesh", source: "Local Media" },
  { id: 14, src: "/news/clipping-014.jpg", alt: "SSDF News Coverage 14", headline: "District administration extends full support to national-level science competition", source: "Local Media" },
  { id: 15, src: "/news/clipping-015.jpg", alt: "SSDF News Coverage 15", headline: "Model rocketry workshops inspire next generation of space scientists in rural India", source: "Local Media" },
  ...Array.from({ length: 74 }, (_, i) => ({
    id: i + 16,
    src: `/news/clipping-${String(i + 16).padStart(3, "0")}.jpg`,
    alt: `SSDF Media Coverage ${i + 16}`,
    headline: "",
    source: "Media Coverage",
  })),
];

export const featuredNews = newsClippings.slice(0, 10);
