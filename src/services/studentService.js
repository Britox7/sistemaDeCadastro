// src/services/studentService.js
import { db } from '../config/firebase'
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from 'firebase/firestore'

const alunosRef = collection(db, 'students')

// ─── Listar todos os alunos ───────────────────────────────────────────────────
// Equivalente a: SELECT * FROM alunos
export async function getAlunos() {
  try {
    const snap = await getDocs(alunosRef)
    const alunos = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
    return JSON.stringify(alunos)
  } catch (e) {
    return JSON.stringify([])
  }
}

// ─── Cadastrar aluno ──────────────────────────────────────────────────────────
// Equivalente a: INSERT INTO alunos (nome, curso, dataNasc) VALUES (?, ?, ?)
// Mantém validação de nome duplicado (case-insensitive)
export async function createAluno(aluno) {
  try {
    // Busca todos e verifica duplicata no client (Firestore não tem LOWER() nativo)
    const snap = await getDocs(alunosRef)
    const existe = snap.docs.some(
      (d) => d.data().nome.toLowerCase() === aluno.nome.toLowerCase()
    )

    if (existe) {
      return JSON.stringify({ sucesso: false, erro: 'Aluno com esse nome já cadastrado.' })
    }

    await addDoc(alunosRef, {
      nome: aluno.nome,
      curso: aluno.curso,
      dataNasc: aluno.dataNasc, // formato "YYYY-MM-DD"
      criadoEm: Timestamp.now(),
    })

    return JSON.stringify({ sucesso: true })
  } catch (e) {
    return JSON.stringify({ sucesso: false, erro: e.message })
  }
}

// ─── Excluir aluno ────────────────────────────────────────────────────────────
// Equivalente a: DELETE FROM alunos WHERE id = ?
export async function deleteAluno(id) {
  try {
    await deleteDoc(doc(db, 'students', id))
    return JSON.stringify({ sucesso: true })
  } catch (e) {
    return JSON.stringify({ sucesso: false, erro: e.message })
  }
}

// ─── Atualizar aluno ──────────────────────────────────────────────────────────
// Equivalente a: UPDATE alunos SET nome = ?, curso = ?, dataNasc = ? WHERE id = ?
// Mantém validações de nome duplicado e data de nascimento
export async function updateAluno(aluno) {
  try {
    // Validação de data de nascimento
    const dataNasc = new Date(aluno.dataNasc)
    const anoAtual = new Date().getFullYear()

    if (dataNasc.getFullYear() < 1900 || dataNasc.getFullYear() > anoAtual) {
      return JSON.stringify({
        sucesso: false,
        erro: 'A data de nascimento deve ser entre 1900 e o ano atual.',
      })
    }

    // Verifica nome duplicado excluindo o próprio aluno (equivalente ao AND id != ?)
    const snap = await getDocs(alunosRef)
    const existe = snap.docs.some(
      (d) =>
        d.id !== aluno.id &&
        d.data().nome.toLowerCase() === aluno.nome.toLowerCase()
    )

    if (existe) {
      return JSON.stringify({ sucesso: false, erro: 'Aluno com esse nome já cadastrado.' })
    }

    await updateDoc(doc(db, 'students', aluno.id), {
      nome: aluno.nome,
      curso: aluno.curso,
      dataNasc: aluno.dataNasc,
    })

    return JSON.stringify({ sucesso: true })
  } catch (e) {
    return JSON.stringify({ sucesso: false, erro: e.message })
  }
}

// ─── Aniversariantes do dia ───────────────────────────────────────────────────
// Equivalente ao filtro por mês e dia em getAniversariantes()
export async function getAniversariantes() {
  try {
    const hoje = new Date()
    const mesHoje = String(hoje.getMonth() + 1).padStart(2, '0')
    const diaHoje = String(hoje.getDate()).padStart(2, '0')

    const snap = await getDocs(alunosRef)
    const aniversariantes = snap.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .filter((aluno) => {
        const [, mes, dia] = aluno.dataNasc.split('-')
        return mes === mesHoje && dia === diaHoje
      })

    return aniversariantes
  } catch (e) {
    return []
  }
}