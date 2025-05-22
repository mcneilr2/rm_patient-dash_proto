import { useEffect, useState } from 'react';
import {
  CssBaseline, Box, CircularProgress, Typography
} from '@mui/material';
import NavBar from './components/Navbar/NavBar';
import Footer from './components/Footer/Footer';
import PatientTable from './components/PatientTable/PatientTable';
import type { Patient } from './types/Patient';
import { fetchPatients } from './services/patients';
import { colors } from './styles/colors';

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
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        backgroundImage: 'url("/images/blue_background_graphic.svg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0rem 1rem'
      }}
    >
      <CssBaseline />
      <NavBar onToggleHide={() => setHidden(!hidden)} isHidden={hidden} />
      <Box
        sx={{
          width: '100%',
          maxWidth: '1200px',
          mt: 4,
          backgroundColor: colors.background.default,
          borderRadius: 2,
          boxShadow: '0 0 12px rgba(0,0,0,0.1)',
          p: 3,
        }}
      >
        {error && <Typography color="error">{error}</Typography>}
        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <PatientTable patients={patients} hidden={hidden} />
        )}
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
