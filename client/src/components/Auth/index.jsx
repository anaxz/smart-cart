import React, { useState } from "react"
import { redirect } from "react-router-dom";

const Auth = (props) => {
  let [authMode, setAuthMode] = useState("signin")

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  const loginSubmit = async (e) => {
    e.preventDefault();
    const url = 'http://127.0.0.1:5000'
    const data = {email: 'anah12@gmail.com', password: 'password'}

    try {
      const response = await fetch(`${url}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      console.log(response)

      if(response.ok) {
        console.log('worked')
        return redirect("/");
      }
    } catch(err){
      console.log(err)
    }
  }

  const signupSubmit = (e) => {
    const response = fetch('/signup')
  }

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form" >
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
                type="email"
                name="email"
                id="email"
                className="form-control mt-1"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control mt-1"
                placeholder="Enter password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary"
               onClick={loginSubmit} >
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
      <form className="Auth-form"  method="POST">
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
              type="text"
              name="name"
              id="name"
              className="form-control mt-1"
              placeholder="e.g Abdul Kamara"
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control mt-1"
              placeholder="Email Address"
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="password1">Password</label>
            <input
              type="password"
              name="password1"
              id="password1"
              className="form-control mt-1"
              placeholder="Password"
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="password2">Repeat Password</label>
            <input
              type="password"
              name="password2"
              id="password2"
              className="form-control mt-1"
              placeholder="Repeat Password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary"
             onClick={signupSubmit} >
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
