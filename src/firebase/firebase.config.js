const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_CRUD_HOOK_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_CRUD_HOOK_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_CRUD_HOOK_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_CRUD_HOOK_STORAGE_BUCKET,
  messagingSenderId:
    process.env.REACT_APP_FIREBASE_CRUD_HOOK_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_CRUD_HOOK_APP_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_CRUD_HOOK_DATABASE_URL,
};

export default firebaseConfig;
