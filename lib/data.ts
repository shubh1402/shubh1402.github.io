export const profile = {
  name: "Shubham Gupta",
  role: "AI / ML Engineer",
  location: "Pune, India",
  availability: "Available to start immediately",
  email: "shubhamvmgupta@gmail.com",
  github: "https://github.com/shubh1402",
  linkedin: "https://www.linkedin.com/in/shubhamvmgupta",
  githubUsername: "shubh1402",
  resume: "/Shubham_Gupta_Resume.pdf",
  intro:
    "For a year I ran the morning reporting for seven enterprise sites: check every link, screenshot the graphs, fill the spreadsheet, write the update. I replaced it with a Python pipeline, then rebuilt that in the open with an API, a dashboard and a test suite. I work the same way on machine learning: build it, measure it honestly, ship it where people can use it.",
};

export const featured = {
  name: "Network Utilization Automation",
  summary:
    "The system I built at work, rebuilt in the open. It collects per-minute data for every site's primary and secondary link, counts how long each one ran above 70, 80 and 90 percent, checks its own numbers, and delivers an Excel report and a short team update.",
  demo: "https://network-utilization-automation.onrender.com/",
  code: "https://github.com/shubh1402/Network-utilization-automation",
  stack: ["Python", "FastAPI", "Zabbix API", "Selenium", "OpenPyXL", "Docker", "GitHub Actions", "pytest"],
  facts: [
    {
      value: "80%",
      label: "less manual reporting effort",
      detail: "Across seven sites the morning routine went from an hour of clicking to one scheduled job.",
    },
    {
      value: "5",
      label: "accuracy checks per run",
      detail:
        "A silent site, a collection gap or an inconsistent count stops the report before anyone reads it. Silence is itself an incident.",
    },
    {
      value: "21",
      label: "tests on every push",
      detail: "Counting rules, parsers, the monitoring client and the API, all run by GitHub Actions.",
    },
  ],
};

export const projects = [
  {
    name: "Driver Attrition Prediction",
    blurb:
      "Which ride-hailing drivers are about to leave, and what the leading signals are. Random Forest and XGBoost over 2,381 drivers, with monthly records aggregated per driver and missing income and rating filled by KNN imputation.",
    metric: "0.84",
    metricLabel: "ROC-AUC, catching 92% of the drivers who left",
    stack: ["Scikit-learn", "XGBoost", "Pandas"],
    plot: "roc",
    code: "https://github.com/shubh1402/Ai-Work/tree/main/OLA-Driver-Attrition-Prediction",
  },
  {
    name: "Graduate Admission Prediction",
    blurb:
      "How much each part of an application actually moves the outcome. Linear regression over GRE, TOEFL, CGPA, essays and research experience, checked for multicollinearity and residual behaviour.",
    metric: "0.82",
    metricLabel: "R-squared, RMSE 0.061",
    stack: ["Scikit-learn", "Statsmodels"],
    plot: "scatter",
    code: "https://github.com/shubh1402/Ai-Work/tree/main/Jamboree-Admission-Prediction",
  },
  {
    name: "Logistics Delivery-Time Features",
    blurb:
      "Turning raw delivery trip logs into model-ready features, comparing what actually happened against the route engine's estimate to expose where and when deliveries slip.",
    metric: "144,867",
    metricLabel: "trip segments cleaned and engineered",
    stack: ["Pandas", "NumPy"],
    code: "https://github.com/shubh1402/Ai-Work/tree/main/Delhivery-Feature-Engineering",
  },
  {
    name: "Statistical Analysis and SQL",
    blurb:
      "Three studies: what really drives shared e-bike demand, tested with t-tests, ANOVA and chi-square over 10,886 rides; how customer spending differs across segments, with confidence intervals over 550,068 purchases; and an e-commerce order analysis in SQL.",
    metric: "550k",
    metricLabel: "purchases analysed",
    stack: ["SciPy", "Statsmodels", "SQL"],
    code: "https://github.com/shubh1402/Ai-Work/tree/main/Yulu-Hypothesis-Testing",
  },
];

export const building = {
  name: "DocuMind",
  blurb:
    "An AI copilot for IT operations, in progress. Ask why a site was slow yesterday and it pulls the numbers from the monitoring API, retrieves the matching runbook and past incident write-ups, and answers with citations you can check.",
  stack: ["Retrieval-augmented generation", "LangChain", "Vector search", "FastAPI"],
};

/**
 * Every skill points at work that demonstrates it. If there is nothing to link,
 * the skill does not belong on this page.
 */
