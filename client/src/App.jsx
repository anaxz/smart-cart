import './assets/App.css'
import "./assets/index.css"
import { Welcome, About, Homepage } from './pages'
import { Auth } from "./components"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './components/Login';

function App() {

  return (
    <>

      {/* <div className="App">
      <Navbar />
    </div> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/Auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
