import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import type { Patient } from '../../types/Patient';

interface Props {
  patients: Patient[];
}

const extractFirstAndLast = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0];
  return `${parts[0]} ${parts[parts.length - 1]}`;
};

const PatientTable = ({ patients }: Props) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>DOB</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Address</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {patients.map((p) => (
        <TableRow key={p.id}>
          <TableCell>{extractFirstAndLast(p.name)}</TableCell>
          <TableCell>{p.dob}</TableCell>
          <TableCell>{p.status}</TableCell>
          <TableCell>{p.address}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default PatientTable;
