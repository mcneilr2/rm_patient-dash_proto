import { Box } from '@mui/material';
import type { BoxProps } from '@mui/material';


// Define a responsive container component to apply consistent padding and max-width
// Pass in the content as "children",
// Allow additional styles via "sx" prop,
// and spread any other props common to MUI Box
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
