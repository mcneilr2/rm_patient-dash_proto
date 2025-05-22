import { Box, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import type { Patient } from '../../types/Patient';
import { fetchPatients } from '../../services/patients';
import PatientTable from '../../components/PatientTable/PatientTable';
import ResponsiveContainer from '../../components/Layout/ResponsiveContainer';

const Dashboard = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchPatients();
        setPatients(data);
      } catch (err: any) {
        setError(err?.message || 'Error loading patients');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <ResponsiveContainer>
      {error && (
        <Typography color="error" variant="body1" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <PatientTable patients={patients} />
      )}
    </ResponsiveContainer>
  );
};

export default Dashboard;
