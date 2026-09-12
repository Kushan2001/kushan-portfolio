export interface NavigationItem {
  readonly label: string;
  readonly href: string;
}

export const navigationItems: readonly NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "DevOps", href: "/#devops" },
  { label: "Education", href: "/#education" },
  { label: "Contact", href: "/#contact" },
];
