import * as functions from 'firebase-functions'; // ✅ v1
import * as admin from 'firebase-admin';
import cors from 'cors';

admin.initializeApp();
const db = admin.firestore();
const corsHandler = cors({ origin: true });

// ✅ GET /api/patients
export const getPatients = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      const snapshot = await db.collection('patients').get();
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      res.status(200).json(data); // ✅ Explicit 200 OK
    } catch (error) {
      if (error instanceof Error) {
        console.error("🔥 Firestore fetch error:", error);
        res.status(500).json({ error: error.message });
      } else {
        console.error("🔥 Unknown error:", error);
        res.status(500).json({ error: "Unknown error" });
      }
    }
  });
});

// ✅ POST /api/addPatient
export const addPatient = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== 'POST') {
      res.set('Allow', 'POST');
      return res.status(405).json({ error: 'Method not allowed. Use POST.' });
    }

    const { name, dob, status, address } = req.body;

    // ✅ 400 — Missing fields
    if (!name || !dob || !status || !address) {
      return res.status(400).json({
        error: 'Missing required fields: name, dob, status, and address are all required.'
      });
    }

    // ✅ 422 — Invalid status
    const allowedStatuses = ['Inquiry', 'Onboarding', 'Active', 'Churned'];
    if (!allowedStatuses.includes(status)) {
      return res.status(422).json({
        error: `Invalid status. Must be one of: ${allowedStatuses.join(', ')}`
      });
    }

    try {
      const newDoc = await db.collection('patients').add({ name, dob, status, address });

      // ✅ 201 Created
      return res.status(201).json({
        id: newDoc.id,
        name,
        dob,
        status,
        address
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error("🔥 Firestore add error:", error);
        return res.status(500).json({ error: error.message });
      } else {
        console.error("🔥 Unknown error:", error);
        return res.status(500).json({ error: "Unknown error" });
      }
    }
  });
});
