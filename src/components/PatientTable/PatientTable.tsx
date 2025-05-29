// MUI Imports
import {
  Box, Button, Stack, TextField, Select, MenuItem,
  Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, Typography
} from '@mui/material';
import { Add, Upload, Cancel } from '@mui/icons-material';
import { useEffect, useState } from 'react';

// Local Imports
import SearchField from '../SearchField/SearchField';
import { addPatient } from '../../services/patients';
import { colors } from '../../styles/colors';
import { statusOptions } from '../../types/Patient';
import type { Patient, Status, SortableKey } from '../../types/Patient';

// Utility: split full name into fields
const splitName = (full: string) => {
  const parts = full.trim().split(/\s+/);
  return {
    first: parts[0] || '',
    middle: parts.slice(1, -1).join(' ') || '',
    last: parts.length > 1 ? parts[parts.length - 1] : ''
  };
};

// Pass in our patients array,
// an optional hidden prop to control visibility,
// and an optional reloadPatients function to refresh the patient list
interface Props {
  patients: Patient[];
  hidden?: boolean;
  reloadPatients?: () => void;
}

const PatientTable = ({ patients, hidden, reloadPatients }: Props) => {
  // Set appropriate default states for sorting, filtering, searching, and adding new patients
  const [sortBy, setSortBy] = useState<SortableKey>('first');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [statusFilter, setStatusFilter] = useState('');
  const [adding, setAdding] = useState(false);
  const [search, setSearch] = useState('');
  const [newPatient, setNewPatient] = useState({
    name: '',
    dob: '',
    status: 'Inquiry' as Status,
    address: ''
  });

  // Reset states when the hidden prop changes
  // This ensures that when the table is shown again, it starts fresh
  useEffect(() => {
    if (!hidden) {
      setAdding(false);
      setStatusFilter('');
      setSearch('');
      setSortBy('first');
      setSortDirection('asc');
    }
  }, [hidden]);


  // Handle a click to the sort label, passing in the field to sort by
  // Perform type-check that the field is a valid SortableKey
  const handleSort = (field: SortableKey) => {
    // Set the sortBy state to the clicked field
    setSortBy(field);
    
    // Toggle the sort direction if the same field is clicked again
    // Otherwise, reset to ascending order for the new field
    setSortDirection(prev =>
      sortBy === field ? (prev === 'asc' ? 'desc' : 'asc') : 'asc'
    );
  };

  // Handle edits to the form fields, passing in the field name and value
  const handleNewPatientChange = (field: keyof typeof newPatient, value: string) => {
    // Update the newPatient state with the new value for the specified field
    setNewPatient(prev => ({ ...prev, [field]: value }));
  };

  // Handle the upload button click with an async function to wait for the addPatient service call
  const handleUploadClick = async () => {
    // Validate that all required fields are filled out
    const { name, dob, status, address } = newPatient;
    if (!name || !dob || !status || !address) {
      alert("All fields are required.");
      return;
    }

    // Use a try-catch block to handle any errors during the patient addition.
    try {
      // Call the addPatient service with the new patient data
      // This function should return a promise, so we await it
      await addPatient({ name, dob, status, address });
      // If successful, reload the patient list if a reload function is provided
      reloadPatients?.();
      // Reset the newPatient state to defaults
      setNewPatient({ name: '', dob: '', status: 'Inquiry', address: '' });
      // Close the adding form
      setAdding(false);
    } catch (err: any) {
      // If an error occurs, alert the user with the error message
      alert(err?.message || 'Failed to add patient.');
    }
  };

  // Parse any search input for search values
  const normalizedQuery = search.trim().toLowerCase();
  // Filter the patients based on the search query and status filter
  // We use the splitName utility to handle names correctly
  // The filter checks if the patient's name, dob, status, or address includes the search query
  // and if the status matches the selected filter
  const filtered = patients.filter(p => {
    const { first, middle, last } = splitName(p.name);
    return (!statusFilter || p.status === statusFilter) &&
      (!normalizedQuery || [first, middle, last, p.dob, p.status, p.address].join(' ').toLowerCase().includes(normalizedQuery));
  });

  // Sort the filtered patients based on the selected sort field and direction
  // We use the splitName utility to handle names correctly
  // The sort function compares the values of the specified field in ascending or descending order
  const sorted = [...filtered].sort((a, b) => {
    const aName = splitName(a.name);
    const bName = splitName(b.name);
    const aVal = aName[sortBy as keyof typeof aName] ?? (a as any)[sortBy];
    const bVal = bName[sortBy as keyof typeof bName] ?? (b as any)[sortBy];
    return sortDirection === 'asc'
      ? aVal.localeCompare(bVal)
      : bVal.localeCompare(aVal);
  });

  // Get unique status values from the patients array for the status filter dropdown
  const getUniqueStatusValues = () => [...new Set(patients.map(p => p.status))];
  
  // If the hidden prop is true, we return a message indicating the screen is hidden
  if (hidden) {
    return (
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <Typography variant="h6" color="text.secondary">🔒 Screen Hidden</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <SearchField value={search} onChange={setSearch} />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={() => setAdding(true)}
          sx={{
            border: `2px solid ${colors.border.beige}`,
            color: colors.primary,
            backgroundColor: colors.grey.select,
            borderRadius: 2,
            px: 2,
            py: 1,
            '&:hover': { backgroundColor: colors.background.default },
          }}
        >
          Add Patient
        </Button>
      </Box>

      {adding && (
        <Box sx={{
          mb: 3,
          p: 2,
          border: `2px solid ${colors.border.beige}`,
          borderRadius: '1rem',
          backgroundColor: colors.background.paper
        }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} flexWrap="wrap">
            <TextField placeholder="Full Name" size="small" value={newPatient.name}
              onChange={(e) => handleNewPatientChange('name', e.target.value)} sx={{ flex: 1 }} />
            <TextField type="date" size="small" value={newPatient.dob}
              onChange={(e) => handleNewPatientChange('dob', e.target.value)} sx={{ flex: 1 }} />
            <Select size="small" value={newPatient.status}
              onChange={(e) => handleNewPatientChange('status', e.target.value as Status)} sx={{ flex: 1 }}>
              {statusOptions.map((status) => (
                <MenuItem key={status} value={status}>{status}</MenuItem>
              ))}
            </Select>
            <TextField placeholder="Address" size="small" value={newPatient.address}
              onChange={(e) => handleNewPatientChange('address', e.target.value)} sx={{ flex: 2 }} />
            <Button variant="contained" color="success" onClick={handleUploadClick}
              sx={{ minWidth: '2.5rem', px: 1 }}><Upload /></Button>
            <Button variant="contained" color="error" onClick={() => setAdding(false)}
              sx={{ minWidth: '2.5rem', px: 1 }}><Cancel /></Button>
          </Stack>
        </Box>
      )}

      <Box sx={{
        maxHeight: '31.25rem',
        overflowX: 'auto',
        overflowY: 'auto',
        border: `2px solid ${colors.border.beige}`,
        borderRadius: '1rem',
        backgroundColor: colors.background.paper,
        paddingRight: '0.5rem',
        boxSizing: 'border-box',
      }}>
        <Table stickyHeader>
          <TableHead sx={{
                backgroundColor: colors.background.paper,
                zIndex: 1,
                position: 'sticky',
                top: 0,
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}
          >
            <TableRow>
              {['first', 'middle', 'last', 'dob', 'status', 'address'].map((field) => (
                <TableCell key={field} sx={{ whiteSpace: 'nowrap', width: '20%' }}>
                  {field === 'status' ? (
                    <Box display="flex" alignItems="center" gap={1}>
                      <Select size="small" value={statusFilter} displayEmpty
                        onChange={(e) => setStatusFilter(e.target.value)}
                        renderValue={(selected) => selected || 'Any Status'}
                        sx={{
                          fontSize: '0.875rem',
                          minWidth: '8rem',
                          height: '2.25rem',
                          backgroundColor: colors.grey.select,
                          borderRadius: '0.5rem',
                          '& fieldset': { border: `1px solid ${colors.border.beige}` }
                        }}
                      >
                        <MenuItem value="">Any Status</MenuItem>
                        {getUniqueStatusValues().map(val => (
                          <MenuItem key={val} value={val}>{val}</MenuItem>
                        ))}
                      </Select>
                      <TableSortLabel
                        active={sortBy === field}
                        direction={sortBy === field ? sortDirection : 'asc'}
                        onClick={() => handleSort(field as SortableKey)}
                        sx={{ '& .MuiTableSortLabel-icon': { opacity: 1 } }}
                      />
                    </Box>
                  ) : (
                    <TableSortLabel
                      active={sortBy === field}
                      direction={sortBy === field ? sortDirection : 'asc'}
                      onClick={() => handleSort(field as SortableKey)}
                      sx={{ '& .MuiTableSortLabel-icon': { opacity: 1 } }}
                    >
                      {field.toUpperCase()}
                    </TableSortLabel>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sorted.map((p, i) => {
              const { first, middle, last } = splitName(p.name);
              return (
                <TableRow key={p.id} sx={{
                  backgroundColor: i % 2 === 0 ? colors.background.paper : colors.background.rowAlternate,
                  '&:hover': { backgroundColor: colors.background.input }
                }}>
                  <TableCell>{first}</TableCell>
                  <TableCell>{middle}</TableCell>
                  <TableCell>{last}</TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap', overflowX: 'auto' }}>
                    <Box component="span" sx={{ display: 'inline-block', minWidth: 'max-content' }}>
                      {p.dob}
                    </Box>
                  </TableCell>
                  <TableCell>{p.status}</TableCell>
                  <TableCell>{p.address}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default PatientTable;
