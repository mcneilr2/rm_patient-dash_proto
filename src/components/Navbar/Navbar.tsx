import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

interface Props {
  onToggleHide: () => void;
  isHidden: boolean;
}

const NavBar = ({ onToggleHide, isHidden }: Props) => (
  <AppBar position="static" color="primary">
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <img
          src="https://placehold.co/600x400/EEE/31343C?font=poppins&text=YourLogo"
          alt="Company Logo"
            style={{
    width: 40,
    height: 40,
    objectFit: 'cover',
    borderRadius: '50%'
  }}
        />
        <Typography variant="h6" component="div">
          Patient Dashboard
        </Typography>
      </Box>
      <Button color="inherit" onClick={onToggleHide}>
        {isHidden ? 'Unhide Screen' : 'Quick Hide'}
      </Button>
    </Toolbar>
  </AppBar>
);

export default NavBar;
