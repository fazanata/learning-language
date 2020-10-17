import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: "https://learn-the-words-ba974.firebaseio.com",
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
};

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);

    this.auth = firebase.auth();
    this.database = firebase.database();
    this.userUid = null;
    this.userEmail = '';
  }

  setUserUid = (uid) => this.userUid = uid;

  setUserEmail = (email) => this.userEmail = email;
 
  signWithEmail = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

  getUserCardsRef = () => this.database.ref(`/cards/${this.userUid}`);

  addItemCard = (eng, rus, wordId) => this.database.ref(`/cards/${this.userUid}`);

  deleteCard = () => this.database.ref(`/cards/${this.userUid}`);

  signOutUser = () => this.auth.signOut();

  createNewUser = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

  getUserCurrentCardRef = (id) => this.database.ref(`/cards/${this.userUid}/${id}`);
}

export default Firebase;
