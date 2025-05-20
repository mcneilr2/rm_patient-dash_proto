import { Box, TextField } from '@mui/material';

interface SearchFieldProps {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
}

const SearchField = ({ value, onChange, placeholder = 'Search by first name, last name, date of birth ...' }: SearchFieldProps) => {
  return (
    <Box sx={{ mb: 2, width: '100%' }}>
      <TextField
        fullWidth
        size="small"
        variant="outlined"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Box>
  );
};

export default SearchField;

