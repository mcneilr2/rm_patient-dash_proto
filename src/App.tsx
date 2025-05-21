// src/App.tsx
import { useState } from 'react';
import { CssBaseline, Container } from '@mui/material';

import NavBar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { Dashboard } from './pages/Dashboard/Dashboard';

function App() {
  const [hidden, setHidden] = useState(false);

  return (
    <>
      <CssBaseline />
      <NavBar onToggleHide={() => setHidden(!hidden)} isHidden={hidden} />
      <Container sx={{ mt: 4 }}>
        <Dashboard />
      </Container>
      <Footer />
    </>
  );
}

export default App;