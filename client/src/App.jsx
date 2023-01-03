import './assets/App.css'
import "./assets/index.css"
import { Welcome, About, Homepage, Comparison, Profile } from './pages'
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
          <Route path="/comparison" element={<Comparison />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
