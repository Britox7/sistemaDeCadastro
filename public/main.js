const { app, BrowserWindow, ipcMain, Tray, Menu, Notification } = require('electron')
const path = require('path')
const dbUtils = require('../src/utils/database')

app.setAppUserModelId('com.uniateneu.aniversariantes')

if (process.platform === 'win32') {
  app.setAppUserModelId(app.name)
}

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', () => {
    if (win) {
      win.show()
      win.focus()
    }
  })
}

require('@electron/remote/main').initialize()

ipcMain.handle('alunos:buscar', () => {
  return dbUtils.getAlunos()
})

ipcMain.handle('alunos:cadastrar', (event, aluno) => {
  return dbUtils.createAluno(aluno)
})

ipcMain.handle('alunos:excluir', (event, id) => {
  return dbUtils.deleteAluno(id)
})

ipcMain.handle('alunos:editar', (event, aluno) => {
  return dbUtils.updateAluno(aluno)
})

let tray = null
let win = null

function verificarAniversarios() {
  const aniversariantes = dbUtils.getAniversariantes()

  if (aniversariantes.length > 0) {
    const nomes = aniversariantes.map((a) => a.nome).join(', ')

    const notification = new Notification({
      title: '🎂 Aniversariantes hoje!',
      body: `${aniversariantes.length} aluno(s) fazem aniversário hoje: ${nomes}`,
      icon: path.join(__dirname, 'logo512_new.png'),
      silent: false,
      urgency: 'critical'
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
    // Não fecha o app, apenas esconde
  }
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})