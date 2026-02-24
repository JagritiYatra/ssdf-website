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
  photo: string; // base64 data URL
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
  photo: string;
  teamName: string;
  institution: string;
  state: string;
  category: Category;
  teamMembers: TeamMember[];
}
