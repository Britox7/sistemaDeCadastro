const { app } = require('electron')
const path = require('path')
const Database = require('better-sqlite3')

// Initialize database
const db = new Database(path.join(app.getPath('userData'), 'database.db'))

// Create table if not exists
db.exec(`
  CREATE TABLE IF NOT EXISTS alunos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    curso TEXT NOT NULL,
    dataNasc TEXT NOT NULL
  )
`)

// Database operations
exports.getAlunos = () => {
  return JSON.stringify(db.prepare('SELECT * FROM alunos').all())
}

exports.createAluno = (aluno) => {
  try {
    const existe = db.prepare('SELECT * FROM alunos WHERE LOWER(nome) = LOWER(?)').get(aluno.nome);
    if (existe) {
      return JSON.stringify({ sucesso: false, erro: 'Aluno com esse nome já cadastrado.' });
    }
    db.prepare('INSERT INTO alunos (nome, curso, dataNasc) VALUES (?, ?, ?)').run(aluno.nome, aluno.curso, aluno.dataNasc);
    return JSON.stringify({ sucesso: true });
  } catch (e) {
    return JSON.stringify({ sucesso: false, erro: e.message });
  }
}

exports.deleteAluno = (id) => {
  return db.prepare('DELETE FROM alunos WHERE id = ?').run(id)
}

exports.updateAluno = (aluno) => {
  // Check for duplicate name (case-insensitive) excluding current aluno
  const existe = db.prepare('SELECT * FROM alunos WHERE LOWER(nome) = LOWER(?) AND id != ?').get(aluno.nome, aluno.id);
  if (existe) {
    return JSON.stringify({ sucesso: false, erro: 'Aluno com esse nome já cadastrado.' });
  }
  
  // Validate date of birth is not before 1900 or after current year
  const dataNasc = new Date(aluno.dataNasc);
  const anoAtual = new Date().getFullYear();
  
  if (dataNasc.getFullYear() < 1900 || dataNasc.getFullYear() > anoAtual) {
    return JSON.stringify({ sucesso: false, erro: 'A data de nascimento deve ser entre 1900 e o ano atual.' });
  }
  
  db.prepare('UPDATE alunos SET nome = ?, curso = ?, dataNasc = ? WHERE id = ?').run(aluno.nome, aluno.curso, aluno.dataNasc, aluno.id);
  return JSON.stringify({ sucesso: true });
}

exports.getAniversariantes = () => {
  const hoje = new Date()
  const mesHoje = String(hoje.getMonth() + 1).padStart(2, '0')
  const diaHoje = String(hoje.getDate()).padStart(2, '0')

  const alunos = db.prepare('SELECT * FROM alunos').all()
  return alunos.filter((aluno) => {
    const [, mes, dia] = aluno.dataNasc.split('-')
    return mes === mesHoje && dia === diaHoje
  })
}