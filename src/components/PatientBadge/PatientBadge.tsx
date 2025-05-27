// A PatientBadge component that displays a  patients status with a colored badge.
// The badge color changes based on the patient's status.
// yellow for Inquiry, orange for Onboarding, green for Active, and red for Churned.
import { Box, Typography } from '@mui/material';
import { colors } from '../../styles/colors';     

interface Props {
  status: 'Inquiry' | 'Onboarding' | 'Active' | 'Churned';
}

const statusColors: Record<string, string> = {
    default: colors.badges.default,
    Inquiry: colors.badges.yellow,
    Onboarding: colors.badges.orange,
    Active: colors.badges.green,
    Churned: colors.badges.red,
};

const PatientBadge = ({ status }: Props) => {
  const badgeColor = statusColors[status] || colors.badges.default;

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 8px',
        borderRadius: '12px',
        backgroundColor: badgeColor,
        width: '100%'
      }}
    >
      <Typography variant="body2" sx={{ color: colors.text.light, fontWeight: 'bold', textTransform: 'capitalize'
       }}>
        {status}
      </Typography>
    </Box>
  );
}

export default PatientBadge;