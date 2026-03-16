const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  buscarAlunos: () => ipcRenderer.invoke('alunos:buscar'),
  cadastrarAluno: (aluno) => ipcRenderer.invoke('alunos:cadastrar', aluno),
  excluirAluno: (id) => ipcRenderer.invoke('alunos:excluir', id),
  editarAluno: (aluno) => ipcRenderer.invoke('alunos:editar', aluno),
})