const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  // ⚠️ Removido: buscarAlunos, cadastrarAluno, excluirAluno, editarAluno
  // Essas funções agora são chamadas direto via studentService.js → Firebase

  // Mantido: canal de navegação usado pela notificação de aniversariantes
  onNavegar: (callback) => ipcRenderer.on('navegar-para-cadastrados', callback),

  // Mantido: envia lista de aniversariantes para o main.js exibir a notificação
  notificarAniversariantes: (aniversariantes) =>
    ipcRenderer.invoke('notificar:aniversariantes', aniversariantes),
})