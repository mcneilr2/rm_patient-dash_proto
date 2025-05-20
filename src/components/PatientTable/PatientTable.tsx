import {
  Table, TableHead, TableRow, TableCell, TableBody,
  TableSortLabel, Select, MenuItem, Box, Button, Stack, TextField
} from '@mui/material';
import { Add, Upload } from '@mui/icons-material';
import { useState } from 'react';
import type { Patient, Status } from '../../types/Patient';

interface Props {
  patients: Patient[];
  searchQuery?: string;
  onAddPatient?: (newPatient: Patient) => void;
}


// Helper to split full name
const splitName = (full: string) => {
  const parts = full.trim().split(/\s+/);
  return {
    first: parts[0] || '',
    middle: parts.slice(1, -1).join(' ') || '',
    last: parts.length > 1 ? parts[parts.length - 1] : ''
  };
};

const nameKeys = ['first', 'middle', 'last'] as const;
type NameKey = typeof nameKeys[number];

const PatientTable = ({ patients, searchQuery = '', onAddPatient }: Props) => {
  const [sortBy, setSortBy] = useState<'dob' | 'status' | 'address' | NameKey>('first');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const [filters, setFilters] = useState({
    first: '',
    middle: '',
    last: '',
    dob: '',
    status: '',
    address: ''
  });

  const [adding, setAdding] = useState(false);
  const [newPatient, setNewPatient] = useState<{
    name: string;
    dob: string;
    status: Status;
    address: string;
  }>({
    name: '',
    dob: '',
    status: 'Inquiry',
    address: ''
  });

  const handleSort = (field: typeof sortBy) => {
    setSortBy(field);
    setSortDirection(prev =>
      sortBy === field ? (prev === 'asc' ? 'desc' : 'asc') : 'asc'
    );
  };

  const handleFilterChange = (field: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

const filtered = patients.filter(p => {
  const { first, middle, last } = splitName(p.name);
  const matchesFilters =
    (!filters.first || first === filters.first) &&
    (!filters.middle || middle === filters.middle) &&
    (!filters.last || last === filters.last) &&
    (!filters.dob || p.dob.includes(filters.dob)) &&
    (!filters.status || p.status === filters.status) &&
    (!filters.address || p.address.includes(filters.address));

  const searchMatch = !searchQuery?.trim() || [
    first,
    middle,
    last,
    p.dob,
    p.status,
    p.address,
  ]
    .join(' ')
    .toLowerCase()
    .includes(searchQuery.toLowerCase());

  return matchesFilters && searchMatch;
});

  const sorted = [...filtered].sort((a, b) => {
    const aName = splitName(a.name);
    const bName = splitName(b.name);

    let aVal: string;
    let bVal: string;

    if (nameKeys.includes(sortBy as NameKey)) {
      aVal = aName[sortBy as NameKey];
      bVal = bName[sortBy as NameKey];
    } else {
      aVal = (a as any)[sortBy];
      bVal = (b as any)[sortBy];
    }

    return sortDirection === 'asc'
      ? `${aVal}`.localeCompare(`${bVal}`)
      : `${bVal}`.localeCompare(`${aVal}`);
  });

  const getUniqueNameValues = (key: NameKey): string[] =>
    [...new Set(patients.map(p => splitName(p.name)[key]))].filter(Boolean);

  const getUniqueFieldValues = (
    field: Exclude<keyof typeof filters, NameKey>
  ): string[] =>
    [...new Set(patients.map(p => p[field]))].filter(Boolean);

  const handleNewPatientChange = (field: keyof typeof newPatient, value: string) => {
    setNewPatient(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitNewPatient = () => {
    if (!newPatient.name || !newPatient.dob || !newPatient.status || !newPatient.address) {
      alert("All fields are required.");
      return;
    }

    const newEntry: Patient = {
      id: `${Date.now()}`,
      name: newPatient.name,
      dob: newPatient.dob,
      status: newPatient.status,
      address: newPatient.address
    };

    if (onAddPatient) onAddPatient(newEntry);
    setNewPatient({ name: '', dob: '', status: 'Inquiry', address: '' });
    setAdding(false);
  };

  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            {nameKeys.map((key) => (
              <TableCell key={key}>
                <TableSortLabel
                  active={sortBy === key}
                  direction={sortBy === key ? sortDirection : 'asc'}
                  onClick={() => handleSort(key)}
                >
                  {key.toUpperCase()}
                </TableSortLabel>
                <Select
                  size="small"
                  value={filters[key]}
                  displayEmpty
                  onChange={(e) => handleFilterChange(key, e.target.value)}
                  sx={{ mt: 1, width: '100%' }}
                >
                  <MenuItem value="">All</MenuItem>
                  {getUniqueNameValues(key).map((val) => (
                    <MenuItem key={val} value={val}>
                      {val}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
            ))}

            {(['dob', 'status', 'address'] as const).map((field) => (
              <TableCell key={field}>
                <TableSortLabel
                  active={sortBy === field}
                  direction={sortBy === field ? sortDirection : 'asc'}
                  onClick={() => handleSort(field)}
                >
                  {field.toUpperCase()}
                </TableSortLabel>
                <Select
                  size="small"
                  value={filters[field]}
                  displayEmpty
                  onChange={(e) => handleFilterChange(field, e.target.value)}
                  sx={{ mt: 1, width: '100%' }}
                >
                  <MenuItem value="">All</MenuItem>
                  {getUniqueFieldValues(field).map((val) => (
                    <MenuItem key={val} value={val}>
                      {val}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {sorted.map((p) => {
            const { first, middle, last } = splitName(p.name);
            return (
              <TableRow key={p.id}>
                <TableCell>{first}</TableCell>
                <TableCell>{middle}</TableCell>
                <TableCell>{last}</TableCell>
                <TableCell>{p.dob}</TableCell>
                <TableCell>{p.status}</TableCell>
                <TableCell>{p.address}</TableCell>
              </TableRow>
            );
          })}

          {adding && (
            <TableRow>
              <TableCell colSpan={3}>
                <TextField
                  placeholder="Full Name"
                  size="small"
                  fullWidth
                  value={newPatient.name}
                  onChange={(e) => handleNewPatientChange('name', e.target.value)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="date"
                  size="small"
                  value={newPatient.dob}
                  onChange={(e) => handleNewPatientChange('dob', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </TableCell>
              <TableCell>
                <Select
                  size="small"
                  value={newPatient.status}
                  onChange={(e) =>
                    handleNewPatientChange('status', e.target.value as Status)
                  }
                >
                  {['Inquiry', 'Onboarding', 'Active', 'Churned'].map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <TextField
                    placeholder="Address"
                    size="small"
                    fullWidth
                    value={newPatient.address}
                    onChange={(e) =>
                      handleNewPatientChange('address', e.target.value)
                    }
                  />
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleSubmitNewPatient}
                    sx={{ minWidth: '40px', px: 1 }}
                  >
                    <Upload />
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => setAdding(true)}
          sx={{ borderRadius: '12px', px: 4, py: 1 }}
        >
          Add Patient
        </Button>
      </Box>
    </Box>
  );
};

export default PatientTable;
