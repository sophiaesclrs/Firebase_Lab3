// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore, collection, addDoc, connectFirestoreEmulator, query, getDocs, setDoc, doc, deleteDoc, onSnapshot} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIkt3YIelrICdaGwPJVLCXCmRTSdGJ0pI",
  authDomain: "gettingstartedwithfireba-3815b.firebaseapp.com",
  databaseURL: "https://gettingstartedwithfireba-3815b-default-rtdb.firebaseio.com",
  projectId: "gettingstartedwithfireba-3815b",
  storageBucket: "gettingstartedwithfireba-3815b.appspot.com",
  messagingSenderId: "23812251569",
  appId: "1:23812251569:web:20cdac7d0ec133eb952790",
  measurementId: "G-GX3TVTQJ0V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(app)

const db = getFirestore();
connectFirestoreEmulator(db, 'localhost', 8080);

const createBtn = document.querySelector(".create")
createBtn.addEventListener("click", async () => {
    const insectCollectionRef = collection(db, 'insects')
    try{
      const newinsectRef = await addDoc(insectCollectionRef, {
        type: "Butterfly",
        color: "Black",
        size: "Medium"
      })
      console.log('Added new insect(s): ${newinsectRef.id}')
    } catch (error) {
      console.log(error)
    }

})

const getDataBtn = document.querySelector(".get-data")
getDataBtn.addEventListener("click", async () => {
  const q = query(collection(db, "insects"))
  const insects = await getDocs(q)
  insects.forEach((insect) => {
    console.log(insect.data())
  })
})

const changeDataBtn = document.querySelector(".change-data")
changeDataBtn.addEventListener("click", async () => {
  const q = query(collection(db, "insects"))
  const insects = await getDocs(q)
  if(insects.empty) {
    console.log("Sorry, no data to change yet")
    return
  }

  await setDoc(doc(db, 'insects', insects.docs[0].id), {
    type: "Dragonfly",
    color: "Orange",
    size: "Big"
  }, { merge: true })
})

const deleteDataBtn = document.querySelector(".delete-data")
deleteDataBtn.addEventListener("click", async () => {

  const q = query(collection(db, "insects"))
  const insects = await getDocs(q)
  if(insects.empty) {
    console.log("Sorry, no data to delete yet")
    return
  }

  await deleteDoc(doc(db, 'insects', insects.docs[insects.docs.length-1].id))
  console.log("Data Deleted")
})

const q = query(collection(db, "insects"))
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  console.log('--------------------------------------------------------')
  querySnapshot.forEach((insect) => {
    console.log(insect.data())
  })
})

// unsubscribe()