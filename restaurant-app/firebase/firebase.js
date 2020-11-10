import app from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import {firebaseConfig} from './config';

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }
    this.db = app.firestore();
  }
}

const firebase = new Firebase();

export default firebase;
