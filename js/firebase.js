import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAqIDvx8Z8ViTn9Pa7BQedjsoSTlJ_UjVk",
  authDomain: "eclipse-shop-98d3a.firebaseapp.com",
  projectId: "eclipse-shop-98d3a",
  storageBucket: "eclipse-shop-98d3a.appspot.com",
  messagingSenderId: "918740402173",
  appId: "1:918740402173:web:960457feddea9dedd36394"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
