import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD9umfOeFROUMV5bdGFceth9FrKYqw0B3w",
  authDomain: "userlocationdisplayweather.firebaseapp.com",
  projectId: "userlocationdisplayweather",
  storageBucket: "userlocationdisplayweather.appspot.com",
  messagingSenderId: "49469602244",
  appId: "1:49469602244:web:ac5257f65d9c9d08f24c91"
};


const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
