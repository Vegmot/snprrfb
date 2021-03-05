import cuid from 'cuid';
import firebase from '../config/firebase';

const db = firebase.firestore();

export const dataFromSnapshot = snapshot => {
  if (!snapshot.exists) return undefined;

  const data = snapshot.data();

  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (data[prop] instanceof firebase.firestore.Timestamp) {
        data[prop] = data[prop].toDate();
      }
    }
  }

  return {
    ...data,
    id: snapshot.id,
  };
};

export const listenToEventsFromFireStore = () => {
  return db.collection('events').orderBy('date');
};

export const listenToEventsFromFirestore = eventId => {
  return db.collection('events').doc(eventId);
};

export const addEventsToFirestore = event => {
  return db.collection('events').add({
    ...event,
    hostedBy: 'Sister Nil',
    hostPhotoURL: 'https://randomuser.me/api/portraits/women/46.jpg',
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: cuid(),
      name: 'Sister Nil',
      photoURL: 'https://randomuser.me/api/portraits/women/46.jpg',
    }),
  });
};

export const updateEventInFirestore = event => {
  return db.collection('events').doc(event.id).update(event);
};
