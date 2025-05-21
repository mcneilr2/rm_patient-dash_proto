import { Box, TextField } from '@mui/material';

interface SearchFieldProps {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
}

const SearchField = ({
  value,
  onChange,
  placeholder = 'Search by first name, last name, date of birth ...'
}: SearchFieldProps) => {
  return (
    <Box sx={{ mb: 2, width: '100%' }}>
      <TextField
        fullWidth
        size="small"
        variant="outlined"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{
          backgroundColor: '#fffdfa',
          borderRadius: 1.25, // 10px
          '& .MuiOutlinedInput-root': {
            borderRadius: 1.25,
            '& fieldset': {
              borderColor: '#f1f1ef', // beige border
              borderWidth: '2px'
            },
            '&:hover fieldset': {
              borderColor: '#f1f1ef'
            },
            '&.Mui-focused fieldset': {
              borderColor: '#f5c242' // soft yellow on focus
            }
          }
        }}
      />
    </Box>
  );
};

export default SearchField;