export const skills = [
  {
    group: "Languages and data",
    items: [
      { name: "Python", href: "https://github.com/shubh1402/Network-utilization-automation/tree/main/src" },
      { name: "SQL", href: "https://github.com/shubh1402/Ai-Work/tree/main/target-brazil-sql-analysis" },
      { name: "Pandas", href: "https://github.com/shubh1402/Ai-Work/tree/main/Delhivery-Feature-Engineering" },
      { name: "NumPy", href: "https://github.com/shubh1402/Ai-Work/tree/main/Delhivery-Feature-Engineering" },
      {
        name: "Matplotlib",
        href: "https://github.com/shubh1402/Network-utilization-automation/blob/main/src/capture/graph_renderer.py",
      },
    ],
  },
  {
    group: "Machine learning",
    items: [
      { name: "Scikit-learn", href: "https://github.com/shubh1402/Ai-Work/tree/main/OLA-Driver-Attrition-Prediction" },
      { name: "XGBoost", href: "https://github.com/shubh1402/Ai-Work/tree/main/OLA-Driver-Attrition-Prediction" },
      { name: "Classification", href: "https://github.com/shubh1402/Ai-Work/tree/main/OLA-Driver-Attrition-Prediction" },
      { name: "Regression", href: "https://github.com/shubh1402/Ai-Work/tree/main/Jamboree-Admission-Prediction" },
      { name: "Feature engineering", href: "https://github.com/shubh1402/Ai-Work/tree/main/Delhivery-Feature-Engineering" },
      { name: "Model evaluation", href: "https://github.com/shubh1402/Ai-Work/tree/main/OLA-Driver-Attrition-Prediction" },
    ],
  },
  {
    group: "Statistics",
    items: [
      { name: "Hypothesis testing", href: "https://github.com/shubh1402/Ai-Work/tree/main/Yulu-Hypothesis-Testing" },
      { name: "ANOVA and chi-square", href: "https://github.com/shubh1402/Ai-Work/tree/main/Yulu-Hypothesis-Testing" },
      { name: "Confidence intervals", href: "https://github.com/shubh1402/Ai-Work/tree/main/Walmart-Statistical-Analysis" },
    ],
  },
  {
    group: "Backend and delivery",
    items: [
      {
        name: "FastAPI",
        href: "https://github.com/shubh1402/Network-utilization-automation/blob/main/src/api/app.py",
      },
      { name: "REST APIs", href: "https://github.com/shubh1402/Network-utilization-automation#api" },
      { name: "pytest", href: "https://github.com/shubh1402/Network-utilization-automation/tree/main/tests" },
      {
        name: "GitHub Actions",
        href: "https://github.com/shubh1402/Network-utilization-automation/blob/main/.github/workflows/ci.yml",
      },
      { name: "Docker", href: "https://github.com/shubh1402/Network-utilization-automation/blob/main/Dockerfile" },
    ],
  },
  {
    group: "Automation and monitoring",
    items: [
      {
        name: "Zabbix API",
        href: "https://github.com/shubh1402/Network-utilization-automation/blob/main/src/clients/zabbix_client.py",
      },
      { name: "Selenium", href: "https://github.com/shubh1402/Network-utilization-automation/tree/main/src/capture" },
      {
        name: "Excel reporting",
        href: "https://github.com/shubh1402/Network-utilization-automation/blob/main/src/excel/report_generator.py",
      },
      {
        name: "Threshold alerting",
        href: "https://github.com/shubh1402/Network-utilization-automation/blob/main/src/services/utilization_service.py",
      },
    ],
  },
];

export const experience = {
  role: "Junior Network & Automation Engineer",
  focus: "Python automation",
  org: "SDC Tech Solutions",
  period: "February 2025 — March 2026",
  points: [
    "Built a Python pipeline that pulls bandwidth-utilization data through the Zabbix API and Selenium and produces the daily Excel report, cutting manual reporting effort by 80% across seven enterprise sites.",
    "Automated threshold monitoring for primary and secondary links, counting minutes above 70, 80 and 90 percent and capturing the top talkers on congested sites, so the cause was in the report and not just the symptom.",
    "Added checks that reconcile raw monitoring exports against the API, so the operations team could trust the numbers without re-checking them.",
  ],
};

export const education = [
  {
    title: "B.Tech, Computer Science Engineering (AI & ML)",
    org: "Sandip University",
    detail: "CGPA 8.4 / 10",
    period: "2023",
  },
  {
    title: "Full Stack Data Science & AI Engineering",
    org: "Scaler Academy",
    detail:
      "Module certifications earned by skill test and interview: Computer Vision, NLP, Advanced ML, Time Series and Recommender Systems, Maths for ML, Data Analytics.",
    period: "2023 — 2025",
  },
];
