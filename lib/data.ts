export const profile = {
  name: "Shubham Gupta",
  roles: [
    "AI / ML Engineer",
    "AI Automation Engineer",
    "Python Automation Engineer",
    "Systems Builder",
  ],
  location: "Pune, India (open to relocation)",
  email: "shubhamvmgupta@gmail.com",
  github: "https://github.com/shubh1402/",
  linkedin: "https://www.linkedin.com/in/shubhamvmgupta/",
  githubUsername: "shubh1402",
  resume: "/Shubham_Gupta_Resume.pdf",
};

export const experience = [
  {
    role: "Junior Network & Automation Engineer (Python Automation)",
    org: "SDC Tech Solutions",
    period: "Feb 2025 – Mar 2026",
    points: [
      "Built a Python pipeline that pulls bandwidth-utilization data via the Zabbix API and Selenium and generates daily Excel reports, reducing manual reporting effort by 80% across 7 enterprise sites.",
      "Automated threshold monitoring of primary and secondary WAN links, counting minutes above 70/80/90% and triggering FortiGate top-talker captures for congested sites.",
      "Added accuracy checks that reconcile raw Zabbix exports against API data, making daily reports consistent and auditable.",
    ],
  },
  {
    role: "Full Stack Data Science & AI Engineering",
    org: "Scaler Academy",
    period: "Jul 2023 – Jul 2025",
    points: [
      "Module certifications (skill test + interview): Computer Vision, NLP, Advanced ML, Time Series & Recommender Systems, Maths for ML, Data Analytics.",
    ],
  },
];

export const featuredCaseStudy = {
  title: "Network Utilization Automation",
  tag: "Featured · Open source · Live demo",
  github: "https://github.com/shubh1402/Network-utilization-automation",
  demo: "https://shubh1402.github.io/Network-utilization-automation/",
  description:
    "My production reporting pipeline, rebuilt as an open-source tool. It pulls per-minute WAN link data from the Zabbix API, counts how long each site's links ran above 70/80/90%, validates the numbers, and delivers an Excel report and a ready-to-send team message. A FastAPI backend and web dashboard show the whole run, and a built-in traffic simulator lets anyone try it without network access.",
  outputs: [
    "Excel report",
    "Team message",
    "Web dashboard",
    "REST API",
    "21 automated tests",
    "Docker image",
  ],
  stack: ["Python", "Zabbix API", "FastAPI", "Selenium", "OpenPyXL", "Docker", "GitHub Actions", "pytest"],
  flow: [
    { step: "Collect", title: "Zabbix API, exports or simulator", desc: "Per-minute inbound and outbound samples for every site's primary and secondary link." },
    { step: "Analyze", title: "Threshold minutes and breach periods", desc: "Merges in/out traffic and counts minutes above 70/80/90%, grouping them into breach periods." },
    { step: "Validate", title: "5 automated accuracy checks", desc: "Catches silent sites, collection gaps and inconsistent counts before anything is sent." },
    { step: "Deliver", title: "Excel, message and dashboard", desc: "Workbook with graphs and heatmap, a short team update, and a live web dashboard." },
  ],
};

export const aiWorkProjects = [
  {
    name: "Driver Attrition Prediction",
    domain: "Machine Learning",
    desc: "Random Forest and XGBoost on 2,381 ride-hailing drivers: ROC-AUC 0.84, catching 92% of drivers who left.",
    url: "https://github.com/shubh1402/Ai-Work/tree/main/OLA-Driver-Attrition-Prediction",
    status: "built",
  },
  {
    name: "Graduate Admission Prediction",
    domain: "Machine Learning",
    desc: "Linear regression predicting admission chances from GRE, TOEFL, CGPA and research experience: R² 0.82.",
    url: "https://github.com/shubh1402/Ai-Work/tree/main/Jamboree-Admission-Prediction",
    status: "built",
  },
  {
    name: "Logistics Delivery-Time Features",
    domain: "Machine Learning",
    desc: "Delivery-time and efficiency features from raw trip data, comparing actual time and distance with route-engine estimates.",
    url: "https://github.com/shubh1402/Ai-Work/tree/main/Delhivery-Feature-Engineering",
    status: "built",
  },
  {
    name: "E-bike Demand Drivers",
    domain: "Statistics & SQL",
    desc: "t-tests, ANOVA and chi-square on 10,886 rides to find what really moves shared e-bike demand.",
    url: "https://github.com/shubh1402/Ai-Work/tree/main/Yulu-Hypothesis-Testing",
    status: "built",
  },
  {
    name: "Customer Spending Gaps",
    domain: "Statistics & SQL",
    desc: "Central limit theorem and 95% confidence intervals on 550,068 purchases, compared across customer segments.",
    url: "https://github.com/shubh1402/Ai-Work/tree/main/Walmart-Statistical-Analysis",
    status: "built",
  },
  {
    name: "E-commerce SQL Analysis",
    domain: "Statistics & SQL",
    desc: "Orders, payments, freight and delivery performance analysed with SQL joins, aggregations and date functions.",
    url: "https://github.com/shubh1402/Ai-Work/tree/main/target-brazil-sql-analysis",
    status: "built",
  },
] as const;

export const roadmapProjects = [
  "DocuMind: AI copilot for IT operations (RAG)",
  "Link capacity forecasting",
  "LogSense: log anomaly detection",
];

export const techStack = [
  { group: "Languages", items: ["Python", "SQL"] },
  { group: "Machine learning", items: ["Scikit-learn", "XGBoost", "Feature engineering", "Model evaluation"] },
  { group: "Statistics", items: ["Hypothesis testing", "Confidence intervals"] },
  { group: "Data", items: ["Pandas", "NumPy", "Matplotlib", "Seaborn"] },
  { group: "Backend & DevOps", items: ["FastAPI", "REST APIs", "Docker", "GitHub Actions", "pytest"] },
  { group: "Automation & monitoring", items: ["Zabbix API", "Selenium", "OpenPyXL", "FortiGate"] },
];
