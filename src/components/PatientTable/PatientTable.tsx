import {
  Table, TableHead, TableRow, TableCell, TableBody,
  TableSortLabel, Select, MenuItem, Box, Button, Stack, TextField
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useState } from 'react';
import type { Patient, Status } from '../../types/Patient';

interface Props {
  patients: Patient[];
  searchQuery?: string;
  onAddPatient?: (newPatient: Omit<Patient, 'id'>) => void;
}

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
  const [statusFilter, setStatusFilter] = useState('');
  const [adding, setAdding] = useState(false);

  const [newPatient, setNewPatient] = useState({
    name: '',
    dob: '',
    status: 'Inquiry' as Status,
    address: ''
  });

  const handleSort = (field: typeof sortBy) => {
    setSortBy(field);
    setSortDirection(prev =>
      sortBy === field ? (prev === 'asc' ? 'desc' : 'asc') : 'asc'
    );
  };

  const normalizedQuery = (searchQuery || '').trim().toLowerCase();

  const filtered = patients.filter(p => {
    const { first, middle, last } = splitName(p.name);
    const matchesStatus = !statusFilter || p.status === statusFilter;
    const searchMatch = !normalizedQuery || [
      first,
      middle,
      last,
      p.dob,
      p.status,
      p.address,
    ]
      .join(' ')
      .toLowerCase()
      .includes(normalizedQuery);

    return matchesStatus && searchMatch;
  });

  const sorted = [...filtered].sort((a, b) => {
    const aName = splitName(a.name);
    const bName = splitName(b.name);

    let aVal: any;
    let bVal: any;

    if (sortBy === 'dob') {
      aVal = new Date(a.dob).getTime();
      bVal = new Date(b.dob).getTime();
    } else if (nameKeys.includes(sortBy as NameKey)) {
      aVal = aName[sortBy as NameKey];
      bVal = bName[sortBy as NameKey];
    } else {
      aVal = (a as any)[sortBy];
      bVal = (b as any)[sortBy];
    }

    return sortDirection === 'asc'
      ? aVal - bVal || `${aVal}`.localeCompare(`${bVal}`)
      : bVal - aVal || `${bVal}`.localeCompare(`${aVal}`);
  });

  const getUniqueStatusValues = (): string[] =>
    [...new Set(patients.map(p => p.status))].filter(Boolean);

  const handleNewPatientChange = (field: keyof typeof newPatient, value: string) => {
    setNewPatient(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitNewPatient = async () => {
    if (!newPatient.name || !newPatient.dob || !newPatient.status || !newPatient.address) {
      alert("All fields are required.");
      return;
    }

    const payload = {
      name: newPatient.name,
      dob: newPatient.dob,
      status: newPatient.status,
      address: newPatient.address,
    };

    try {
      if (onAddPatient) await onAddPatient(payload);
      setNewPatient({ name: '', dob: '', status: 'Inquiry', address: '' });
      setAdding(false);
    } catch (err) {
      alert('Failed to add patient.');
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => setAdding(true)}
          sx={{ borderRadius: '12px', px: 1, py: 1 }}
        >
          Add Patient
        </Button>
      </Box>

      {adding && (
        <Box
          sx={{
            mb: 3,
            p: 2,
            border: '2px solid #f1f1ef',
            borderRadius: 2,
            backgroundColor: '#fffdfa'
          }}
        >
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} flexWrap="wrap">
            <TextField
              placeholder="Full Name"
              size="small"
              value={newPatient.name}
              onChange={(e) => handleNewPatientChange('name', e.target.value)}
              sx={{ flex: 1, minWidth: '200px' }}
            />
            <TextField
              type="date"
              size="small"
              value={newPatient.dob}
              onChange={(e) => handleNewPatientChange('dob', e.target.value)}
              sx={{ flex: 1, minWidth: '150px' }}
            />
            <Select
              size="small"
              value={newPatient.status}
              onChange={(e) => handleNewPatientChange('status', e.target.value as Status)}
              sx={{ flex: 1, minWidth: '150px' }}
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
              sx={{ flex: 2, minWidth: '250px' }}
            />
            <Button
              variant="contained"
              color="success"
              onClick={handleSubmitNewPatient}
              sx={{ whiteSpace: 'nowrap' }}
            >
              Save Patient
            </Button>
          </Stack>
        </Box>
      )}

      <Box sx={{ maxHeight: 500, overflowY: 'auto', borderRadius: '12px' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {[...nameKeys, 'dob', 'status', 'address'].map((field) => (
                <TableCell key={field}>
                  <Box display="flex" alignItems="center" gap={1} width="100%">
                    {field === 'status' ? (
                      <>
                        <Select
                          size="small"
                          value={statusFilter}
                          displayEmpty
                          onChange={(e) => setStatusFilter(e.target.value)}
                          sx={{ flex: 1 }}
                          renderValue={(selected) => selected || 'Status'}
                        >
                          {getUniqueStatusValues().map((val) => (
                            <MenuItem key={val} value={val}>
                              {val}
                            </MenuItem>
                          ))}
                        </Select>
                        <TableSortLabel
                          active={sortBy === 'status'}
                          direction={sortBy === 'status' ? sortDirection : 'asc'}
                          onClick={() => handleSort('status')}
                          sx={{
                            '& .MuiTableSortLabel-icon': {
                              opacity: 1,
                              color: sortBy === 'status' ? 'grey.800' : 'grey.400'
                            }
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <TableSortLabel
                          active={sortBy === field}
                          direction={sortBy === field ? sortDirection : 'asc'}
                          onClick={() => handleSort(field as typeof sortBy)}
                          sx={{
                            '& .MuiTableSortLabel-icon': {
                              opacity: 1,
                              color: sortBy === field ? 'grey.800' : 'grey.400'
                            }
                          }}
                        >
                          {field.toUpperCase()}
                        </TableSortLabel>
                        {sortBy === field && !['dob', 'address'].includes(field) && (
                          <Box component="span" fontSize="0.75rem" color="text.secondary">
                            {sortDirection === 'asc' ? 'A to z' : 'z to A'}
                          </Box>
                        )}
                      </>
                    )}
                  </Box>
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
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default PatientTable;
