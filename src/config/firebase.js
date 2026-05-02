import { initializeApp } from 'firebase/app'
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyByWcvyS0sRIvmvigEq-e09_RTRV7HbQWA",
  authDomain: "cadastro-de-alunos---uniateneu.firebaseapp.com",
  projectId: "cadastro-de-alunos---uniateneu",
  storageBucket: "cadastro-de-alunos---uniateneu.firebasestorage.app",
  messagingSenderId: "888294277149",
  appId: "1:888294277149:web:c5d8f5586959fa08af46f4",
  measurementId: "G-0E33D1QBE9"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('Persistência offline falhou: múltiplas abas abertas.')
  } else if (err.code === 'unimplemented') {
    console.warn('Este navegador não suporta persistência offline.')
  }
})