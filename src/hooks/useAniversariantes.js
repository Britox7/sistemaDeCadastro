// src/hooks/useAniversariantes.js
//
// Substitui a função verificarAniversarios() que estava no main.js
// Cole o useEffect abaixo no seu App.js ou na página principal
//
// Exemplo de uso:
//   import { useAniversariantes } from './hooks/useAniversariantes'
//   function App() {
//     useAniversariantes()
//     return (...)
//   }

import { useEffect } from 'react'
import { getAniversariantes } from './services/studentService'

const { ipcRenderer } = window.require('electron')

export function useAniversariantes() {
  useEffect(() => {
    async function verificar() {
      const aniversariantes = await getAniversariantes()
      // Envia para o main.js exibir a notificação nativa do sistema
      ipcRenderer.invoke('notificar:aniversariantes', aniversariantes)
    }

    // Verifica imediatamente ao abrir o app
    verificar()

    // Repete a cada 1 hora (igual ao setInterval que estava no main.js)
    const intervalo = setInterval(verificar, 60 * 60 * 1000)

    return () => clearInterval(intervalo)
  }, [])
}