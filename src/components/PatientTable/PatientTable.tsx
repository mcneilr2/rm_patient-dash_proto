import {
  Box, Button, Stack, TextField, Select, MenuItem,
  Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, Typography
} from '@mui/material';
import { Add, Upload } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import type { Patient, Status } from '../../types/Patient';
import { colors } from '../../styles/colors';
import { addPatient } from '../../services/patients';

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

interface Props {
  patients: Patient[];
  searchQuery?: string;
  onAddPatient?: (newPatient: Omit<Patient, 'id'>) => void;
  hidden?: boolean;
}

const PatientTable = ({ patients, searchQuery = '', onAddPatient, hidden }: Props) => {
  const [sortBy, setSortBy] = useState<'dob' | 'status' | 'address' | NameKey>('first');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [statusFilter, setStatusFilter] = useState('');
  const [adding, setAdding] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: '',
    dob: '',
    status: 'Inquiry' as Status,
    address: ''
  });

  useEffect(() => {
    if (!hidden) {
      setAdding(false);
      setStatusFilter('');
      setSortBy('first');
      setSortDirection('asc');
    }
  }, [hidden]);

  if (hidden) {
    return (
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <Typography variant="h6" color="text.secondary">
          🔒 Screen Hidden
        </Typography>
      </Box>
    );
  }

  const handleSort = (field: typeof sortBy) => {
    setSortBy(field);
    setSortDirection(prev =>
      sortBy === field ? (prev === 'asc' ? 'desc' : 'asc') : 'asc'
    );
  };

  const handleNewPatientChange = (field: keyof typeof newPatient, value: string) => {
    setNewPatient(prev => ({ ...prev, [field]: value }));
  };

const handleUploadClick = async () => {
  console.log("📦 Upload button clicked");

  const { name, dob, status, address } = newPatient;

  if (!name || !dob || !status || !address) {
    alert("All fields are required.");
    return;
  }

  try {
    console.log("📤 Sending patient to API:", newPatient);
    const created = await addPatient({ name, dob, status, address });
    console.log("✅ API responded with:", created);

    await onAddPatient?.(created);
    setNewPatient({ name: '', dob: '', status: 'Inquiry', address: '' });
    setAdding(false);
  } catch (err: any) {
    console.error("❌ Upload failed:", err);
    alert(err?.message || 'Failed to add patient.');
  }
};



  const normalizedQuery = (searchQuery || '').trim().toLowerCase();
  const filtered = patients.filter(p => {
    const { first, middle, last } = splitName(p.name);
    return (!statusFilter || p.status === statusFilter) &&
      (!normalizedQuery || [first, middle, last, p.dob, p.status, p.address].join(' ').toLowerCase().includes(normalizedQuery));
  });

  const sorted = [...filtered].sort((a, b) => {
    const aName = splitName(a.name);
    const bName = splitName(b.name);
    const aVal = nameKeys.includes(sortBy as NameKey) ? aName[sortBy as NameKey] : (a as any)[sortBy];
    const bVal = nameKeys.includes(sortBy as NameKey) ? bName[sortBy as NameKey] : (b as any)[sortBy];
    return sortDirection === 'asc'
      ? aVal.localeCompare(bVal)
      : bVal.localeCompare(aVal);
  });

  const getUniqueStatusValues = () =>
    [...new Set(patients.map(p => p.status))];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, marginBottom: '1rem' }}>
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={() => setAdding(true)}
          sx={{
            border: `2px solid ${colors.border.beige}`,
            color: colors.primary,
            backgroundColor: colors.background.paper,
            borderRadius: 2,
            px: 2,
            py: 1,
            '&:hover': {
              backgroundColor: colors.background.default,
            },
          }}
        >
          Add Patient
        </Button>
      </Box>

      {adding && (
        <Box
          sx={{
            mb: 3,
            p: 2,
            border: `2px solid ${colors.border.beige}`,
            borderRadius: '1rem',
            backgroundColor: colors.background.paper
          }}
        >
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} flexWrap="wrap">
            <TextField
              placeholder="Full Name"
              size="small"
              value={newPatient.name}
              onChange={(e) => handleNewPatientChange('name', e.target.value)}
              sx={{ flex: 1 }}
            />
            <TextField
              type="date"
              size="small"
              value={newPatient.dob}
              onChange={(e) => handleNewPatientChange('dob', e.target.value)}
              sx={{ flex: 1 }}
            />
            <Select
              size="small"
              value={newPatient.status}
              onChange={(e) => handleNewPatientChange('status', e.target.value as Status)}
              sx={{ flex: 1 }}
            >
              {['Inquiry', 'Onboarding', 'Active', 'Churned'].map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
            <TextField
              placeholder="Address"
              size="small"
              value={newPatient.address}
              onChange={(e) => handleNewPatientChange('address', e.target.value)}
              sx={{ flex: 2 }}
            />
          <Button
            variant="contained"
            color="success"
            onClick={handleUploadClick}
            sx={{ minWidth: '40px', px: 1 }}
          >
            <Upload />
          </Button>
          </Stack>
        </Box>
      )}

      <Box
        sx={{
          maxHeight: 500,
          overflowY: 'auto',
          border: `2px solid ${colors.border.beige}`,
          borderRadius: 2,
          backgroundColor: colors.background.default,
        }}
      >
        <Table stickyHeader>
          <TableHead sx={{ backgroundColor: colors.grey.select }}>
            <TableRow>
              {[...nameKeys, 'dob', 'status', 'address'].map((field) => (
                <TableCell key={field}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <TableSortLabel
                      active={sortBy === field}
                      direction={sortBy === field ? sortDirection : 'asc'}
                      onClick={() => handleSort(field as typeof sortBy)}
                      sx={{
                        '& .MuiTableSortLabel-icon': {
                          opacity: 1,
                          color: sortBy === field ? colors.grey[800] : colors.grey[400]
                        }
                      }}
                    >
                      {field.toUpperCase()}
                    </TableSortLabel>
                    {field === 'status' && (
                      <Select
                        size="small"
                        value={statusFilter}
                        displayEmpty
                        onChange={(e) => setStatusFilter(e.target.value)}
                        sx={{ ml: 1 }}
                        renderValue={(selected) => selected || 'Status'}
                      >
                        {getUniqueStatusValues().map((val) => (
                          <MenuItem key={val} value={val}>
                            {val}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sorted.map((p, index) => {
              const { first, middle, last } = splitName(p.name);
              return (
                <TableRow
                  key={p.id}
                  sx={{
                    backgroundColor: index % 2 === 0
                      ? colors.background.paper
                      : colors.background.rowAlternate,
                    borderBottom: `1px solid ${colors.border.light}`,
                    '&:hover': {
                      backgroundColor: colors.background.input,
                    }
                  }}
                >
                  <TableCell>{first}</TableCell>
                  <TableCell>{middle}</TableCell>
                  <TableCell>{last}</TableCell>
                  <TableCell>{p.dob}</TableCell>
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
