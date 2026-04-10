import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <Signup />
      <hr />
      <Login />
    </div>
    </>
  )
}

export default App
