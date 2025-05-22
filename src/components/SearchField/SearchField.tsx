import { Box, TextField } from '@mui/material';

interface SearchFieldProps {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
}

const SearchField = ({
  value,
  onChange,
  placeholder = 'Search by name, DOB, status, etc.',
}: SearchFieldProps) => {
  return (
    <Box sx={{ mb: { xs: 2, sm: 3 }, width: '100%' }}>
      <TextField
        fullWidth
        size="small"
        variant="outlined"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{
          input: {
            fontSize: { xs: '0.85rem', sm: '1rem' },
          },
        }}
      />
    </Box>
  );
};

export default SearchField;
