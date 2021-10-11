// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getDatabase} from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBV80xd8s0mydSw24PAwuUMpqARLSEwgmQ",
    authDomain: "the-boffo.firebaseapp.com",
    databaseURL: "https://the-boffo-default-rtdb.firebaseio.com/",
    projectId: "the-boffo",
    storageBucket: "the-boffo.appspot.com",
    messagingSenderId: "868554383879",
    appId: "1:868554383879:web:cc686dbef17f26e07d80a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const realtime = getDatabase(app);

export default realtime;