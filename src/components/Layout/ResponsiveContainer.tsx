import { Box } from '@mui/material';
import type { BoxProps } from '@mui/material';

const ResponsiveContainer = ({ children, ...props }: BoxProps) => (
  <Box
    sx={{
      width: '100%',
      maxWidth: '1280px',
      mx: 'auto',
      px: { xs: 1, sm: 2 },
      py: { xs: 2, sm: 3 },
      ...props.sx,
    }}
    {...props}
  >
    {children}
  </Box>
);

export default ResponsiveContainer;
