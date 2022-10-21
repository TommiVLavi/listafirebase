import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import Constants from "expo-constants";
import { apiKey } from '@env'

const firebaseConfig = {

    apiKey: apiKey,
  
    authDomain: "ruokalista-c1339.firebaseapp.com",
  
    projectId: "ruokalista-c1339",
  
    storageBucket: "ruokalista-c1339.appspot.com",
  
    messagingSenderId: "407908533685",
  
    appId: "1:407908533685:web:9f0ab6d6ba2e71beb9c5fc"
  
  };
  

const app = initializeApp(firebaseConfig);
export default getDatabase(app);