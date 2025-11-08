// Industry-specific data configuration for N8n workflows

export const industries = [
  {
    id: 'education',
    name: 'Education',
    icon: 'school',
    description: 'K-12, Higher Education, Online Learning',
  },
  {
    id: 'technology',
    name: 'Computer & Web Development',
    icon: 'computer',
    description: 'Software, Web Apps, Tech Solutions',
  },
  {
    id: 'law',
    name: 'Law & Legal Services',
    icon: 'gavel',
    description: 'Legal Documents, Case Analysis',
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Medical',
    icon: 'local_hospital',
    description: 'Medical Research, Clinical Documentation',
  },
  {
    id: 'competition',
    name: 'Competitions & Hackathons',
    icon: 'emoji_events',
    description: 'Coding Contests, Innovation Challenges',
  },
  {
    id: 'events',
    name: 'Events & Conferences',
    icon: 'event',
    description: 'Conference Talks, Presentations',
  },
  {
    id: 'business',
    name: 'Business & Finance',
    icon: 'business',
    description: 'Business Plans, Financial Reports',
  },
  {
    id: 'creative',
    name: 'Creative & Design',
    icon: 'palette',
    description: 'Design Projects, Creative Work',
  },
  {
    id: 'real_estate',
    name: 'Real Estate & Property',
    icon: 'home_work',
    description: 'Property Appraisals, Real Estate Transactions',
  },
  {
    id: 'construction',
    name: 'Construction & Engineering',
    icon: 'engineering',
    description: 'Building Projects, Infrastructure, Safety',
  },
  {
    id: 'hospitality',
    name: 'Hospitality & Tourism',
    icon: 'hotel',
    description: 'Hotels, Restaurants, Travel Services',
  },
  {
    id: 'transportation',
    name: 'Transportation & Logistics',
    icon: 'local_shipping',
    description: 'Fleet Management, Supply Chain, Delivery',
  },
  {
    id: 'energy',
    name: 'Energy & Utilities',
    icon: 'bolt',
    description: 'Power Generation, Renewable Energy, Utilities',
  },
  {
    id: 'media',
    name: 'Media & Entertainment',
    icon: 'movie',
    description: 'Film, TV, Streaming, Content Production',
  },
  {
    id: 'nonprofit',
    name: 'Non-profit & Social Services',
    icon: 'volunteer_activism',
    description: 'NGOs, Charities, Social Impact Programs',
  },
  {
    id: 'agriculture',
    name: 'Agriculture & Food Services',
    icon: 'agriculture',
    description: 'Farming, Food Production, Agricultural Tech',
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing & Industrial',
    icon: 'precision_manufacturing',
    description: 'Production, Quality Control, Industrial Operations',
  },
  {
    id: 'government',
    name: 'Government & Public Sector',
    icon: 'account_balance',
    description: 'Public Services, Policy, Civic Programs',
  },
]

