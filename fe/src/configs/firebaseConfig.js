// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCBG3873SQmT7RBVIv4TU1HRds6TzZqrVk',
  authDomain: 'jobari.firebaseapp.com',
  projectId: 'jobari',
  storageBucket: 'jobari.appspot.com',
  messagingSenderId: '554268323769',
  appId: '1:554268323769:web:8abacbb140b7358599d068',
  measurementId: 'G-9R65RL8MRG'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Use getAuth instead of app.auth()
const analytics = getAnalytics(app);

// Export the auth object
export { auth };
