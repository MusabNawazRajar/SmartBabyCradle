// firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBBxcEXGXIi4tkdKWTr5GuSyeMKSBSPjCo",
  authDomain: "smart-baby-cradle-37a31.firebaseapp.com",
  databaseURL: "https://smart-baby-cradle-37a31-default-rtdb.firebaseio.com",
  projectId: "smart-baby-cradle-37a31",
  storageBucket: "smart-baby-cradle-37a31.appspot.com",
  messagingSenderId: "987156182780",
  appId: "1:987156182780:web:42f213a872a58229d8c979"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth };
