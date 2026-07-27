export type EmploymentType = "Full-time" | "Contract";

export type CareerRole = {
  id: string;
  title: string;
  department: string;
  location: string;
  workplace: "Hybrid" | "Remote";
  employmentType: EmploymentType;
  summary: string;
  responsibilities: string[];
  qualifications: string[];
};

export type CareerApplication = {
  roleId: string;
  firstName: string;
  lastName: string;
  email: string;
  linkedIn: string;
  note: string;
  consent: boolean;
};
