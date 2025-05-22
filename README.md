# 🩺 Patient Dashboard – Finni Interview Project

This project was developed **exclusively for interview review by the team at Finni**.
It demonstrates a clean, responsive UI with mock data and Firebase emulator integration.

> **Note:** No real patient information is used. All data is randomly generated and non-sensitive.

---

## 🚀 Features

- 🔍 Searchable, sortable patient table (first, last, DOB, address)
- 📅 DOB column scrollable for clarity
- 📱 Fully responsive from 280px → 1280px+
- 🧪 Local Firebase Emulator Suite support
- ☁️ Deployable to Firebase Hosting
- ♻️ Reusable layout and responsive container system

---

## 🛠 Tech Stack

- **Frontend**: React + TypeScript + Vite
- **UI**: MUI (Material UI)
- **Backend**: Firebase Cloud Functions (emulated)
- **Hosting**: Firebase Hosting
- **Dev Tools**: ESLint, Firebase Emulator Suite

---

## 📦 Installation (from scratch)

```bash
# 1. Clone the repo
git clone https://github.com/your-username/patient-dashboard.git
cd patient-dashboard

# 2. Install dependencies
npm install

# 3. Install Firebase CLI if not already
npm install -g firebase-tools

# 4. Log into Firebase
firebase login

# 5. Connect to a Firebase project (optional for emulators)
firebase use --add

# 6. Install function dependencies
cd functions
npm install
cd ..
```

## 🔬 Firebase Emulator (Local Testing)

### 🔁 Emulator Usage Details

When you run the app with Firebase emulators:

1. Launch with:

   ```bash
   firebase emulators:start
   ```

2. Open the app in your browser:

   - App: [http://localhost:5000](http://localhost:5000)
   - Emulator UI: [http://localhost:4000](http://localhost:4000)

3. Any data submitted through the app (e.g., uploading a new patient) is routed to a local Cloud Function (e.g., `/api/addPatient`) and stored in the emulator’s local environment — **not your real Firebase project**.

4. You can view all uploaded data and logs live in the Emulator UI.

> ✅ This means you can safely test functionality like adding patients and viewing data without needing internet access or a Firebase account. All changes are temporary and local to your machine.

```bash
firebase emulators:start
```

Emulated services:

- **App**: [http://localhost:5000](http://localhost:5000)
- **Functions**: [http://localhost:5001](http://localhost:5001)
- **Emulator UI**: [http://localhost:4000](http://localhost:4000)

---

## 📤 Deployment (Firebase Hosting)

```bash
npm run build
npm run deploy     # Hosting only
npm run deploy:all # Hosting + Functions
```

Make sure you've:

- Logged in (`firebase login`)
- Selected a project (`firebase use --add`)
- Initialized hosting (`firebase init`)

---

## 🧪 Type Check + Lint

```bash
npm run type-check
npm run lint
```

---

## ⚠️ Disclaimer

This app is a **demo project** for technical review and **not intended for production or clinical use**.
All patient records are **mock data only** and were generated using `@faker-js/faker`.

> 🚨 **Security Notice:** This app does not currently include user authentication.
> Do not input or store any sensitive or personally identifiable information (PII)
> until authentication and secure access control have been properly implemented.

## 📝 License

2025 Robyn McNeil — Interview use only.
