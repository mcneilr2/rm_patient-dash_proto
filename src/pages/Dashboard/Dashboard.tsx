import { Box, Container } from '@mui/material';
import { useState } from 'react';
import SearchField from '../../components/SearchField/SearchField';
import PatientTable from '../../components/PatientTable/PatientTable';
import type { Patient } from '../../types/Patient';

interface Props {
  hidden: boolean;
  patients: Patient[];
}

const Dashboard = ({ hidden, patients }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Container sx={{ mt: 4 }}>
      {!hidden && (
        <>
          <SearchField value={searchQuery} onChange={setSearchQuery} />
          <Box mt={3}>
            <PatientTable patients={patients} searchQuery={searchQuery} />
          </Box>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
