// src/services/patients.ts

import type { Patient } from '../types/Patient';

export async function fetchPatients(): Promise<Patient[]> {
  const res = await fetch('/api/patients');

  if (!res.ok) {
    throw new Error(`Failed to fetch patients: ${res.status}`);
  }

  return res.json();
}
