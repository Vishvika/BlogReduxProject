import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBzenhkaaMqZ9dBtjDU5qYWmRx6qyQgcEQ",
  authDomain: "blog-app-redux-8eede.firebaseapp.com",
  databaseURL: "https://blog-app-redux-8eede-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "blog-app-redux-8eede",
  storageBucket: "blog-app-redux-8eede.appspot.com",
  messagingSenderId: "86217388675",
  appId: "1:86217388675:web:0b995f9ed1149e884061b6",
  measurementId: "G-H478CL8NWW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app)