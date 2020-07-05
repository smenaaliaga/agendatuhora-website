import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAiI16E35AZwQcwFtIhpl64OSLQUUpxdps",
    authDomain: "agendatuhora-website.firebaseapp.com",
    databaseURL: "https://agendatuhora-website.firebaseio.com",
    projectId: "agendatuhora-website",
    storageBucket: "agendatuhora-website.appspot.com",
    messagingSenderId: "85750510813",
    appId: "1:85750510813:web:04d81022dbe340a2455734"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };