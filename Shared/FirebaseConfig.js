// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6FjQPW32p5q91AEt7BD5VKhEVHmtu2zE",
  authDomain: "cloudwebapp-ea722.firebaseapp.com",
  projectId: "cloudwebapp-ea722",
  storageBucket: "cloudwebapp-ea722.appspot.com",
  messagingSenderId: "642487345496",
  appId: "1:642487345496:web:6ce932d9bc5d80a279852d",
  measurementId: "G-GQH8W4PFMR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
// const analytics = getAnalytics(app);