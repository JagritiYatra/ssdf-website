import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shrinarayani Science Development Foundation",
    short_name: "SSDF",
    description: "Promoting science education, space science, and model rocketry for rural youth in Deoria, Uttar Pradesh.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1B2D4F",
    icons: [
      {
        src: "/icon.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
