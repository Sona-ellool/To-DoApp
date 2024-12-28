import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence, collection, getDocs, query, limit } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let app;
let db;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  // Enable offline persistence
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
      console.warn('Browser doesn\'t support persistence');
    }
  });
} catch (error) {
  console.error('Firebase initialization error:', error);
}

export const testConnection = async () => {
  if (!app || !db) {
    throw new Error('Firebase not initialized');
  }

  try {
    // Test the connection by attempting to fetch one document from any collection
    const q = query(collection(db, 'tasks'), limit(1));
    await getDocs(q);
    console.log('Firebase connection successful');
    return true;
  } catch (error) {
    console.error('Firebase connection test failed:', error);
    throw new Error(error.message);
  }
};

export const initializeCollections = async () => {
  return testConnection();
};

export { db };
