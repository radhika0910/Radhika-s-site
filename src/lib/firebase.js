// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyAcUMbJRHarGPdytbzUvuLkdTP7BWtVMQ4",
  authDomain: "radhika-s-portfolio.firebaseapp.com",
  projectId: "radhika-s-portfolio",
  storageBucket: "radhika-s-portfolio.appspot.com",
  messagingSenderId: "760303316497",
  appId: "1:760303316497:web:423b52b0a3d193effe8bb0",
  measurementId: "G-ZHVQ3TRJS8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
