import { initializeApp } from 'firebase';
import 'firebase/auth';
import 'firebase/database';

const config = {
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DB_URL,
};
initializeApp(config);
