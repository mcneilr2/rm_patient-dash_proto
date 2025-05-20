// src/components/FilterControls/FilterControls.tsx

import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { PatientStatuses } from '../../types/Patient';

interface Props {
  value: string;
  onChange: (newVal: string) => void;
}

const FilterControls = ({ value, onChange }: Props) => (
  <FormControl fullWidth sx={{ my: 2 }}>
    <InputLabel>Status Filter</InputLabel>
    <Select
      value={value}
      label="Status Filter"
      onChange={(e) => onChange(e.target.value)}
    >
      <MenuItem value="All">All</MenuItem>
      {PatientStatuses.map((status) => (
        <MenuItem key={status} value={status}>
          {status}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default FilterControls;
