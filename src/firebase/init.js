import firebase from 'firebase';
import firestore from 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyBiMog40mgYdKhA_rwRMT2BvEPWb-6wDG0',
  authDomain: 'todo-vue-83560.firebaseapp.com',
  databaseURL: 'https://todo-vue-83560.firebaseio.com',
  projectId: 'todo-vue-83560',
  storageBucket: 'todo-vue-83560.appspot.com',
  messagingSenderId: '1030114260492',
  appId: '1:1030114260492:web:459f255bef04d82dc2e029',
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();
