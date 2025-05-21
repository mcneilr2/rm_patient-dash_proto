// src/pages/Dashboard/Dashboard.tsx
import { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import type { Patient } from '../../types/Patient';
import { fetchPatients } from '../../services/patients';
import type { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import PatientTable from '../../components/PatientTable/PatientTable';

export const Dashboard = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    if (loading) return;
    setLoading(true);
    const { patients: newPatients, lastVisible } = await fetchPatients(lastDoc);
    setPatients((prev: Patient[]) => [...prev, ...newPatients]);
    setLastDoc(lastVisible);
    setHasMore(newPatients.length === 10);
    setLoading(false);
  };

  useEffect(() => {
    loadMore();
  }, []);

  return (
    <Box>
      <PatientTable patients={patients} />
      {hasMore && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Button onClick={loadMore} disabled={loading}>
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        </Box>
      )}
    </Box>
  );
};