// App.tsx — no external status filter bar

import { useEffect, useState } from 'react';
import { CssBaseline, Box, Container, CircularProgress, Typography } from '@mui/material';

import NavBar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import PatientTable from './components/PatientTable/PatientTable';

import type { Patient } from './types/Patient';
import { fetchPatients } from './services/patients';

function App() {
  const [hidden, setHidden] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchPatients();
        setPatients(data);
      } catch (err: any) {
        setError(err.message || 'Error loading patients');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <>
      <CssBaseline />
      <NavBar onToggleHide={() => setHidden(!hidden)} isHidden={hidden} />
      <Container sx={{ mt: 4 }}>
        {error && <Typography color="error">{error}</Typography>}
        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          !hidden && (
            <Box mt={3}>
              <PatientTable patients={patients} />
            </Box>
          )
        )}
      </Container>
      <Footer />
    </>
  );
}

export default App;
