import './assets/App.css'
import "./assets/index.css"
import { Welcome, About, Homepage, Comparison, Profile, SearchResults } from './pages'
import { Auth } from "./components"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
<<<<<<< HEAD
=======
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser, logoutUser } from '../src/reducer'
import { useSelector } from 'react-redux'

>>>>>>> frontend

function App() {

  const [user, setUser] = useState(false)

  const dispatch = useDispatch()
  const items = useSelector(state => state)

  useEffect(() => { 
    setUser(items.user)
  },[])
  console.log('Redux')
  console.log(items)

  const Test = () => {
    if (!items.user) {
      return <Navigate to="/" replace />;
    }
    return <h1>Protected Route</h1>
  }

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
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/test" element={<Test />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
    
  )
}

export default App
