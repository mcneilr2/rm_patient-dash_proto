import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  DocumentData,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { db } from '../firebase';
import { Patient } from '../types/Patient';

const PAGE_SIZE = 10;

export async function fetchPatients(
  lastDoc?: QueryDocumentSnapshot<DocumentData>
): Promise<{ patients: Patient[]; lastVisible: QueryDocumentSnapshot | null }> {
  const patientQuery = query(
    collection(db, 'patients'),
    orderBy('name'),
    limit(PAGE_SIZE),
    ...(lastDoc ? [startAfter(lastDoc)] : [])
  );

  const snapshot = await getDocs(patientQuery);
  const patients = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Patient[];
  const lastVisible = snapshot.docs[snapshot.docs.length - 1] || null;

  return { patients, lastVisible };
}
