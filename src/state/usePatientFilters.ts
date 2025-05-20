// src/state/usePatientFilters.ts

import { useState } from 'react';
import type { Patient } from '../types/Patient';

export function usePatientFilters() {
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const applyFilters = (patients: Patient[]) => {
    return patients.filter((p) =>
      statusFilter === 'All' || p.status === statusFilter
    );
  };

  return {
    statusFilter,
    setStatusFilter,
    applyFilters,
  };
}
