import './assets/App.css'
import "./assets/index.css"
import { Welcome } from './pages'
import {Navbar} from "./components"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Darknavbar } from './layout';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './components/login';

function App() {

  return (
    <>
    <Darknavbar className="sticky-top"/>
    <div className="App">
      <Navbar />
    </div>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
