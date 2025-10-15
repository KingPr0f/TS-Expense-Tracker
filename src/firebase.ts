// firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Конфигурация Firebase твоего проекта
const firebaseConfig = {
  apiKey: "AIzaSyDqS0czBhoDT4VQ2R9vJqQk6_Vaw_WI4vQ",
  authDomain: "my-expense-tracker-fba38.firebaseapp.com",
  projectId: "my-expense-tracker-fba38",
  storageBucket: "my-expense-tracker-fba38.appspot.com",
  messagingSenderId: "188421160213",
  appId: "1:188421160213:web:3bc7bf79125a8fb5fdfd1c"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Экспорт Firestore для использования в хуках
export const db = getFirestore(app);