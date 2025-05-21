import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { colors } from '../../styles/colors'; // adjust the path if needed

interface Props {
  onToggleHide: () => void;
  isHidden: boolean;
}

const NavBar = ({ onToggleHide, isHidden }: Props) => (
  <Box
    sx={{
      border: `2px solid ${colors.background.tableHeader}`,
      background: colors.gradient.navbar,
      borderRadius: 2, // ~16px
      m: 2,
      overflow: 'hidden',
      backgroundColor: colors.primary,
      boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
    }}
  >
    <AppBar
      position="static"
      elevation={0}
      color="transparent"
      sx={{ backgroundColor: 'transparent' }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo + Title */}
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
          <Typography variant="h6" component="div" sx={{ color: '#fffdfa' }}>
            Patient Dashboard
          </Typography>
        </Box>

        {/* Quick Hide Button */}
        <Button
          variant="contained"
          onClick={onToggleHide}
          sx={{
            backgroundColor: colors.background.tableHeader,
            color: colors.primary,
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 2,
            '&:hover': {
              backgroundColor: colors.background.tableHeader,
              opacity: 0.9,
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
