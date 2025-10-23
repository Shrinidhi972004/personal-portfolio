export const projects = [
  {
    id: 1,
    title: 'Image Video Gallery - MERN Stack with DevSecOps',
    tags: ['DevOps', 'Security', 'Cloud'],
    description: 'Full-stack MERN application for image/video gallery with AWS S3 storage. Implemented complete DevSecOps pipeline using SonarQube for code quality, Trivy for vulnerability scanning, OWASP security checks, Docker containerization, Kubernetes deployment, and GitOps with ArgoCD for automated deployments.',
    stack: ['MongoDB', 'Express.js', 'React', 'Node.js', 'AWS S3', 'Docker', 'Kubernetes', 'ArgoCD', 'SonarQube', 'Trivy', 'OWASP'],
    github: 'https://github.com/Shrinidhi972004/Image-and-video-gallery-using-aws-s3-.git',
    live: null,
    featured: true
  },
  {
    id: 2,
    title: 'Placements Notification Bot',
    tags: ['DevOps', 'Cloud'],
    description: 'Automated Telegram bot deployed on AWS EC2 using Docker to notify 25+ students about placement opportunities. Monitors emails stuck in promotions/spam folders and sends real-time updates via Telegram API.',
    stack: ['Python', 'Docker', 'AWS EC2', 'Telegram API', 'Email Processing'],
    github: 'https://github.com/Shrinidhi972004/placements-updates-notification-bot.git',
    live: null,
    featured: true
  },
  {
    id: 3,
    title: 'Unified Monitoring & Incident Management Suite',
    tags: ['DevOps', 'Cloud'],
    description: 'End-to-end observability platform built with Prometheus, Grafana, and AlertManager. Features automated incident escalation, Slack integrations, and runbook automation using Ansible.',
    stack: ['Prometheus', 'Grafana', 'Kubernetes', 'Ansible', 'Slack API'],
    github: 'https://github.com/Shrinidhi972004/unified-monitoring-platform.git',
    live: null,
    featured: true
  },
  {
    id: 4,
    title: 'Data Fortress: Multicloud Backup Platform',
    tags: ['Cloud', 'Security'],
    description: 'Automated backup orchestration across AWS S3, GCP Cloud Storage, and Azure Blob. Features encryption at rest, lifecycle policies, and point-in-time recovery with Terraform IaC.',
    stack: ['Terraform', 'AWS S3', 'GCP', 'Azure', 'Python'],
    github: 'https://github.com/Shrinidhi972004/Data-Fortress-Autonomous-Multicloud-Backup-Recovery-Platform.git',
    live: null,
    featured: true
  },
  {
    id: 5,
    title: 'TrustKey: Passwordless Authentication System',
    tags: ['Security'],
    description: 'FIDO2/WebAuthn implementation with biometric authentication, audit logging, and session management. Built with Node.js backend and React frontend.',
    stack: ['Node.js', 'WebAuthn', 'PostgreSQL', 'Redis', 'Docker'],
    github: 'https://github.com/Shrinidhi972004/passwordless-password-authentication-system.git',
    live: null
  },
  {
    id: 6,
    title: 'CloudScale: Auto-Scaling Microservices Platform',
    tags: ['DevOps', 'Cloud'],
    description: 'Kubernetes-native platform for automatic horizontal pod scaling based on custom metrics. Includes cost optimization and resource allocation intelligence.',
    stack: ['Kubernetes', 'Go', 'Helm', 'Prometheus', 'AWS EKS'],
    github: 'https://github.com/shrinidhi-upadhyaya/cloudscale',
    live: null
  }
]

export const certifications = [
  {
    id: 1,
    title: 'AWS Solutions Architect - Associate',
    organization: 'Amazon Web Services',
    year: 2023,
    credentialId: 'AWS-SAA-2023-001234',
    icon: 'aws'
  },
  {
    id: 2,
    title: 'Certified Kubernetes Administrator (CKA)',
    organization: 'Cloud Native Computing Foundation',
    year: 2023,
    credentialId: 'CKA-2023-005678',
    icon: 'kubernetes'
  },
  {
    id: 3,
    title: 'HashiCorp Certified: Terraform Associate',
    organization: 'HashiCorp',
    year: 2022,
    credentialId: 'HC-TA-2022-009876',
    icon: 'terraform'
  },
  {
    id: 4,
    title: 'TechVision Innovation Award 2024',
    organization: 'TechVision Conference',
    year: 2024,
    credentialId: 'TV-AWARD-2024-IA',
    icon: 'award'
  }
]

export const skills = [
  { name: 'AWS', category: 'Cloud', level: 90 },
  { name: 'Docker', category: 'Containers', level: 95 },
  { name: 'Kubernetes', category: 'Orchestration', level: 85 },
  { name: 'Terraform', category: 'IaC', level: 90 },
  { name: 'Jenkins', category: 'CI/CD', level: 85 },
  { name: 'Prometheus', category: 'Monitoring', level: 80 },
  { name: 'Grafana', category: 'Visualization', level: 85 },
  { name: 'Python', category: 'Programming', level: 80 },
  { name: 'Bash', category: 'Scripting', level: 90 },
  { name: 'Ansible', category: 'Automation', level: 75 },
  { name: 'Git', category: 'Version Control', level: 95 },
  { name: 'Linux', category: 'OS', level: 90 }
]
