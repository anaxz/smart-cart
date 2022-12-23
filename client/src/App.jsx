import './assets/App.css'
import "./assets/index.css"
import { Welcome, About } from './pages'
import {Navbar, Auth} from "./components"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Darknavbar } from './layout';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './components/login';

function App() {

  return (
    <>
    <Darknavbar className="sticky-top"/>
    {/* <div className="App">
      <Navbar />
    </div> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/about" element={<About />} />
        <Route path="/Auth" element={<Auth />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
