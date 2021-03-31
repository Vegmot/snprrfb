import firebase from '../config/firebase'

// I found a new feature in VS code! OUTLINE!

const db = firebase.firestore()

export const dataFromSnapshot = snapshot => {
  if (!snapshot.exists) return undefined

  const data = snapshot.data()

  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (data[prop] instanceof firebase.firestore.Timestamp) {
        data[prop] = data[prop].toDate()
      }
    }
  }

  return {
    ...data,
    id: snapshot.id,
  }
}

export const fetchEventsFromFirestore = (
  predicate,
  limit,
  lastDocSnapshot = null
) => {
  const user = firebase.auth().currentUser
  let eventsRef = db
    .collection('events')
    .orderBy('date')
    .startAfter(lastDocSnapshot)
    .limit(limit)

  switch (predicate.get('filter')) {
    case 'isGoing':
      return eventsRef
        .where('attendeeIds', 'array-contains', user.uid)
        .where('date', '>=', predicate.get('startDate'))

    case 'isHosting':
      return eventsRef
        .where('hostUid', '==', user.uid)
        .where('date', '>=', predicate.get('startDate'))

    default:
      return eventsRef.where('date', '>=', predicate.get('startDate'))
  }
}

export const listenToEventsFromFirestore = eventId => {
  return db.collection('events').doc(eventId)
}

export const addEventsToFirestore = event => {
  const user = firebase.auth().currentUser
  return db.collection('events').add({
    ...event,
    hostUid: user.uid,
    hostedBy: user.displayName,
    hostPhotoURL: user.photoURL || null,
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: user.uid,
      name: user.displayName,
      photoURL: user.photoURL || null,
    }),
    attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
  })
}

export const updateEventInFirestore = event => {
  return db.collection('events').doc(event.id).update(event)
}

export const deleteEventInFirestore = eventId => {
  return db.collection('events').doc(eventId).delete()
}

export const cancelEventToggle = event => {
  return db.collection('events').doc(event.id).update({
    isCancelled: !event.isCancelled,
  })
}