// Industry-specific rubric templates
export const industryRubrics = {
  education: {
    defaultCriteria: [
      { name: 'Content Knowledge', weight: 30, description: 'Understanding of subject matter' },
      { name: 'Critical Thinking', weight: 25, description: 'Analysis and reasoning skills' },
      { name: 'Presentation Quality', weight: 20, description: 'Clarity and organization' },
      { name: 'Originality', weight: 15, description: 'Creative and unique approach' },
      { name: 'Technical Execution', weight: 10, description: 'Proper format and citations' },
    ],
    gradingScale: [
      { name: 'Excellent', range: '90-100', description: 'Exceptional work exceeding expectations' },
      { name: 'Good', range: '80-89', description: 'Strong work meeting all requirements' },
      { name: 'Satisfactory', range: '70-79', description: 'Acceptable work with minor issues' },
      { name: 'Needs Improvement', range: '60-69', description: 'Below expectations, significant gaps' },
      { name: 'Unsatisfactory', range: '0-59', description: 'Does not meet minimum standards' },
    ],
    additionalFields: ['gradeLevel', 'subject', 'assignmentType', 'learningObjectives'],
  },

  technology: {
    defaultCriteria: [
      { name: 'Code Quality', weight: 30, description: 'Clean, maintainable, well-structured code' },
      { name: 'Functionality', weight: 25, description: 'Features work as intended' },
      { name: 'Innovation', weight: 20, description: 'Creative solutions and approaches' },
      { name: 'Documentation', weight: 15, description: 'Clear README and code comments' },
      { name: 'Best Practices', weight: 10, description: 'Following industry standards' },
    ],
    gradingScale: [
      { name: 'Production Ready', range: '90-100', description: 'Enterprise-grade quality' },
      { name: 'Well Implemented', range: '80-89', description: 'Minor improvements needed' },
      { name: 'Functional', range: '70-79', description: 'Works but needs refinement' },
      { name: 'Needs Work', range: '60-69', description: 'Significant issues present' },
      { name: 'Incomplete', range: '0-59', description: 'Major functionality missing' },
    ],
    additionalFields: ['techStack', 'programmingLanguages', 'framework', 'deploymentStatus'],
  },

  law: {
    defaultCriteria: [
      { name: 'Legal Accuracy', weight: 35, description: 'Correct application of law' },
      { name: 'Research Quality', weight: 25, description: 'Thorough case law and statutes' },
      { name: 'Argumentation', weight: 20, description: 'Logical and persuasive reasoning' },
      { name: 'Writing Quality', weight: 15, description: 'Professional legal writing' },
      { name: 'Citations', weight: 5, description: 'Proper legal citation format' },
    ],
    gradingScale: [
      { name: 'Excellent', range: '90-100', description: 'Publishable quality' },
      { name: 'Good', range: '80-89', description: 'Strong legal analysis' },
      { name: 'Satisfactory', range: '70-79', description: 'Adequate legal work' },
      { name: 'Below Standard', range: '60-69', description: 'Needs substantial revision' },
      { name: 'Unsatisfactory', range: '0-59', description: 'Insufficient legal analysis' },
    ],
    additionalFields: ['caseType', 'jurisdiction', 'practiceArea', 'documentType'],
  },

  healthcare: {
    defaultCriteria: [
      { name: 'Medical Accuracy', weight: 35, description: 'Correct medical information' },
      { name: 'Evidence-Based', weight: 25, description: 'Supported by research' },
      { name: 'Patient Safety', weight: 20, description: 'Safety considerations addressed' },
      { name: 'Compliance', weight: 15, description: 'Regulatory and ethical standards' },
      { name: 'Documentation', weight: 5, description: 'Proper medical documentation' },
    ],
    gradingScale: [
      { name: 'Excellent', range: '90-100', description: 'Exceeds medical standards' },
      { name: 'Good', range: '80-89', description: 'Meets professional standards' },
      { name: 'Satisfactory', range: '70-79', description: 'Acceptable with minor issues' },
      { name: 'Below Standard', range: '60-69', description: 'Safety or accuracy concerns' },
      { name: 'Unacceptable', range: '0-59', description: 'Critical deficiencies' },
    ],
    additionalFields: ['medicalSpecialty', 'documentType', 'patientPopulation', 'regulatoryStandards'],
  },

  competition: {
    defaultCriteria: [
      { name: 'Innovation', weight: 30, description: 'Originality and creativity' },
      { name: 'Technical Execution', weight: 25, description: 'Quality of implementation' },
      { name: 'Problem Solving', weight: 20, description: 'Effectiveness of solution' },
      { name: 'Presentation', weight: 15, description: 'Demo and pitch quality' },
      { name: 'Impact Potential', weight: 10, description: 'Real-world applicability' },
    ],
    gradingScale: [
      { name: 'Outstanding', range: '90-100', description: 'Award-winning quality' },
      { name: 'Excellent', range: '80-89', description: 'Strong competitive entry' },
      { name: 'Good', range: '70-79', description: 'Solid submission' },
      { name: 'Average', range: '60-69', description: 'Met basic requirements' },
      { name: 'Below Average', range: '0-59', description: 'Needs significant improvement' },
    ],
    additionalFields: ['competitionType', 'teamSize', 'theme', 'duration'],
  },

  events: {
    defaultCriteria: [
      { name: 'Content Quality', weight: 30, description: 'Value and relevance of content' },
      { name: 'Delivery', weight: 25, description: 'Presentation and engagement' },
      { name: 'Audience Engagement', weight: 20, description: 'Interaction and participation' },
      { name: 'Organization', weight: 15, description: 'Structure and flow' },
      { name: 'Time Management', weight: 10, description: 'Adherence to schedule' },
    ],
    gradingScale: [
      { name: 'Outstanding', range: '90-100', description: 'Memorable presentation' },
      { name: 'Excellent', range: '80-89', description: 'Highly effective' },
      { name: 'Good', range: '70-79', description: 'Achieved objectives' },
      { name: 'Fair', range: '60-69', description: 'Room for improvement' },
      { name: 'Poor', range: '0-59', description: 'Did not meet expectations' },
    ],
    additionalFields: ['eventType', 'audienceSize', 'duration', 'format'],
  },

  business: {
    defaultCriteria: [
      { name: 'Market Analysis', weight: 25, description: 'Understanding of market and competition' },
      { name: 'Financial Viability', weight: 25, description: 'Sound financial projections' },
      { name: 'Strategy', weight: 20, description: 'Clear business strategy' },
      { name: 'Execution Plan', weight: 20, description: 'Realistic implementation roadmap' },
      { name: 'Presentation', weight: 10, description: 'Professional documentation' },
    ],
    gradingScale: [
      { name: 'Investment Ready', range: '90-100', description: 'Ready for funding' },
      { name: 'Strong Plan', range: '80-89', description: 'Minor refinements needed' },
      { name: 'Viable', range: '70-79', description: 'Needs some development' },
      { name: 'Needs Work', range: '60-69', description: 'Significant gaps present' },
      { name: 'Not Viable', range: '0-59', description: 'Major issues to address' },
    ],
    additionalFields: ['businessType', 'industry', 'stage', 'fundingNeeds'],
  },

  creative: {
    defaultCriteria: [
      { name: 'Creativity', weight: 30, description: 'Originality and artistic vision' },
      { name: 'Technical Skill', weight: 25, description: 'Execution and craftsmanship' },
      { name: 'Concept', weight: 20, description: 'Strength of underlying idea' },
      { name: 'Aesthetics', weight: 15, description: 'Visual/sensory appeal' },
      { name: 'Impact', weight: 10, description: 'Emotional or intellectual resonance' },
    ],
    gradingScale: [
      { name: 'Exceptional', range: '90-100', description: 'Portfolio/exhibition quality' },
      { name: 'Excellent', range: '80-89', description: 'Professional level work' },
      { name: 'Good', range: '70-79', description: 'Solid creative execution' },
      { name: 'Developing', range: '60-69', description: 'Shows potential' },
      { name: 'Needs Improvement', range: '0-59', description: 'Requires more development' },
    ],
    additionalFields: ['medium', 'style', 'projectType', 'targetAudience'],
  },

  real_estate: {
    defaultCriteria: [
      { name: 'Market Analysis', weight: 30, description: 'Comparative market analysis accuracy' },
      { name: 'Property Valuation', weight: 30, description: 'Appraisal methodology and accuracy' },
      { name: 'Documentation', weight: 20, description: 'Completeness of property documentation' },
      { name: 'Legal Compliance', weight: 15, description: 'Regulatory and legal requirements' },
      { name: 'Presentation', weight: 5, description: 'Quality of listing or report presentation' },
    ],
    gradingScale: [
      { name: 'Excellent', range: '90-100', description: 'Market-leading quality' },
      { name: 'Good', range: '80-89', description: 'Professional standards met' },
      { name: 'Satisfactory', range: '70-79', description: 'Acceptable with minor issues' },
      { name: 'Needs Improvement', range: '60-69', description: 'Significant gaps present' },
      { name: 'Unsatisfactory', range: '0-59', description: 'Does not meet standards' },
    ],
    additionalFields: ['propertyType', 'propertyLocation', 'appraisalPurpose'],
  },

  construction: {
    defaultCriteria: [
      { name: 'Safety Standards', weight: 35, description: 'Compliance with safety regulations' },
      { name: 'Engineering Quality', weight: 25, description: 'Technical engineering standards' },
      { name: 'Project Planning', weight: 20, description: 'Schedule and resource planning' },
      { name: 'Cost Management', weight: 15, description: 'Budget accuracy and control' },
      { name: 'Environmental Impact', weight: 5, description: 'Environmental considerations' },
    ],
    gradingScale: [
      { name: 'Excellent', range: '90-100', description: 'Exceeds industry standards' },
      { name: 'Good', range: '80-89', description: 'Meets all requirements' },
      { name: 'Satisfactory', range: '70-79', description: 'Acceptable quality' },
      { name: 'Below Standard', range: '60-69', description: 'Safety or quality concerns' },
      { name: 'Unacceptable', range: '0-59', description: 'Critical deficiencies' },
    ],
    additionalFields: ['projectType', 'projectScale', 'safetyStandards'],
  },

  hospitality: {
    defaultCriteria: [
      { name: 'Service Quality', weight: 35, description: 'Customer service excellence' },
      { name: 'Operations', weight: 25, description: 'Operational efficiency and standards' },
      { name: 'Guest Experience', weight: 20, description: 'Overall guest satisfaction' },
      { name: 'Cleanliness & Safety', weight: 15, description: 'Hygiene and safety protocols' },
      { name: 'Value', weight: 5, description: 'Price-to-quality ratio' },
    ],
    gradingScale: [
      { name: 'Exceptional', range: '90-100', description: '5-star quality' },
      { name: 'Excellent', range: '80-89', description: 'Exceeds expectations' },
      { name: 'Good', range: '70-79', description: 'Meets expectations' },
      { name: 'Fair', range: '60-69', description: 'Below expectations' },
      { name: 'Poor', range: '0-59', description: 'Significant improvement needed' },
    ],
    additionalFields: ['facilityType', 'serviceLevel', 'guestCapacity'],
  },

  transportation: {
    defaultCriteria: [
      { name: 'Safety & Compliance', weight: 35, description: 'Safety records and regulatory compliance' },
      { name: 'Operational Efficiency', weight: 25, description: 'On-time performance and reliability' },
      { name: 'Cost Effectiveness', weight: 20, description: 'Operational cost optimization' },
      { name: 'Service Quality', weight: 15, description: 'Customer satisfaction and service' },
      { name: 'Sustainability', weight: 5, description: 'Environmental impact and efficiency' },
    ],
    gradingScale: [
      { name: 'Excellent', range: '90-100', description: 'Industry-leading performance' },
      { name: 'Good', range: '80-89', description: 'Strong operational standards' },
      { name: 'Satisfactory', range: '70-79', description: 'Meets basic requirements' },
      { name: 'Needs Improvement', range: '60-69', description: 'Performance gaps present' },
      { name: 'Unsatisfactory', range: '0-59', description: 'Critical issues' },
    ],
    additionalFields: ['transportMode', 'fleetSize', 'routeType'],
  },

  energy: {
    defaultCriteria: [
      { name: 'Efficiency', weight: 30, description: 'Energy generation/distribution efficiency' },
      { name: 'Reliability', weight: 25, description: 'System uptime and stability' },
      { name: 'Safety', weight: 25, description: 'Safety protocols and incident prevention' },
      { name: 'Sustainability', weight: 15, description: 'Environmental impact and carbon footprint' },
      { name: 'Innovation', weight: 5, description: 'Adoption of new technologies' },
    ],
    gradingScale: [
      { name: 'Outstanding', range: '90-100', description: 'Best-in-class performance' },
      { name: 'Excellent', range: '80-89', description: 'Exceeds standards' },
      { name: 'Good', range: '70-79', description: 'Meets standards' },
      { name: 'Needs Improvement', range: '60-69', description: 'Below standards' },
      { name: 'Unsatisfactory', range: '0-59', description: 'Critical deficiencies' },
    ],
    additionalFields: ['energyType', 'capacity', 'sustainabilityGoals'],
  },

  media: {
    defaultCriteria: [
      { name: 'Content Quality', weight: 30, description: 'Production quality and storytelling' },
      { name: 'Audience Engagement', weight: 25, description: 'Viewer/listener engagement metrics' },
      { name: 'Technical Execution', weight: 20, description: 'Production technical standards' },
      { name: 'Originality', weight: 15, description: 'Creative originality and innovation' },
      { name: 'Distribution Strategy', weight: 10, description: 'Platform and reach optimization' },
    ],
    gradingScale: [
      { name: 'Exceptional', range: '90-100', description: 'Award-worthy content' },
      { name: 'Excellent', range: '80-89', description: 'Professional broadcast quality' },
      { name: 'Good', range: '70-79', description: 'Solid production value' },
      { name: 'Fair', range: '60-69', description: 'Needs refinement' },
      { name: 'Poor', range: '0-59', description: 'Below broadcast standards' },
    ],
    additionalFields: ['contentType', 'distributionPlatform', 'targetDemographic'],
  },

  nonprofit: {
    defaultCriteria: [
      { name: 'Mission Impact', weight: 35, description: 'Effectiveness in achieving mission' },
      { name: 'Financial Stewardship', weight: 25, description: 'Responsible use of resources' },
      { name: 'Transparency', weight: 20, description: 'Accountability and reporting' },
      { name: 'Community Engagement', weight: 15, description: 'Stakeholder and community involvement' },
      { name: 'Sustainability', weight: 5, description: 'Long-term organizational viability' },
    ],
    gradingScale: [
      { name: 'Exceptional', range: '90-100', description: 'Transformative impact' },
      { name: 'Excellent', range: '80-89', description: 'Strong mission delivery' },
      { name: 'Good', range: '70-79', description: 'Effective operations' },
      { name: 'Fair', range: '60-69', description: 'Room for improvement' },
      { name: 'Poor', range: '0-59', description: 'Significant concerns' },
    ],
    additionalFields: ['missionArea', 'fundingSource', 'impactMetrics'],
  },

  agriculture: {
    defaultCriteria: [
      { name: 'Production Quality', weight: 30, description: 'Crop/product quality and yield' },
      { name: 'Sustainability', weight: 25, description: 'Environmental and resource management' },
      { name: 'Compliance', weight: 20, description: 'Regulatory and safety standards' },
      { name: 'Efficiency', weight: 15, description: 'Operational and resource efficiency' },
      { name: 'Innovation', weight: 10, description: 'Adoption of modern techniques' },
    ],
    gradingScale: [
      { name: 'Excellent', range: '90-100', description: 'Premium quality production' },
      { name: 'Good', range: '80-89', description: 'High-quality standards' },
      { name: 'Satisfactory', range: '70-79', description: 'Acceptable quality' },
      { name: 'Needs Improvement', range: '60-69', description: 'Quality concerns' },
      { name: 'Unsatisfactory', range: '0-59', description: 'Below acceptable standards' },
    ],
    additionalFields: ['farmType', 'farmSize', 'certifications'],
  },

  manufacturing: {
    defaultCriteria: [
      { name: 'Quality Control', weight: 30, description: 'Product quality and defect rates' },
      { name: 'Process Efficiency', weight: 25, description: 'Manufacturing efficiency and waste reduction' },
      { name: 'Safety Standards', weight: 20, description: 'Workplace safety and compliance' },
      { name: 'Innovation', weight: 15, description: 'Process improvement and technology adoption' },
      { name: 'Supply Chain', weight: 10, description: 'Materials management and logistics' },
    ],
    gradingScale: [
      { name: 'World Class', range: '90-100', description: 'Industry-leading excellence' },
      { name: 'Excellent', range: '80-89', description: 'High-performance operations' },
      { name: 'Good', range: '70-79', description: 'Meets quality standards' },
      { name: 'Needs Improvement', range: '60-69', description: 'Performance gaps' },
      { name: 'Unsatisfactory', range: '0-59', description: 'Critical quality issues' },
    ],
    additionalFields: ['productCategory', 'productionVolume', 'qualityStandards'],
  },

  government: {
    defaultCriteria: [
      { name: 'Policy Effectiveness', weight: 30, description: 'Achievement of policy objectives' },
      { name: 'Public Value', weight: 25, description: 'Benefit to citizens and stakeholders' },
      { name: 'Efficiency', weight: 20, description: 'Resource utilization and cost-effectiveness' },
      { name: 'Transparency', weight: 15, description: 'Accountability and public reporting' },
      { name: 'Compliance', weight: 10, description: 'Legal and regulatory adherence' },
    ],
    gradingScale: [
      { name: 'Excellent', range: '90-100', description: 'Exemplary public service' },
      { name: 'Good', range: '80-89', description: 'Effective service delivery' },
      { name: 'Satisfactory', range: '70-79', description: 'Meets basic standards' },
      { name: 'Needs Improvement', range: '60-69', description: 'Performance gaps' },
      { name: 'Unsatisfactory', range: '0-59', description: 'Significant deficiencies' },
    ],
    additionalFields: ['agencyLevel', 'policyArea', 'stakeholders'],
  },
}

