// src/pages/Dashboard/Dashboard.tsx

import { Box, Container } from '@mui/material';
import { usePatientFilters } from "../../state/usePatientFilters";
import FilterControls from '../../components/FilterControls/FilterControls';
import PatientTable from '../../components/PatientTable/PatientTable';
import type { Patient } from '../../types/Patient';

const MOCK_PATIENTS: Patient[] = [
  {
    id: '1',
    name: 'Jane Doe',
    dob: '1985-01-01',
    status: 'Active',
    address: '123 Main St',
  },
  {
    id: '2',
    name: 'John Smith',
    dob: '1990-07-21',
    status: 'Inquiry',
    address: '456 Elm St',
  },
  // Add more test records if needed
];

interface Props {
  hidden: boolean;
}

const Dashboard = ({ hidden }: Props) => {
  const { statusFilter, setStatusFilter, applyFilters } = usePatientFilters();
  const filteredPatients = applyFilters(MOCK_PATIENTS);

  return (
    <Container sx={{ mt: 4 }}>
      <FilterControls value={statusFilter} onChange={setStatusFilter} />
      {!hidden && (
        <Box mt={3}>
          <PatientTable patients={filteredPatients} />
        </Box>
      )}
    </Container>
  );
};

export default Dashboard;
