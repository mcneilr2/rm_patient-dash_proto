// src/types/Patient.ts

export const PatientStatuses = ['Inquiry', 'Onboarding', 'Active', 'Churned'] as const;

export type PatientStatus = typeof PatientStatuses[number];

export interface Patient {
  id: string;
  name: string;
  dob: string;
  status: PatientStatus;
  address: string;
}
