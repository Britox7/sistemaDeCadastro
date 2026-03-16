const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
const Database = require('better-sqlite3')

require('@electron/remote/main').initialize()

const db = new Database(path.join(app.getPath('userData'), 'database.db'))

db.exec(`
  CREATE TABLE IF NOT EXISTS alunos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    curso TEXT NOT NULL,
    dataNasc TEXT NOT NULL
  )
`)

ipcMain.handle('alunos:buscar', () => {
  return db.prepare('SELECT * FROM alunos').all()
})

ipcMain.handle('alunos:cadastrar', (event, aluno) => {
  return db.prepare('INSERT INTO alunos (nome, curso, dataNasc) VALUES (?, ?, ?)').run(aluno.nome, aluno.curso, aluno.dataNasc)
})

ipcMain.handle('alunos:excluir', (event, id) => {
  return db.prepare('DELETE FROM alunos WHERE id = ?').run(id)
})

ipcMain.handle('alunos:editar', (event, aluno) => {
  return db.prepare('UPDATE alunos SET nome = ?, curso = ?, dataNasc = ? WHERE id = ?').run(aluno.nome, aluno.curso, aluno.dataNasc, aluno.id)
})

function createWindow() {
  const win = new BrowserWindow({
    minWidth: 800,
    minHeight: 740,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  require('@electron/remote/main').enable(win.webContents)

  win.maximize()

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})