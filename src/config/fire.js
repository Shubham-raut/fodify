import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAtJEmJA_YB9duuUOqoCOHnhct7RFc2Ogk",
    authDomain: "main-bb1e8.firebaseapp.com",
    databaseURL: "https://main-bb1e8.firebaseio.com",
    projectId: "main-bb1e8",
    storageBucket: "main-bb1e8.appspot.com",
    messagingSenderId: "1097810436816",
    appId: "1:1097810436816:web:a9702b7d31f3cfbc13f4d5"
  };
  // Initialize Firebase
  const fire=firebase.initializeApp(firebaseConfig);
 
export default fire;