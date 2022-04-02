// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';

import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyAuJgwvBtpbOc_GLqRwS92TMxMKFV87Ez4',
    authDomain: 'chat-app-822db.firebaseapp.com',
    projectId: 'chat-app-822db',
    storageBucket: 'chat-app-822db.appspot.com',
    messagingSenderId: '470782647605',
    appId: '1:470782647605:web:3cbe43d8bf79aff1b7007c',
    measurementId: 'G-8PEENG9HE2',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

if (window.location.hostname === 'localhost') {
    // auth.useEmulator('http://localhost:9099');
    // db.useEmulator('localhost', '8080');
}

export { db, auth };
export default firebase;
