// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCC4vGzZI7cXEmFLv_qneGapudZGEGa1Qg',
    authDomain: 'fir-test-8e9d3.firebaseapp.com',
    projectId: 'fir-test-8e9d3',
    storageBucket: 'fir-test-8e9d3.appspot.com',
    messagingSenderId: '669195842578',
    appId: '1:669195842578:web:dca4f734d57b611bf294cb',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const db = getFirestore()
