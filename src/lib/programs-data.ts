export interface Program {
  slug: string;
  title: string;
  shortDesc: string;
  icon: string;
  color: string;
  featured?: boolean;
  details: {
    description: string;
    highlights: string[];
    eligibility: string;
    timeline?: string;
  };
}

export const programs: Program[] = [
  {
    slug: "cansat-india",
    title: "CanSat India 2026",
    shortDesc:
      "India's premier student satellite competition. Design, build, and launch miniature satellites with real telemetry systems.",
    icon: "Rocket",
    color: "golden",
    featured: true,
    details: {
      description:
        "CanSat India is a national-level student satellite competition organized by SSDF in collaboration with IN-SPACe. Teams design and build a miniature satellite (CanSat) that is launched to an altitude of several hundred meters and must perform scientific missions during descent. The 2026 edition features 150+ teams competing from across India.",
      highlights: [
        "Design and build a functional CanSat payload",
        "Real rocket launch from SSDF Launch Pad on Gandak River banks",
        "Telemetry data collection and analysis",
        "Judging by ISRO and IN-SPACe scientists",
        "Cash prizes and internship opportunities",
        "National-level certificate for all participants",
      ],
      eligibility: "Open to school students (Class 9-12) and college students (UG/PG) across India",
      timeline: "Registration: Jan-Mar 2026 | Design Review: Apr 2026 | Launch: Jun 2026",
    },
  },
  {
    slug: "model-rocketry",
    title: "Model Rocketry Workshop",
    shortDesc:
      "Hands-on workshops on rocket design, propulsion, and aerodynamics. Learn to build and launch your own model rockets.",
    icon: "Flame",
    color: "river",
    details: {
      description:
        "Our Model Rocketry Workshops provide hands-on experience in rocket science fundamentals. Participants learn about propulsion, aerodynamics, stability, and recovery systems while building and launching their own model rockets at our dedicated launch facility.",
      highlights: [
        "Build and launch your own model rocket",
        "Learn rocket propulsion and aerodynamics",
        "Safety protocols and launch procedures",
        "Certified instructors with real launch experience",
        "Access to SSDF Launch Pad facility",
      ],
      eligibility: "Students Class 6 and above, teachers, and science enthusiasts",
    },
  },
  {
    slug: "science-fairs",
    title: "Science Fairs & Exhibitions",
    shortDesc:
      "Regional and district-level science fairs showcasing student innovation in physics, chemistry, biology, and technology.",
    icon: "FlaskConical",
    color: "forest",
    details: {
      description:
        "SSDF organizes science fairs and exhibitions at district and regional levels to encourage scientific thinking and innovation among students. These events provide a platform for students to showcase their projects and interact with scientists and educators.",
      highlights: [
        "District and regional level competitions",
        "Project exhibition and demonstration",
        "Expert judging panels",
        "Prizes and certificates for winners",
        "Exposure to real-world scientific research",
      ],
      eligibility: "Students from Class 5 to post-graduate level",
    },
  },
  {
    slug: "olympiads",
    title: "Science Olympiads",
    shortDesc:
      "Competitive examinations in science, mathematics, and astronomy to identify and nurture young scientific talent.",
    icon: "Trophy",
    color: "golden",
    details: {
      description:
        "SSDF conducts Science Olympiads to identify and nurture exceptional scientific talent among students. Our olympiads cover science, mathematics, astronomy, and space science, with multiple rounds from school to national level.",
      highlights: [
        "Multi-level examinations (School, District, State, National)",
        "Subjects: Science, Mathematics, Astronomy, Space Science",
        "Scholarships for top performers",
        "Study materials and preparation resources",
        "Recognition at state and national level",
      ],
      eligibility: "Students from Class 5 to Class 12",
    },
  },
  {
    slug: "scholarships",
    title: "Scholarships & Awards",
    shortDesc:
      "Financial support and recognition for talented students from rural and underserved communities pursuing science education.",
    icon: "GraduationCap",
    color: "river",
    details: {
      description:
        "SSDF provides scholarships, fellowships, and awards to talented students, especially from rural and underprivileged backgrounds. Our scholarship programs aim to ensure that financial constraints do not prevent bright minds from pursuing science education.",
      highlights: [
        "Merit-based scholarships for science students",
        "Special support for rural and underprivileged students",
        "Awards for excellence in scientific research",
        "Fellowship programs for advanced studies",
        "Mentorship from established scientists",
      ],
      eligibility: "Meritorious students from economically weaker sections, with priority for rural candidates",
    },
  },
  {
    slug: "computer-education",
    title: "Computer Education",
    shortDesc:
      "Digital literacy and computer science training for rural youth, including programming, web development, and competitive exam prep.",
    icon: "Monitor",
    color: "forest",
    details: {
      description:
        "Our Computer Education program bridges the digital divide for rural youth. We provide training in computer fundamentals, programming, web development, and digital tools, alongside personality development and competitive exam preparation.",
      highlights: [
        "Basic to advanced computer skills training",
        "Programming fundamentals (Python, Web Development)",
        "Digital literacy for rural communities",
        "Personality development workshops",
        "Competitive exam preparation guidance",
        "Online and offline learning modes",
      ],
      eligibility: "Open to all students and youth in the Deoria Lok Sabha region",
    },
  },
];

export function getProgramBySlug(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}
