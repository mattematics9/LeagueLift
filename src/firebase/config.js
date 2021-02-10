import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyBrdDu9OkYEYXBRt2OHm8wwcmlWeJq8sPk",
    authDomain: "leaguelift-aa925.firebaseapp.com",
    databaseURL: "https://leaguelift-aa925.firebaseio.com",
    projectId: "leaguelift-aa925",
    storageBucket: "leaguelift-aa925.appspot.com",
    messagingSenderId: "508890585337",
    appId: "1:508890585337:web:263d778b8e0d790cf66a28",
    measurementId: "G-E9DQRRPVG6"
};

firebase.initializeApp(firebaseConfig);

export default firebase
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
