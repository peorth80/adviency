import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>Regalos:</h1>
      <ul>
        <li>Medias</li>
        <li>Caramelos</li>
        <li>Vitel Tone</li>
      </ul>
    </div>
  )
}

export default App
