import { Registration, RegistrationFormData } from "@/types/registration";

const STORAGE_KEY = "ssdf-registrations";

function generateId(): string {
  const existing = getRegistrations();
  const num = existing.length + 1;
  return `SSDF-CANSAT-2026-${String(num).padStart(4, "0")}`;
}

export function getRegistrations(): Registration[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function getRegistrationById(id: string): Registration | undefined {
  return getRegistrations().find((r) => r.id === id);
}

export function saveRegistration(formData: RegistrationFormData): Registration {
  const registrations = getRegistrations();
  const registration: Registration = {
    ...formData,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };
  registrations.push(registration);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations));
  return registration;
}

export function deleteRegistration(id: string): void {
  const registrations = getRegistrations().filter((r) => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations));
}

export function exportRegistrationsCSV(): string {
  const registrations = getRegistrations();
  if (registrations.length === 0) return "";

  const headers = [
    "ID",
    "Full Name",
    "Email",
    "Phone",
    "Team Name",
    "Institution",
    "State",
    "Category",
    "Team Members",
    "Registered At",
  ];

  const rows = registrations.map((r) => [
    r.id,
    r.fullName,
    r.email,
    r.phone,
    r.teamName,
    r.institution,
    r.state,
    r.category,
    r.teamMembers.map((m) => `${m.name} (${m.role})`).join("; "),
    new Date(r.createdAt).toLocaleString(),
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell}"`).join(","))
    .join("\n");

  return csv;
}
