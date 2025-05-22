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
      borderBottomLeftRadius: { xs: '2rem', md: '3rem' },
      borderBottomRightRadius: { xs: '2rem', md: '3rem' },
    }}
  >
    <AppBar
      position="static"
      elevation={0}
      color="transparent"
      sx={{ backgroundColor: 'transparent' }}
    >
      <Toolbar
        sx={{
          px: { xs: 2, sm: 3 },
          py: { xs: 1, sm: 1.5 },
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <img
            src={`https://placehold.co/600x400/${colors.grey.select.slice(1)}/${colors.secondary.slice(1)}?font=poppins&text=Logo`}
            alt="Company Logo"
            style={{
              width: '3rem',
              height: '3rem',
              objectFit: 'cover',
              borderRadius: '50%',
              border: `0.5rem solid ${colors.grey.select}`,
            }}
          />
          <Typography
            variant="h3"
            sx={{
              color: colors.text.light,
              paddingLeft: { xs: '0.5rem', sm: '1rem' },
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.25rem' },
              whiteSpace: 'nowrap'
            }}
          >
            Dashboard
          </Typography>
        </Box>
        <Button
          onClick={onToggleHide}
          sx={{
            backgroundColor: colors.grey.select,
            color: colors.primary,
            border: '2px solid white',
            borderRadius: '20px',
            fontWeight: 700,
            textTransform: 'none',
            px: { xs: 1.5, sm: 2.5 },
            py: { xs: 0.5, sm: 0.75 },
            fontSize: { xs: '0.75rem', sm: '0.9rem' },
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
