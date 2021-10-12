// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

//import the function to pull in the Firebase realtime database service:
import { getDatabase } from 'firebase/database';

import { getDatabase} from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB4Cj740uB77O1SEAJLIg_iBwcHNtIzRY0",
    authDomain: "test-347cd.firebaseapp.com",
    projectId: "test-347cd",
    storageBucket: "test-347cd.appspot.com",
    messagingSenderId: "1039072908264",
    appId: "1:1039072908264:web:e680161451a6cae8ae8a5d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

<<<<<<< HEAD
=======
//go get the realtime database service:
>>>>>>> 5b88bd47b90fa6a44b1cb9aee7fd3dbee7820c22
const realtime = getDatabase(app);

export default realtime;