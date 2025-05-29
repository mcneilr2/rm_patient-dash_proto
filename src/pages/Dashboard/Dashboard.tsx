//MUI imports
import { Box, CircularProgress, Typography } from '@mui/material';
//React imports
import { useEffect, useState } from 'react';

//Types and services imports
import type { Patient } from '../../types/Patient';
import { fetchPatients } from '../../services/patients';

//Component imports
import PatientTable from '../../components/PatientTable/PatientTable';
import ResponsiveContainer from '../../components/Layout/ResponsiveContainer';

const Dashboard = () => {
  // State to hold the patients data,
  // loading state and error message
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //Standard useEffect hook to fetch patients data upon component mount
  useEffect(() => {
    // Use an async function to fetch data
    const load = async () => {
      // Try to fetch from the API,
      // set the error on failure,
      // and remove the loading state upon success
      try {
        const data = await fetchPatients();
        setPatients(data);
      } catch (err: any) {
        setError(err?.message || 'Error loading patients');
      } finally {
        setLoading(false);
      }
    };

    // Call the load function to fetch data
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
