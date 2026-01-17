import { useState } from 'react'
import './App.css'

function backgroundImage() {
  return "url('/src/assets/background.jpg')"
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
       <p className="header_font">Hello, World!</p>
    </div>
  )
}

export default App
