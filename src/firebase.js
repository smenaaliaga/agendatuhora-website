import firebase from 'firebase/app'
import 'firebase/firestore'

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCZEhgJ-fpSAUwZxOphxqgl952TJ1Mrxlg",
    authDomain: "semid-1560d.firebaseapp.com",
    databaseURL: "https://semid-1560d.firebaseio.com",
    projectId: "semid-1560d",
    storageBucket: "semid-1560d.appspot.com",
    messagingSenderId: "983354136640",
    appId: "1:983354136640:web:0d30bfc2e48411040167a5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()

export { db }