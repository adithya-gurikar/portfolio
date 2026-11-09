// ─────────────────────────────────────────────────────────────
// All content for Skills / Education / Experience / Publications
// lives here (from the resume and the IEEE paper page).
// ─────────────────────────────────────────────────────────────

export const skills = [
  { group: "Languages", items: ["Python", "C", "C++", "Java", "JavaScript", "SQL (MySQL)", "HTML/CSS"] },
  { group: "Backend & APIs", items: ["FastAPI", "MongoDB", "Redis", "Git"] },
  { group: "Cloud & DevOps", items: ["AWS", "Docker", "Kubernetes"] },
  {
    group: "AI & ML",
    items: ["LLMs", "OpenAI API", "Gemini API", "Prompt Engineering", "Multi-Agent Systems", "SpaCy", "PyTorch", "TensorFlow", "Scikit-learn", "Pandas", "ai4bharat-transliteration"],
  },
  { group: "Data", items: ["ETL/ELT Pipelines", "Selenium", "Beautiful Soup", "Metabase", "Tableau"] },
];

export const ticker = ["Python", "FastAPI", "AWS", "Docker", "Kubernetes", "MongoDB", "LLMs", "PyTorch", "ETL"];

export const education = [
  {
    school: "University of Illinois Urbana-Champaign",
    degree: "Master of Computer Science",
    years: "Expected May 2028",
    detail: "Relevant coursework: Database Systems, Advanced Data Management, Applied Machine Learning.",
  },
  {
    school: "PES University",
    degree: "B.Tech in Computer Science and Engineering",
    years: "2021 — 2025",
    detail: "Bengaluru, India.",
  },
];

export const experience = [
  {
    role: "Trainee Data Engineer",
    company: "Eligarf Technologies Private Limited",
    location: "Pune, India",
    years: "Sep 2025 — Aug 2026",
    points: [
      "Designed and shipped an LLM-powered astrology chatbot as a FastAPI service for iMeUsWe, a family heritage and astrology platform, delivering real-time personalized responses to thousands of users.",
      "Built GenAI-based sentiment analysis and prompt optimization modules to improve astrologer-client interactions, increasing user engagement by 30%.",
      "Designed and maintained ETL/ELT pipelines across MongoDB, Redis, and AWS for real-time ingestion, validation, and analytics, processing around 20,000 records per day.",
      "Partnered with product and testing teams to improve reliability, accuracy, and scalability.",
    ],
  },
  {
    role: "Professional Services Consultant Intern",
    company: "Aptos India Private Limited",
    location: "Bengaluru, India",
    years: "Jul 2025 — Sep 2025",
    points: [
      "Configured, tested, and integrated data for CRM and Sales Audit systems for 5 major retail clients, executing test cases and documenting results in detailed reports.",
      "Resolved integration and usability issues during post-implementation support, ensuring stable client transitions.",
    ],
  },
  {
    role: "Trainee Engineer",
    company: "Eligarf Technologies Private Limited",
    location: "Pune, India",
    years: "Jan 2025 — Jul 2025",
    points: [
      "Contributed to a multi-agent GenAI content-generation system using OpenAI and Gemini APIs to synthesize trend-based posts from Google Trends and iMeUsWe communities, generating over 250 posts per week.",
      "Applied SpaCy NER models (sm, lg, trf) to extract names and key entities from printed and handwritten PDFs and load curated data into MongoDB, processing 100 documents a day.",
      "Built web scrapers with Selenium and Beautiful Soup to automate dynamic data extraction, processing 10,000+ records per day.",
    ],
  },
];

export const links = {
  github: "https://github.com/adithya-gurikar",
  linkedin: "https://www.linkedin.com/in/adithya-shashikumaar-gurikar",
  email: "adithyagurikar10@gmail.com",
};

export const publications = [
  {
    year: "2024",
    title: "An xG Based Football Scouting System Using Machine Learning Techniques",
    authors: ["Abhinav BV", "Adhi Nandan J", "Adithya S Gurikar", "Aditya Joshi", "Akshit Pandharkar", "Prajwala T R"],
    venue: "2024 IEEE 9th International Conference for Convergence in Technology (I2CT) · Pune, India · Apr 5–7, 2024",
    type: "Conference Paper",
    link: "https://ieeexplore.ieee.org/document/10544261",
    pdf: "https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=10544261",
  },
];
