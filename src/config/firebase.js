import { initializeApp } from 'firebase/app'
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBxsMiNwFaT3hPHs_cfGVMEu-VD_aZcZTQ",
  authDomain: "cadastrodealunosuniateneu.firebaseapp.com",
  projectId: "cadastrodealunosuniateneu",
  storageBucket: "cadastrodealunosuniateneu.firebasestorage.app",
  messagingSenderId: "12209445701",
  appId: "1:12209445701:web:280f4637c9fb13da71fc2c",
  measurementId: "G-5DHY5H8RZN"
};

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('Persistência offline falhou: múltiplas abas abertas.')
  } else if (err.code === 'unimplemented') {
    console.warn('Este navegador não suporta persistência offline.')
  }
})