import * as functions from 'firebase-functions'; // ✅ v1
import * as admin from 'firebase-admin';
import cors from 'cors';

admin.initializeApp();
const db = admin.firestore();
const corsHandler = cors({ origin: true });

export const getPatients = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      const snapshot = await db.collection('patients').get();
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      res.json(data);
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