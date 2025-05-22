import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { colors } from '../../styles/colors';

interface Props {
  onToggleHide: () => void;
  isHidden: boolean;
}

const NavBar = ({ onToggleHide, isHidden }: Props) => (
  <Box
    sx={{
      width: '100%',
      background: colors.gradient.navbar,
      borderBottom: `0.25rem solid ${colors.border.beige}`,
      borderBottomLeftRadius: '1rem',
      borderBottomRightRadius: '1rem'   
    }}
  >
    <AppBar
      position="static"
      elevation={0}
      color="transparent"
      sx={{ backgroundColor: 'transparent' }}
    >
      <Toolbar sx={{ px: 3, py: 1.5, display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <img
            src="https://placehold.co/600x400/EEE/31343C?font=poppins&text=YourLogo"
            alt="Company Logo"
            style={{
              width: 40,
              height: 40,
              objectFit: 'cover',
              borderRadius: '50%',
            }}
          />
          <Typography variant="h3" sx={{ color: colors.text.light, paddingLeft: '1rem' }}>
            Dashboard
          </Typography>
        </Box>
<Button
  onClick={onToggleHide}
  sx={{
    backgroundColor: colors.grey.select,    // soft blue
    color: colors.primary,                  // orange text
    border: '2px solid white',
    borderRadius: '20px',
    fontWeight: 700,
    textTransform: 'none',
    px: 2.5,
    py: 0.75,
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: colors.grey[400],
      color: 'white',
      boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15)',
    },
  }}
>
  {isHidden ? 'Unhide Screen' : 'Quick Hide'}
</Button>

      </Toolbar>
    </AppBar>
  </Box>
);

export default NavBar;
