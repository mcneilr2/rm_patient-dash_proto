import PatientTable from '../../components/PatientTable/PatientTable';
import type { Patient } from '../../types/Patient';

interface Props {
  patients: Patient[];
  hidden: boolean;
  onAddPatient: (data: Omit<Patient, 'id'>) => void;
}

const Dashboard = ({ patients, hidden, onAddPatient }: Props) => {
  if (hidden) return null;

  return <PatientTable patients={patients} onAddPatient={onAddPatient} />;
};

export default Dashboard;
