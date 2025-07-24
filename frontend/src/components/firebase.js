// Import the modular Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

export { auth, RecaptchaVerifier };
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCWinAMky-190AbMeJpANK1ZdeSYDE8Cqk",
//   authDomain: "login-7d716.firebaseapp.com",
//   projectId: "login-7d716",
//   storageBucket: "login-7d716.firebasestorage.app",
//   messagingSenderId: "1072941988792",
//   appId: "1:1072941988792:web:4e587cc5d649e31d466d4d"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);