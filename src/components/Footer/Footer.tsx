import { Box, Typography, Button } from '@mui/material';
import { colors } from '../../styles/colors';

const Footer = () => (
  <Box
    component="footer"
    sx={{
      mt: 4,
      py: { xs: 2, sm: 3 },
      px: { xs: 2, sm: 3 },
      width: '100%',
      textAlign: 'center',
      borderTop: `1px solid ${colors.border.light}`,
      backgroundColor: colors.background.default,
      borderTopLeftRadius: { xs: '1rem', sm: '1.5rem' },
      borderTopRightRadius: { xs: '1rem', sm: '1.5rem' },
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
    {/* <Button
      variant="text"
      size="small"
      sx={{
        mt: 1,
        fontSize: { xs: '0.75rem', sm: '0.875rem' },
        color: colors.primary,
      }}
    >
      Help
    </Button> */}
  </Box>
);

export default Footer;
