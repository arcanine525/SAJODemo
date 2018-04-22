import * as firebase from 'firebase'

var config = {
  apiKey: "AIzaSyCl6aZh3TRuCLDdJCy5cE1cWCKhjAQ7KGU",
  authDomain: "sajodemo.firebaseapp.com",
  databaseURL: "https://sajodemo.firebaseio.com",
  projectId: "sajodemo",
  storageBucket: "",
  messagingSenderId: "557854332864"
};
export const firebaseApp = firebase.initializeApp(config);