import  { auth, provider } from "../config/firebase.js";
import { 
  createUserWithEmailAndPassword  
} from "firebase/auth";


export const loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: "Missing email or password" });
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    res.status(200).json({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified
    });
    
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    
    console.error(error);
    
    // Handle common error codes
    switch (errorCode) {
      case 'auth/invalid-email':
        res.status(400).json({ error: "Invalid email format" });
        break;
      case 'auth/user-disabled':
        res.status(403).json({ error: "Account disabled" });
        break;
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        res.status(401).json({ error: "Invalid credentials" });
        break;
      default:
        res.status(500).json({ error: "Authentication failed" });
    }
  }
};

export const registerwithemail =async (req, res) => {

  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: "Missing email or password" });
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    res.status(200).json({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified
    });
    
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    
    console.error(error);
    
    // Handle common error codes
    switch (errorCode) {
      case 'auth/invalid-email':
        res.status(400).json({ error: "Invalid email format" });
        break;
      case 'auth/user-disabled':
        res.status(403).json({ error: "Account disabled" });
        break;
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        res.status(401).json({ error: "Invalid credentials" });
        break;
      default:
        res.status(500).json({ error: "Authentication failed" });
    }
  }
};