import firebase from '../config/firebase';
import { setUserProfileData } from './firestoreService';

export const signInWithEmail = creds => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(creds.email, creds.password);
};

export const signOutFirebase = () => {
  return firebase.auth().signOut();
};

export const registerInFirebase = async creds => {
  try {
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(creds.email, creds.password);

    await result.user.updateProfile({ displayName: creds.displayName });

    return await setUserProfileData(result.user);
  } catch (error) {
    throw error;
  }
};
