import { Box, Typography } from '@mui/material';
import { colors } from '../../styles/colors';

const Footer = () => (
  <Box
    component="footer"
    sx={{
      mt: 4,
      py: 3,
      px: 2,
      textAlign: 'center',
      borderTop: `0.25rem solid ${colors.border.light}`,
      background: 'transparent',
      width: '100%'
    }}
  >
    <Typography variant="body2" color="text.secondary" >
      © 2025 Your IP Rights
    </Typography>
  </Box>
);

export default Footer;
