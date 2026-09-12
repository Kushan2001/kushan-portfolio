import type { Project } from "@/types";

// Add only real projects confirmed by the portfolio owner.
export const projects: readonly Project[] = [
  {
    slug: "student-management-system",
    title: "Student Management System",
    summary: "",
    description: "",
    category: "software-development",
    technologies: ["Java", "Java Swing", "MySQL", "JDBC"],
    images: [],
    githubUrl: "https://github.com/Kushan2001/StudentManagementSystem",
    featured: true,
    status: "in-progress",
    problem: "",
    solution: "",
    features: [
      "Login",
      "Add Student",
      "View Students",
      "Search Students",
      "Update Students",
      "Delete Students",
      "Input Validation",
      "MySQL database integration",
    ],
    challenges: [],
    lessonsLearned: [],
    futureImprovements: [],
  },
];
