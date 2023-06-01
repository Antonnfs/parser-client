import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";

import { firebaseConfig } from "../config/firebase";

let firebaseApp;

if (getApps().length) {
   firebaseApp = getApp();
} else {
   firebaseApp = initializeApp(firebaseConfig);
}

export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);

export const functions = getFunctions(firebaseApp);
export const storage = getStorage(firebaseApp);
export default firebaseApp;
