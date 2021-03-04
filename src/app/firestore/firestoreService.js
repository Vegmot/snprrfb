import firebase from '../config/firebase';

const db = firebase.firestore();

export const getEventsFromFireStore = observer => {
  return db.collection('events').onSnapshot(observer);
};
