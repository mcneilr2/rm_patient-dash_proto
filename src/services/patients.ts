import type { Patient } from '../types/Patient';

export async function fetchPatients(): Promise<Patient[]> {
  const res = await fetch('/api/patients');
  if (!res.ok) throw new Error(`Failed to fetch patients: ${res.status}`);
  return res.json();
}

export async function addPatient(patient: Omit<Patient, 'id'>): Promise<Patient> {
  const res = await fetch('/api/patients', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patient),
  });

  if (!res.ok) throw new Error(`Failed to add patient: ${res.status}`);
  return res.json();
}
