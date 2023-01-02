// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBI1Lkw9355oFTNNNoE90baLjETqjBEwHs",
  authDomain: "todo-list-58a55.firebaseapp.com",
  databaseURL: "https://todo-list-58a55-default-rtdb.firebaseio.com",
  projectId: "todo-list-58a55",
  storageBucket: "todo-list-58a55.appspot.com",
  messagingSenderId: "452501346535",
  appId: "1:452501346535:web:6695837bdbea6bbf502a42",
  measurementId: "G-31E7VDCWY5"
};




const app = initializeApp(firebaseConfig);

export const db  = getDatabase(app)
export const auth = getAuth()