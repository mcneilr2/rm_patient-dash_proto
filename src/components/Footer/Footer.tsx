import { Box, Typography } from '@mui/material';
import { colors } from '../../styles/colors';

const Footer = () => (
  <Box
    component="footer"
    sx={{
      mt: '1rem',
      py: { xs: '1rem', sm: '1.5rem' },
      px: { xs: '1rem', sm: '1.5rem' },
      width: '100%',
      textAlign: 'center',
      borderTop: `1px solid ${colors.border.light}`,
      backgroundColor: colors.background.default,
      borderRadius: { xs: '1rem', sm: '1.5rem' }
    }}
  >
    <Typography
      variant="body2"
      sx={{
        fontSize: { xs: '0.75rem', sm: '0.875rem' },
        color: colors.text.secondary,
      }}
    >
      © 2025 Your IP Rights
    </Typography>
  </Box>
);

export default Footer;
