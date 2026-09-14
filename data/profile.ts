import type { Profile } from "@/types";

export const profile: Profile = {
  name: "Kushan M Jayaweera",
  headline: "ICT Undergraduate | Software Developer | DevOps Learner",
  introduction:
    "I am an ICT undergraduate specializing in Software Technology, with an interest in software development and DevOps.",
  biography: [
    "I enjoy building practical software projects and continuously improving my skills in modern development tools and technologies.",
    "I am currently developing my knowledge in software engineering, web development, databases, Git/GitHub, Linux, and DevOps practices.",
  ],
  roles: ["ICT Undergraduate", "Software Developer", "DevOps Learner"],
  location: "Sri Lanka",
  email: "malidukushan0421@gmail.com",
  image: {
    src: "/images/profile/kushan-profile.png",
    alt: "Portrait of Kushan M Jayaweera",
    width: 1254,
    height: 1254,
  },
  socialLinks: [
    {
      label: "GitHub",
      url: "https://github.com/Kushan2001",
      ariaLabel: "GitHub profile",
      icon: "github",
    },
    {
      label: "LinkedIn",
      url: "http://www.linkedin.com/in/kushan-m-jayaweera-7163562b1",
      ariaLabel: "LinkedIn profile",
      icon: "linkedin",
    },
  ],
};
