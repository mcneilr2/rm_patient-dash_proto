// src/components/Footer/Footer.tsx

import { Box, Typography, Button } from '@mui/material';

const Footer = () => (
  <Box
    component="footer"
    sx={{
      mt: 4,
      py: 3,
      px: 2,
      textAlign: 'center',
      borderTop: '1px solid',
      borderColor: 'divider',
      backgroundColor: 'background.paper',
    }}
  >
    <Typography variant="body2" color="text.secondary">
      © 2025 Your IP Rights
    </Typography>
    <Button variant="text" size="small" sx={{ mt: 1 }}>
      Help
    </Button>
  </Box>
);

export default Footer;
