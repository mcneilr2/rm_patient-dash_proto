import { fetchPatients } from '../../services/patients';
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';

const [patients, setPatients] = useState<Patient[]>([]);
const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
const [loading, setLoading] = useState(false);
const [hasMore, setHasMore] = useState(true);

useEffect(() => {
  loadMore(); // fetch first page
}, []);

const loadMore = async () => {
  if (loading) return;
  setLoading(true);
  const { patients: newPatients, lastVisible } = await fetchPatients(lastDoc);
  setPatients((prev) => [...prev, ...newPatients]);
  setLastDoc(lastVisible);
  setHasMore(newPatients.length === 10);
  setLoading(false);
};
