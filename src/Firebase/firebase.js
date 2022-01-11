import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCgpfuF55Vs3kL3xq6cLG3j3osEBOgty0w',
  authDomain: 'sign-in-41112.firebaseapp.com',
  projectId: 'sign-in-41112',
  storageBucket: 'sign-in-41112.appspot.com',
  messagingSenderId: '261851565453',
  appId: '1:261851565453:web:58ef452171fa93e44701c4',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
