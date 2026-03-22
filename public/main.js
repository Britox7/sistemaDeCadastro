const { app, BrowserWindow, ipcMain, Tray, Menu, Notification } = require('electron')
const path = require('path')
const Database = require('better-sqlite3')

app.setAppUserModelId('com.uniateneu.aniversariantes')

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
})

ipcMain.handle('alunos:excluir', (event, id) => {
  return db.prepare('DELETE FROM alunos WHERE id = ?').run(id)
})

ipcMain.handle('alunos:editar', (event, aluno) => {
  return db.prepare('UPDATE alunos SET nome = ?, curso = ?, dataNasc = ? WHERE id = ?').run(aluno.nome, aluno.curso, aluno.dataNasc, aluno.id)
})

let tray = null
let win = null

function verificarAniversarios() {
  const hoje = new Date()
  const mesHoje = String(hoje.getMonth() + 1).padStart(2, '0')
  const diaHoje = String(hoje.getDate()).padStart(2, '0')

  const alunos = db.prepare('SELECT * FROM alunos').all()
  const aniversariantes = alunos.filter((aluno) => {
    const [, mes, dia] = aluno.dataNasc.split('-')
    return mes === mesHoje && dia === diaHoje
  })

  if (aniversariantes.length > 0) {
    const nomes = aniversariantes.map((a) => a.nome).join(', ')

    const notification = new Notification({
      title: '🎂 Aniversariantes hoje!',
      body: `${aniversariantes.length} aluno(s) fazem aniversário hoje: ${nomes}`,
      icon: path.join(__dirname, 'logo512_new.png')
    })

    notification.on('click', () => {
      win.show()
      win.webContents.send('navegar-para-cadastrados')
    })

    notification.show()

    if (tray) {
      tray.setToolTip(`${aniversariantes.length} aniversariante(s) hoje!`)
    }
  }
}

function createWindow() {
  const isDev = !app.isPackaged;

  win = new BrowserWindow({
    minWidth: 800,
    minHeight: 740,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  require('@electron/remote/main').enable(win.webContents)

  app.setLoginItemSettings({
    openAtLogin: true
  })

  const indexPath = isDev
    ? 'http://localhost:3000'
    : `file://${path.resolve(__dirname, '..', 'build', 'index.html')}`;

  win.loadURL(indexPath);

  win.on('show', () => {
    win.maximize()
  })

  win.on('close', (event) => {
    if (!app.isQuitting) {
      event.preventDefault()
      win.hide()
    }
  })
}

function createTray() {
  const iconPath = path.join(__dirname, 'logo512_new.png')
  tray = new Tray(iconPath)

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Abrir',
      click: () => {
        win.show()
      }
    },
    {
      label: 'Fechar',
      click: () => {
        app.isQuitting = true
        app.quit()
      }
    }
  ])

  tray.setToolTip('Aniversariantes UniATENEU')
  tray.setContextMenu(contextMenu)

  tray.on('click', () => {
    win.show()
  })
}

app.on('ready', () => {
  createWindow()
  createTray()

  
  if (!app.getLoginItemSettings().wasOpenedAtLogin) {
    win.show()
  }

  verificarAniversarios()
  setInterval(verificarAniversarios, 60 * 60 * 1000)
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    
  }
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})