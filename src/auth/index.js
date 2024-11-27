// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: 'AIzaSyAjzMb4r-X5YzykbGdGmVCHzEZTOP0bzig',
   authDomain: 'v-movie-quiz.firebaseapp.com',
   projectId: 'v-movie-quiz',
   storageBucket: 'v-movie-quiz.appspot.com',
   messagingSenderId: '9302044684',
   appId: '1:9302044684:web:4229b6ac88db45e68f7e29',
   measurementId: 'G-36FD5X8960',
}

// Initialize Firebase
initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
