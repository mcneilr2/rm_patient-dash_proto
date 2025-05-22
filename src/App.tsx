import { CssBaseline, CircularProgress, Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import NavBar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import type { Patient } from './types/Patient';
import { fetchPatients } from './services/patients';
import PatientTable from './components/PatientTable/PatientTable';
import { colors } from './styles/colors';
import ResponsiveContainer from './components/Layout/ResponsiveContainer';

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
          px: { xs: 2, sm: 3 },
        }}
      >
        <NavBar onToggleHide={() => setHidden(!hidden)} isHidden={hidden} />
        <ResponsiveContainer
          sx={{
            mt: 4,
            mb: 2,
            backgroundColor: colors.background.default,
            borderRadius: { xs: '1rem', md: '1.5rem' },
            boxShadow: '0 0 12px rgba(0,0,0,0.1)',
            pb: 3,
            width: '100%',
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
        </ResponsiveContainer>
        <Footer />
      </Box>
    </>
  );
}

export default App;
