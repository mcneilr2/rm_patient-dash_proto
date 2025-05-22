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
          px: { xs: '0.5rem', sm: '0.75rem' },
          py: { xs: '0.5rem', sm: '1.5rem' },
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Box
            component="img"
            src={`https://placehold.co/600x400/${colors.grey.select.slice(1)}/${colors.secondary.slice(1)}?font=poppins&text=Logo`}
            alt="Company Logo"
            sx={{
              width: '3rem',
              height: '3rem',
              objectFit: 'cover',
              borderRadius: '50%',
            }}
          />
          <Typography
            variant="h3"
            sx={{
              color: colors.text.light,
              paddingLeft: { xs: '0.5rem', sm: '1rem' },
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.25rem' },
              whiteSpace: 'nowrap',
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
            border: `2px solid ${colors.white}`,
            borderRadius: '1.25rem',
            fontWeight: 700,
            textTransform: 'none',
            px: { xs: '0.5rem', sm: '2.5rem' },
            py: { xs: '0.5rem', sm: '2.5rem' },
            fontSize: { xs: '0.75rem', sm: '1.25rem' },
            boxShadow: colors.shadow.light,
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: colors.grey[400],
              color: colors.white,
              boxShadow: colors.shadow.medium,
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
