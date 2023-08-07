import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB39yN7ch25kJGji2zNH-qClKBRn4uzfhM",
  authDomain: "bcjjj-1be84.firebaseapp.com",
  projectId: "bcjjj-1be84",
  storageBucket: "bcjjj-1be84.appspot.com",
  messagingSenderId: "263251828773",
  appId: "1:263251828773:web:22f89e3b1a5d9d38c2dfcc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();