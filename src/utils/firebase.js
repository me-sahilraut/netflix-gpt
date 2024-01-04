// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAnMUQ4v39D6wIzYxFltzAdrVwVhSFGgrI",
    authDomain: "netfilxgpt-278ef.firebaseapp.com",
    projectId: "netfilxgpt-278ef",
    storageBucket: "netfilxgpt-278ef.appspot.com",
    messagingSenderId: "301449852965",
    appId: "1:301449852965:web:7aa4e03d151c282077e7cc",
    measurementId: "G-FMN72SH760"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
