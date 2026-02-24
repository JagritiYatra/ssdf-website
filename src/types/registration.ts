export type Category = "school" | "college" | "professional";

export interface TeamMember {
  name: string;
  role: string;
}

export interface Registration {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  photoUrl: string | null;
  teamName: string;
  institution: string;
  state: string;
  category: Category;
  teamMembers: TeamMember[];
  createdAt: string;
}

export interface RegistrationFormData {
  fullName: string;
  email: string;
  phone: string;
  photoUrl: string;
  teamName: string;
  institution: string;
  state: string;
  category: Category;
  teamMembers: TeamMember[];
}
