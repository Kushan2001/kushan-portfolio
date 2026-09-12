export type ProjectCategory =
  | "software-development"
  | "devops"
  | "cloud"
  | "web"
  | "other";

export type ProjectStatus =
  | "completed"
  | "in-progress"
  | "maintained"
  | "archived";

export type EducationStatus = "completed" | "in-progress";

export type MilestoneStatus = "completed" | "in-progress" | "planned";

export interface ImageAsset {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly caption?: string;
}

export interface SocialLink {
  readonly label: string;
  readonly url: string;
  readonly ariaLabel: string;
  /** A presentation-agnostic icon key, resolved by the component layer. */
  readonly icon?: string;
}

export interface Profile {
  readonly name: string;
  readonly headline: string;
  readonly introduction: string;
  readonly biography: readonly string[];
  readonly roles: readonly string[];
  readonly location?: string;
  readonly email?: string;
  readonly image?: ImageAsset;
  readonly cvUrl?: string;
  readonly socialLinks: readonly SocialLink[];
}

export interface Skill {
  readonly name: string;
  readonly description?: string;
  /** A presentation-agnostic icon key, resolved by the component layer. */
  readonly icon?: string;
  readonly featured?: boolean;
}

export interface SkillCategory {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly skills: readonly Skill[];
}

export interface Project {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly description: string;
  readonly category: ProjectCategory;
  readonly technologies: readonly string[];
  readonly images: readonly ImageAsset[];
  readonly githubUrl?: string;
  readonly liveUrl?: string;
  readonly featured: boolean;
  readonly status: ProjectStatus;
  readonly problem: string;
  readonly solution: string;
  readonly architecture?: string;
  readonly features: readonly string[];
  readonly challenges: readonly string[];
  readonly lessonsLearned: readonly string[];
  readonly futureImprovements: readonly string[];
}

export interface Education {
  readonly institution: string;
  readonly qualification: string;
  readonly fieldOfStudy?: string;
  readonly department?: string;
  readonly faculty?: string;
  /** Prefer an ISO 8601 date or year supplied by the portfolio owner. */
  readonly startDate?: string;
  /** Omit while the qualification is in progress. */
  readonly endDate?: string;
  readonly status: EducationStatus;
  readonly description?: string;
  readonly coursework?: readonly string[];
  readonly highlights?: readonly string[];
}

export interface Certification {
  readonly name: string;
  readonly issuer: string;
  /** Prefer an ISO 8601 date or year supplied by the portfolio owner. */
  readonly issueDate?: string;
  readonly expirationDate?: string;
  readonly credentialId?: string;
  readonly credentialUrl?: string;
  readonly image?: ImageAsset;
  readonly description?: string;
}

export interface DevOpsMilestone {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  /** Prefer an ISO 8601 date or year supplied by the portfolio owner. */
  readonly date: string;
  readonly status: MilestoneStatus;
  readonly technologies: readonly string[];
  readonly highlights?: readonly string[];
}

export interface PortfolioData {
  readonly profile: Profile | null;
  readonly skillCategories: readonly SkillCategory[];
  readonly projects: readonly Project[];
  readonly education: readonly Education[];
  readonly certifications: readonly Certification[];
  readonly devOpsMilestones: readonly DevOpsMilestone[];
}