export const setUserProfileData = user => {
  return db
    .collection('users')
    .doc(user.uid)
    .set({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL || null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
}

export const getUserProfile = userId => {
  return db.collection('users').doc(userId)
}

export const updateUserProfile = async profile => {
  const user = firebase.auth().currentUser
  try {
    if (user.displayName !== profile.displayName) {
      await user.updateProfile({
        displayName: profile.displayName,
      })
    }

    return await db.collection('users').doc(user.uid).update(profile)
  } catch (error) {
    throw error
  }
}

export const updateUserProfilePhoto = async (downloadURL, filename) => {
  const user = firebase.auth().currentUser
  const userDocRef = db.collection('users').doc(user.uid)

  try {
    const userDoc = await userDocRef.get()
    if (!userDoc.data().photoURL) {
      await db.collection('users').doc(user.uid).update({
        photoURL: downloadURL,
      })
      await user.updateProfile({
        photoURL: downloadURL,
      })
    }
    return await db.collection('users').doc(user.uid).collection('photos').add({
      name: filename,
      url: downloadURL,
    })
  } catch (error) {
    throw error
  }
}

export const getUserPhotos = userUid => {
  return db.collection('users').doc(userUid).collection('photos')
}

export const setMainPhoto = async photo => {
  const user = firebase.auth().currentUser
  const today = new Date()
  const eventDocQuery = db
    .collection('events')
    .where('attendeeIds', 'array-contains', user.uid)
    .where('date', '>=', today)
  const userFollowingRef = db
    .collection('following')
    .doc(user.uid)
    .collection('userFollowing')

  const batch = db.batch()

  // inside firestore
  batch.update(db.collection('users').doc(user.uid), {
    photoURL: photo.url,
  })

  try {
    const eventsQuerySnap = await eventDocQuery.get()

    for (let i = 0; i < eventsQuerySnap.docs.length; i++) {
      let eventDoc = eventsQuerySnap.docs[i]
      if (eventDoc.data().hostUid === user.uid) {
        batch.update(eventsQuerySnap.docs[i].ref, {
          hostPhotoURL: photo.url,
        })
      }

      batch.update(eventsQuerySnap.docs[i].ref, {
        attendees: eventDoc.data().attendees.filter(attendee => {
          if (attendee.id === user.uid) {
            attendee.photoURL = photo.url
          }
          return attendee
        }),
      })
    }

    const userFollowingSnap = await userFollowingRef.ref.get()

    userFollowingSnap.docs.forEach(docRef => {
      let followingDocRef = db
        .collection('following')
        .doc(docRef.id)
        .collection('userFollowers')
        .doc(user.uid)

      batch.update(followingDocRef, {
        photoURL: photo.url,
      })
    })

    await batch.commit()

    // inside firebase authentication
    return await user.updateProfile({
      photoURL: photo.url,
    })
  } catch (error) {
    throw error
  }
}

export const deletePhotoFromCollection = photoId => {
  const userUid = firebase.auth().currentUser.uid
  return db
    .collection('users')
    .doc(userUid)
    .collection('photos')
    .doc(photoId)
    .delete()
}

export const addUserAttendance = event => {
  const user = firebase.auth().currentUser
  return db
    .collection('events')
    .doc(event.id)
    .update({
      attendees: firebase.firestore.FieldValue.arrayUnion({
        id: user.uid,
        name: user.displayName,
        photoURL: user.photoURL || null,
      }),
      attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
    })
}

export const cancelUserAttendance = async event => {
  const user = firebase.auth().currentUser
  try {
    const eventDoc = await db.collection('events').doc(event.id).get()

    /*
      Regarding attendees node here
      firebase doesn't allow us to remove an object by its id,
      so to achieve removal of an item from an array,
      we have to specify one item and filter it
    */
    return db
      .collection('events')
      .doc(event.id)
      .update({
        attendeeIds: firebase.firestore.FieldValue.arrayRemove(user.uid),
        attendees: eventDoc
          .data()
          .attendees.filter(attendee => attendee.id !== user.uid),
      })
  } catch (error) {
    throw error
  }
}

export const getUserEventsQuery = (activeTab, userUid) => {
  let eventsRef = db.collection('events')
  const today = new Date()

  switch (activeTab) {
    case 1: // Past events
      return eventsRef
        .where('attendeeIds', 'array-contains', userUid)
        .where('date', '<=', today)
        .orderBy('date', 'desc')

    case 2: // Hosting
      return eventsRef.where('hostUid', '==', 'userUid').orderBy('date')

    default:
      return eventsRef
        .where('attendeeIds', 'array-contains', userUid)
        .where('date', '>=', today)
        .orderBy('date')
  }
}

export const followUser = async profile => {
  const user = firebase.auth().currentUser

  // db.batch()
  // all the methods wrapped in batch()
  // will work as one
  // if just one of the methods inside each batch fails in working,
  // all the other methods inside batch will roll back
  const batch = db.batch()

  try {
    batch.set(
      db
        .collection('following')
        .doc(user.uid)
        .collection('userFollowing')
        .doc(profile.id),
      {
        displayName: profile.displayName,
        photoURL: profile.photoURL,
        uid: profile.id,
      }
    )

    batch.update(db.collection('users').doc(user.uid), {
      followingCount: firebase.firestore.FieldValue.increment(1),
    })

    return await batch.commit()
  } catch (error) {
    throw error
  }
}

export const unfollowUser = async profile => {
  const user = firebase.auth().currentUser
  const batch = db.batch()

  try {
    batch.delete(
      db
        .collection('following')
        .doc(user.uid)
        .collection('userFollowing')
        .doc(profile.id)
    )

    batch.update(db.collection('users').doc(user.uid), {
      followingCount: firebase.firestore.FieldValue.increment(-1), // there's no decrement method
    })

    return await batch.commit()
  } catch (error) {
    throw error
  }
}

export const getFollowersCollection = profileId => {
  return db.collection('following').doc(profileId).collection('userFollowers')
}

export const getFollowingCollection = profileId => {
  return db.collection('following').doc(profileId).collection('userFollowing')
}

export const getFollowingDoc = profileId => {
  const userUid = firebase.auth().currentUser.uid
  return db
    .collection('following')
    .doc(userUid)
    .collection('userFollowing')
    .doc(profileId)
    .get()
}
