import { TextField, Box } from '@mui/material';

interface SearchFieldProps {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
}

const SearchField = ({ value, onChange, placeholder = "Search..." }: SearchFieldProps) => {
  return (
    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
      <TextField
        size="small"
        variant="outlined"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{ width: 300 }}
      />
    </Box>
  );
};

export default SearchField;
