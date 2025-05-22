import { Box } from '@mui/material';
import type { BoxProps } from '@mui/material';

const ResponsiveContainer = ({ children, sx = {}, ...rest }: BoxProps) => (
  <Box
    sx={{
      width: '100%',
      maxWidth: '75rem', // converted from 1200px to rem
      px: { xs: 1.5, sm: 2, md: 3 },
      ...sx,
    }}
    {...rest}
  >
    {children}
  </Box>
);

export default ResponsiveContainer;
