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

const realtime = getDatabase(app);

export default realtime;