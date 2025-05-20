import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
// import * as fs from 'fs';

const serviceAccount = require('./serviceAccountKey.json');
const patients = require('./mock_patients.json');

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

async function importData() {
  const batch = db.batch();
  for (const patient of patients) {
    const docRef = db.collection('patients').doc(); // Auto-generated ID
    batch.set(docRef, patient);
  }

  await batch.commit();
  console.log(`${patients.length} patient records imported to Firestore.`);
}

importData();
