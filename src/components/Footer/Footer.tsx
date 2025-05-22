import { Box, Typography, Button } from '@mui/material';
import { colors } from '../../styles/colors';

const Footer = () => (
  <Box
    component="footer"
    sx={{
      mt: 4,
      py: { xs: 2, sm: 3 },
      px: { xs: 2, sm: 4 },
      textAlign: 'center',
      borderTop: `1px solid ${colors.border.light}`,
      backgroundColor: colors.background.default,
    }}
  >
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{
        fontSize: { xs: '0.75rem', sm: '0.875rem' }
      }}
    >
      © 2025 Your IP Rights
    </Typography>
    <Button
      variant="text"
      size="small"
      sx={{
        mt: 1,
        fontSize: { xs: '0.75rem', sm: '0.875rem' },
        color: colors.primary,
        textTransform: 'none',
        fontWeight: 500
      }}
    >
      Help
    </Button>
  </Box>
);

export default Footer;
