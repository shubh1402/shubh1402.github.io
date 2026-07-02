export const profile = {
  name: "Shubham Gupta",
  roles: [
    "AI Automation Engineer",
    "Machine Learning Engineer",
    "Systems Builder",
    "Future Robotics Founder",
  ],
  location: "Nashik, India",
  email: "shubhamvmgupta@gmail.com",
  github: "https://github.com/shubh1402/",
  linkedin: "https://www.linkedin.com/in/shubhamvmgupta/",
  githubUsername: "shubh1402",
};

export const experience = [
  {
    role: "Junior Network & Automation Engineer",
    org: "SDC Tech Solutions",
    period: "Feb 2025 – Mar 2026",
    points: [
      "Built Python automation workflows for network utilization monitoring, Zabbix integration, and report generation.",
      "Automated operational reporting and reduced manual analysis effort using data pipelines.",
    ],
  },
  {
    role: "Full Stack Data Science with Machine Learning",
    org: "Scaler Academy",
    period: "Jul 2023 – Jul 2025",
    points: [
      "Built a 7-project AI/ML portfolio covering feature engineering, statistical analysis, regression, and classification.",
    ],
  },
];

export const featuredCaseStudy = {
  title: "Network Utilization Automation System",
  tag: "Featured · Production System",
  github: "https://github.com/shubh1402/Network-utilization-automation",
  description:
    "A daily bandwidth/utilization reporting pipeline for real multi-site network operations. Pulls live data from the Zabbix API (with a raw-log fallback), captures FortiGate dashboard evidence via Selenium, flags sites above a 70% utilization threshold, and generates the Excel report and summary message ops teams read each morning — plus a Streamlit console for browsing historical runs.",
  sites: [
    "Bangalore",
    "Chennai",
    "Brest",
    "Illkirch",
    "Colombes",
    "Shanghai",
    "Thousand Oaks",
  ],
  stack: ["Python", "Selenium 4.41", "Zabbix API", "openpyxl", "Streamlit", "python-dotenv"],
  flow: [
    { step: "Ingest", title: "Zabbix API + log fallback", desc: "Pulls per-site bandwidth stats from Zabbix; falls back to raw log parsing when offline." },
    { step: "Capture", title: "Selenium evidence capture", desc: "Automated FortiGate FortiView screenshots and Zabbix graph capture." },
    { step: "Validate", title: "Automated accuracy checks", desc: "A dedicated validation layer cross-checks data and report before delivery." },
    { step: "Report", title: "Excel + ops console", desc: "Templated Excel workbook and daily summary, browsable via Streamlit." },
  ],
};

export const aiWorkProjects = [
  {
    name: "Target Brazil SQL Analysis",
    domain: "SQL & Business Analytics",
    desc: "E-commerce operations analysis across customer, payment, freight, and delivery data.",
    url: "https://github.com/shubh1402/Ai-Work/tree/main/target-brazil-sql-analysis",
    status: "built",
  },
  {
    name: "Walmart Statistical Analysis",
    domain: "SQL & Business Analytics",
    desc: "Statistical inference and exploratory analysis over Walmart sales data.",
    url: "https://github.com/shubh1402/Ai-Work/tree/main/Walmart-Statistical-Analysis",
    status: "built",
  },
  {
    name: "Yulu Hypothesis Testing",
    domain: "SQL & Business Analytics",
    desc: "Hypothesis testing on shared-mobility demand drivers and usage patterns.",
    url: "https://github.com/shubh1402/Ai-Work/tree/main/Yulu-Hypothesis-Testing",
    status: "built",
  },
  {
    name: "LoanTap Credit Risk Analysis",
    domain: "ML & Predictive Analytics",
    desc: "Classification models for credit risk assessment and loan default prediction.",
    url: "https://github.com/shubh1402/Ai-Work/tree/main/LoanTap-Credit-Risk-Analysis",
    status: "built",
  },
  {
    name: "Jamboree Admission Prediction",
    domain: "ML & Predictive Analytics",
    desc: "Regression modeling to predict graduate admission likelihood.",
    url: "https://github.com/shubh1402/Ai-Work/tree/main/Jamboree-Admission-Prediction",
    status: "built",
  },
  {
    name: "OLA Driver Attrition Prediction",
    domain: "ML & Predictive Analytics",
    desc: "Ensemble learning to predict driver churn and retention signals.",
    url: "https://github.com/shubh1402/Ai-Work/tree/main/OLA-Driver-Attrition-Prediction",
    status: "built",
  },
  {
    name: "Delhivery Feature Engineering",
    domain: "Data & Feature Engineering",
    desc: "Preprocessing and KPI engineering pipelines over logistics operations data.",
    url: "https://github.com/shubh1402/Ai-Work/tree/main/Delhivery-Feature-Engineering",
    status: "built",
  },
] as const;

export const roadmapProjects = [
  "Netflix Data Exploration",
  "Aerofit Customer Analysis",
  "AdEase Time Series Forecasting",
  "Twitter NER Pipeline",
  "FlipitNews NLP Analysis",
  "Porter Neural Network Regression",
  "Ninjacart Image Classification",
  "Zee Recommendation System",
];

export const techStack = [
  { group: "Languages", items: ["Python", "SQL"] },
  { group: "ML", items: ["Scikit-Learn", "XGBoost", "Statistics"] },
  { group: "Data", items: ["Pandas"] },
  { group: "Automation", items: ["FastAPI", "Streamlit", "Docker", "GitHub Actions"] },
  { group: "Cloud", items: ["AWS SageMaker"] },
];
