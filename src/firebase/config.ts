// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAEGkK-3DoweTe_t64b-NBNRW5ZIbVvwmg",
  authDomain: "qchat-1627e.firebaseapp.com",
  projectId: "qchat-1627e",
  storageBucket: "qchat-1627e.appspot.com",
  messagingSenderId: "27469937973",
  appId: "1:27469937973:web:26e51c47de7b921beea07c",
  measurementId: "G-GMMDF3CTGM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };