import { collection, addDoc, doc, getDoc,deleteDoc , getDocs  } from "firebase/firestore"; 
import  { db } from "../config/firebase.js";
import axios from 'axios';
// add workout
export const AddWorkout =async (req,res)=>{
    const data = req.body;

    const {description,time,token} = data;
    try {
        const response = await axios.post(
            'http://192.168.1.7:3200/api/session/verifytoken',
            { token },
            {
                headers: {
                    'X-API-Secret': process.env.SERVER_SECRET // Standard header name
                },

            }
        );
        const session = response.data.session;
        const docRef = await addDoc(collection(db, "users",session.email,"workouts"), {
            "email": session.email,
          "username": session.username,
          "description": description,
          "time": time
          });
     
        res.status(201).json({ message: 'Workout added successfully',"id":docRef.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occured' });
        
    }
}

//retrieve workout
export const RetrieveWorkout =async (req,res)=>{
    const data = req.body;

    const {id,token} = data;
    try {
        const response = await axios.post(
            'http://192.168.1.7:3200/api/session/verifytoken',
            { token },
            {
                headers: {
                    'X-API-Secret': process.env.SERVER_SECRET // Standard header name
                },

            }
        );
        const session = response.data.session;
        const docRef = doc(db, "users",session.email,"workouts",id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            
            return res.status(201).json({ message: 'Workout retrieved successfully',"workout":docSnap.data});
        } else {
          // docSnap.data() will be undefined in this case
        
            return res.status(404).json({ error: 'No such document!' });
        }
     
        res.status(201).json({ message: 'Workout added successfully',"id":docRef.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occured' });
        
    }
}
//delete workout
export const DeleteWorkout =async (req,res)=>{
    const data = req.body;

    const {id,token} = data;
    try {
        const response = await axios.post(
            'http://192.168.1.7:3200/api/session/verifytoken',
            { token },
            {
                headers: {
                    'X-API-Secret': process.env.SERVER_SECRET // Standard header name
                },

            }
        );
        const session = response.data.session;
        const docRef = doc(db, "users",session.email,"workouts",id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            await deleteDoc(docRef);
            return res.status(201).json({ message: 'Workout deleted successfully'});
        } else {
          // docSnap.data() will be undefined in this case
        
            return res.status(404).json({ error: 'No such document!' });
        }
     

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occured' });
        
    }
}


//Retrieve all workouts
export const RetrieveWorkouts =async (req,res)=>{
    const data = req.body;
    const {token} = data;
    try {
        console.log('helooooooooooooo');
        const response = await axios.post(
            'http://192.168.1.7:3200/api/session/verifytoken',
            { token },
            {
                headers: {
                    'X-API-Secret': process.env.SERVER_SECRET // Standard header name
                },

            }
        );
        const session = response.data.session;
      
        const querySnapshot = await getDocs(collection(db, "users",session.email,"workouts"));
      return res.status(201).json({ message: 'Workouts retrieved successfully',"workouts":querySnapshot.docs});
     

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occured' });
        
    }
}
