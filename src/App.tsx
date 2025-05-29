
// MUI Material imports
import { CssBaseline, CircularProgress, Box, Typography } from '@mui/material';
// React useState and useEffect imports
import { useEffect, useState } from 'react';
// Local component imports
import NavBar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import PatientTable from './components/PatientTable/PatientTable';
import ResponsiveContainer from './components/Layout/ResponsiveContainer';

// Local styles, services and types imports
import { colors } from './styles/colors';
import { fetchPatients } from './services/patients';
import type { Patient } from './types/Patient';


function App() {
  // State variables for managing the application state
  // hidden: controls visibility of certain UI elements (default is false, meaning they are visible)
  // patients: array of Patient object types, initially empty
  // loading: boolean to indicate if data is being fetched (default is true)
  // error: string to hold any error messages (default is null, meaning no error.  The any type is used to allow for flexibility in error handling)

  const [hidden, setHidden] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  // Function to load patients from the API
  // It uses the fetchPatients asynchronous function to get the data
  // If successful, it updates the patients state with the fetched data
  // If there's an error, it sets the error state with the error message
  // Finally, it sets loading to false to indicate that the data fetching is complete
  const loadPatients = async () => {
    try {
      const data = await fetchPatients();
      setPatients(data);
    } catch (err: any) {
      setError(err.message || 'Error loading patients');
    } finally {
      setLoading(false);
    }
  };

  // standard useEffect hook to call loadPatients when the component mounts
  useEffect(() => {
    loadPatients();
  }, []);

  // Our component renders a standard layout with a NavBar, a ResponsiveContainer to hold our main content, and a Footer
  // The ResponsiveContainer holds the PatientTable, which displays the list of patients as well as the loading state and any errors that may occur
  // The CssBaseline component is used to apply a consistent baseline style globally across the application

  // Critical Prop Passing:
  //// hidden<state> --> NavBar to control its visibility
  //// reloadPatients<function> --> PatientTable so it can refresh the patient list if needed
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
            <PatientTable patients={patients} hidden={hidden} reloadPatients={loadPatients} />
          )}
        </ResponsiveContainer>
        <Footer />
      </Box>
    </>
  );
}

export default App;
