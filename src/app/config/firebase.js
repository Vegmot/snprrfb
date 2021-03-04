import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDXNuP1rpkmf2Dgpy1Ma6jeJUNwHGWPLJo',
  authDomain: 'snprrfb-dev.firebaseapp.com',
  projectId: 'snprrfb-dev',
  storageBucket: 'snprrfb-dev.appspot.com',
  messagingSenderId: '914874636112',
  appId: '1:914874636112:web:f0a444744a65606717fe55',
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
