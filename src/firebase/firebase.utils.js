import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBS9srYl4b59zsA8ILyLApJC_XKvrL0Bv4",
  authDomain: "crwn-db-f8887.firebaseapp.com",
  databaseURL: "https://crwn-db-f8887.firebaseio.com",
  projectId: "crwn-db-f8887",
  storageBucket: "crwn-db-f8887.appspot.com",
  messagingSenderId: "532246111821",
  appId: "1:532246111821:web:07e8178ba6888ade7c9e04",
  measurementId: "G-7YSVED361R",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