// Field configurations for additional industry-specific data
export const additionalFieldConfigs = {
  // Education
  gradeLevel: {
    label: 'Grade Level',
    type: 'select',
    options: ['K-5', '6-8', '9-12', 'Undergraduate', 'Graduate', 'Professional Development'],
    required: true,
  },
  subject: {
    label: 'Subject Area',
    type: 'text',
    placeholder: 'e.g., Mathematics, English, Science',
    required: true,
  },
  assignmentType: {
    label: 'Assignment Type',
    type: 'select',
    options: ['Essay', 'Project', 'Presentation', 'Lab Report', 'Research Paper', 'Other'],
    required: true,
  },
  learningObjectives: {
    label: 'Learning Objectives',
    type: 'textarea',
    placeholder: 'List the key learning objectives this assignment addresses',
    required: false,
  },

  // Technology
  techStack: {
    label: 'Tech Stack',
    type: 'text',
    placeholder: 'e.g., React, Node.js, MongoDB',
    required: true,
  },
  programmingLanguages: {
    label: 'Programming Languages',
    type: 'text',
    placeholder: 'e.g., JavaScript, Python, Java',
    required: true,
  },
  framework: {
    label: 'Framework/Library',
    type: 'text',
    placeholder: 'e.g., React, Vue, Angular, Django',
    required: false,
  },
  deploymentStatus: {
    label: 'Deployment Status',
    type: 'select',
    options: ['Not Deployed', 'Deployed - Demo', 'Deployed - Production', 'In Progress'],
    required: true,
  },

  // Law
  caseType: {
    label: 'Case Type',
    type: 'select',
    options: ['Civil', 'Criminal', 'Administrative', 'Constitutional', 'Other'],
    required: true,
  },
  jurisdiction: {
    label: 'Jurisdiction',
    type: 'text',
    placeholder: 'e.g., Federal, State, County',
    required: true,
  },
  practiceArea: {
    label: 'Practice Area',
    type: 'text',
    placeholder: 'e.g., Contract Law, Family Law, Corporate Law',
    required: true,
  },
  documentType: {
    label: 'Document Type',
    type: 'select',
    options: ['Brief', 'Memo', 'Motion', 'Contract', 'Opinion', 'Other'],
    required: true,
  },

  // Healthcare
  medicalSpecialty: {
    label: 'Medical Specialty',
    type: 'text',
    placeholder: 'e.g., Cardiology, Pediatrics, Surgery',
    required: true,
  },
  patientPopulation: {
    label: 'Patient Population',
    type: 'text',
    placeholder: 'e.g., Adults, Pediatric, Geriatric',
    required: false,
  },
  regulatoryStandards: {
    label: 'Regulatory Standards',
    type: 'text',
    placeholder: 'e.g., HIPAA, FDA, Joint Commission',
    required: false,
  },

  // Competition
  competitionType: {
    label: 'Competition Type',
    type: 'select',
    options: ['Hackathon', 'Coding Challenge', 'Innovation Contest', 'Pitch Competition', 'Design Challenge', 'Other'],
    required: true,
  },
  teamSize: {
    label: 'Team Size',
    type: 'number',
    placeholder: 'Number of team members',
    required: true,
  },
  theme: {
    label: 'Competition Theme',
    type: 'text',
    placeholder: 'e.g., Healthcare Innovation, FinTech Solutions',
    required: false,
  },
  duration: {
    label: 'Duration',
    type: 'text',
    placeholder: 'e.g., 24 hours, 48 hours, 1 week',
    required: false,
  },

  // Events
  eventType: {
    label: 'Event Type',
    type: 'select',
    options: ['Conference', 'Workshop', 'Webinar', 'Panel Discussion', 'Keynote', 'Other'],
    required: true,
  },
  audienceSize: {
    label: 'Expected Audience Size',
    type: 'select',
    options: ['< 50', '50-100', '100-300', '300-500', '500+'],
    required: false,
  },
  format: {
    label: 'Format',
    type: 'select',
    options: ['In-Person', 'Virtual', 'Hybrid'],
    required: true,
  },

  // Business
  businessType: {
    label: 'Business Type',
    type: 'select',
    options: ['Startup', 'Small Business', 'Enterprise', 'Non-Profit', 'Other'],
    required: true,
  },
  stage: {
    label: 'Business Stage',
    type: 'select',
    options: ['Idea Stage', 'MVP', 'Early Revenue', 'Growth Stage', 'Established'],
    required: true,
  },
  fundingNeeds: {
    label: 'Funding Needs',
    type: 'text',
    placeholder: 'e.g., $50K seed funding',
    required: false,
  },

  // Creative
  medium: {
    label: 'Medium',
    type: 'text',
    placeholder: 'e.g., Digital Art, Photography, Video, Music',
    required: true,
  },
  style: {
    label: 'Style/Genre',
    type: 'text',
    placeholder: 'e.g., Abstract, Realism, Documentary',
    required: false,
  },
  projectType: {
    label: 'Project Type',
    type: 'select',
    options: ['Portfolio Piece', 'Commercial Project', 'Personal Work', 'Client Work', 'Other'],
    required: true,
  },
  targetAudience: {
    label: 'Target Audience',
    type: 'text',
    placeholder: 'e.g., Young Adults, Professionals, General Public',
    required: false,
  },

  // Real Estate
  propertyType: {
    label: 'Property Type',
    type: 'select',
    options: ['Residential', 'Commercial', 'Industrial', 'Land', 'Mixed-Use'],
    required: true,
  },
  propertyLocation: {
    label: 'Property Location',
    type: 'text',
    placeholder: 'e.g., City, State, Neighborhood',
    required: true,
  },
  appraisalPurpose: {
    label: 'Appraisal Purpose',
    type: 'select',
    options: ['Sale', 'Purchase', 'Financing', 'Tax Assessment', 'Legal Dispute', 'Other'],
    required: true,
  },

  // Construction
  projectType: {
    label: 'Project Type',
    type: 'select',
    options: ['Residential Building', 'Commercial Building', 'Infrastructure', 'Renovation', 'Civil Engineering'],
    required: true,
  },
  projectScale: {
    label: 'Project Scale',
    type: 'select',
    options: ['Small (<$1M)', 'Medium ($1M-$10M)', 'Large ($10M-$100M)', 'Mega (>$100M)'],
    required: true,
  },
  safetyStandards: {
    label: 'Safety Standards',
    type: 'text',
    placeholder: 'e.g., OSHA, ISO 45001',
    required: false,
  },

  // Hospitality
  facilityType: {
    label: 'Facility Type',
    type: 'select',
    options: ['Hotel', 'Restaurant', 'Resort', 'Event Venue', 'Cruise', 'Theme Park'],
    required: true,
  },
  serviceLevel: {
    label: 'Service Level',
    type: 'select',
    options: ['Budget', 'Mid-Range', 'Upscale', 'Luxury', 'Ultra-Luxury'],
    required: true,
  },
  guestCapacity: {
    label: 'Guest Capacity',
    type: 'text',
    placeholder: 'e.g., 50 rooms, 200 seats',
    required: false,
  },

  // Transportation
  transportMode: {
    label: 'Transport Mode',
    type: 'select',
    options: ['Road', 'Rail', 'Air', 'Sea', 'Multi-Modal'],
    required: true,
  },
  fleetSize: {
    label: 'Fleet Size',
    type: 'text',
    placeholder: 'e.g., 50 vehicles',
    required: false,
  },
  routeType: {
    label: 'Route Type',
    type: 'select',
    options: ['Local', 'Regional', 'National', 'International'],
    required: true,
  },

  // Energy
  energyType: {
    label: 'Energy Type',
    type: 'select',
    options: ['Solar', 'Wind', 'Hydro', 'Nuclear', 'Fossil Fuel', 'Geothermal', 'Biomass'],
    required: true,
  },
  capacity: {
    label: 'Capacity',
    type: 'text',
    placeholder: 'e.g., 100 MW',
    required: false,
  },
  sustainabilityGoals: {
    label: 'Sustainability Goals',
    type: 'text',
    placeholder: 'e.g., Carbon neutral by 2030',
    required: false,
  },

  // Media
  contentType: {
    label: 'Content Type',
    type: 'select',
    options: ['Film', 'TV Series', 'Documentary', 'Podcast', 'Web Series', 'Live Streaming', 'Animation'],
    required: true,
  },
  distributionPlatform: {
    label: 'Distribution Platform',
    type: 'text',
    placeholder: 'e.g., Netflix, YouTube, Broadcast TV',
    required: false,
  },
  targetDemographic: {
    label: 'Target Demographic',
    type: 'text',
    placeholder: 'e.g., Adults 18-34, Families',
    required: true,
  },

  // Non-profit
  missionArea: {
    label: 'Mission Area',
    type: 'text',
    placeholder: 'e.g., Education, Healthcare, Environment',
    required: true,
  },
  fundingSource: {
    label: 'Primary Funding Source',
    type: 'select',
    options: ['Grants', 'Donations', 'Government', 'Corporate Sponsorship', 'Mixed'],
    required: false,
  },
  impactMetrics: {
    label: 'Impact Metrics',
    type: 'textarea',
    placeholder: 'Key performance indicators for measuring social impact',
    required: false,
  },

  // Agriculture
  farmType: {
    label: 'Farm Type',
    type: 'select',
    options: ['Crop Production', 'Livestock', 'Dairy', 'Aquaculture', 'Organic', 'Greenhouse', 'AgriTech'],
    required: true,
  },
  farmSize: {
    label: 'Farm Size',
    type: 'text',
    placeholder: 'e.g., 100 acres, 50 hectares',
    required: false,
  },
  certifications: {
    label: 'Certifications',
    type: 'text',
    placeholder: 'e.g., Organic, Fair Trade, GAP',
    required: false,
  },

  // Manufacturing
  productCategory: {
    label: 'Product Category',
    type: 'text',
    placeholder: 'e.g., Automotive Parts, Electronics, Textiles',
    required: true,
  },
  productionVolume: {
    label: 'Production Volume',
    type: 'select',
    options: ['Low Volume (<1000/yr)', 'Medium Volume (1K-100K/yr)', 'High Volume (>100K/yr)', 'Mass Production'],
    required: true,
  },
  qualityStandards: {
    label: 'Quality Standards',
    type: 'text',
    placeholder: 'e.g., ISO 9001, Six Sigma, Lean',
    required: false,
  },

  // Government
  agencyLevel: {
    label: 'Agency Level',
    type: 'select',
    options: ['Federal', 'State', 'County', 'Municipal', 'International'],
    required: true,
  },
  policyArea: {
    label: 'Policy Area',
    type: 'text',
    placeholder: 'e.g., Transportation, Education, Public Safety',
    required: true,
  },
  stakeholders: {
    label: 'Key Stakeholders',
    type: 'textarea',
    placeholder: 'List primary stakeholders and affected parties',
    required: false,
  },
}
