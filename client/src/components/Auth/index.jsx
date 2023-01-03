import React, { useState } from "react"
import { useNavigate } from "react-router-dom";

const Auth = (props) => {
  let [authMode, setAuthMode] = useState("signin")
  const navigate = useNavigate();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  const loginSubmit = async (e) => {
    e.preventDefault();
    const url = 'http://127.0.0.1:5000'
    const data = {email: email, password: password}

    try {
      await fetch(`${url}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(response => {
        if(response.ok){
          response.json()
        } 
        else console.log(response.text())
      })
      .then(data => {
          console.log('--login response')
          console.log(data)
          setEmail('')
          setPassword('')
          navigate('/')
      })
    } catch(err){
      console.log(err)
      return err
    }

  }

  const signupSubmit = (e) => {
    e.preventDefault();
    const data = {name: name, email: email, password: password}
    
    if(password1 !== password2) console.log('repeated password dont match')
    else {
      fetchSignup(data)
    }
  }

  async function fetchSignup(data){
    try {
      const url = 'http://127.0.0.1:5000'
      const response = await fetch(`${url}/signup`,  {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      let result = null;
      if(response.ok){
        result = response.json()
      } else {
        console.log('--signup fail response')
        console.log(response.data)
      }

      if(result != null){
        console.log('--signup response')
        console.log(response.data)
        setEmail('')
        setPassword1('')
        setPassword2('')
        // navigate('/auth')
      }

    } catch(err){
        console.log(err)
        return err
    }
  }
  

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={loginSubmit} >
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label htmlFor='email'>Email address</label>
              <input
                type="email" name="email"
                id="email" value={email}
                className="form-control mt-1"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="password">Password</label>
              <input
                type="password" name="password"
                id="password" value={password}
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary" >
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={signupSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label htmlFor="name">Full Name</label>
            <input
              type="text" name="name"
              id="name" value={name}
              className="form-control mt-1"
              placeholder="e.g Abdul Kamara"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="email">Email address</label>
            <input
              type="email" name="email"
              id="email" value={email}
              className="form-control mt-1"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="password1">Password</label>
            <input
              type="password" name="password1"
              id="password1" value={password1}
              className="form-control mt-1"
              placeholder="Password"
              onChange={(e) => setPassword1(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="password2">Repeat Password</label>
            <input
              type="password" name="password2"
              id="password2" value={password2}
              className="form-control mt-1"
              placeholder="Repeat Password"
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" >
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Auth
