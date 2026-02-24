import { z } from "zod";

export const step1Schema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian phone number"),
  photoUrl: z.string().min(1, "Photo is required"),
});

export const teamMemberSchema = z.object({
  name: z.string().min(2, "Member name must be at least 2 characters"),
  role: z.string().min(1, "Role is required"),
});

export const step2Schema = z.object({
  teamName: z.string().min(2, "Team name must be at least 2 characters"),
  institution: z.string().min(2, "Institution name is required"),
  state: z.string().min(2, "State is required"),
  category: z.enum(["school", "college", "professional"]),
  teamMembers: z
    .array(teamMemberSchema)
    .min(1, "At least 1 team member is required")
    .max(5, "Maximum 5 team members allowed"),
});

export const registrationSchema = step1Schema.merge(step2Schema);

export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type RegistrationData = z.infer<typeof registrationSchema>;
