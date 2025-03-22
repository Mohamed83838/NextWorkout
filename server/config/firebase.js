import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCHQvApdSPJDwboVLeQDvLETjGxl0dViUY",
  authDomain: "nextworkout-e5596.firebaseapp.com",
  projectId: "nextworkout-e5596",
  storageBucket: "nextworkout-e5596.firebasestorage.app",
  messagingSenderId: "123752456069",
  appId: "1:123752456069:web:1631bda5b4ecaf2677eeec"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export  { auth, provider };