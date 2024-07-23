import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBfLJTjmrtxIbY4wmYjSOPD5zjWjZkmFvY",
  authDomain: "expense-tracker-cd557.firebaseapp.com",
  projectId: "expense-tracker-cd557",
  storageBucket: "expense-tracker-cd557.appspot.com",
  messagingSenderId: "390061460005",
  appId: "1:390061460005:web:a9d6f330cd06284fdf0dcc",
  measurementId: "G-JYYGM7FBKM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };



