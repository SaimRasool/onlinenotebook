import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import AlertContext from '../context/alert/alertContext';

const Login = () => {
    const { showAlert } = useContext(AlertContext);
    const [cered, setCred]=useState({email:"",password:""});
    let navigate=useNavigate();
    const handleRquest = async (e) =>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: cered.email, password:cered.password })
        });
        const data = await response.json(); 
        if (data.success)
        {
            localStorage.setItem("token",data.token); 
            navigate("/");
            showAlert("Login Success Full","success");
        }
        else
        {
            showAlert("invalid Credential", "danger");
        }
    }
    const OnInput = (e) => {
        setCred({ ...cered, [e.target.name]: e.target.value });
    }
  return (
      <div className='container pt-3'>
        <h2>Login to use Digital Note book</h2>
      <form onSubmit={handleRquest}>
          <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" name='email' onChange={OnInput} aria-describedby="emailHelp"/>
                  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" onChange={OnInput} name='password'/>
          </div>
          <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
      </div>
  )
}

export default Login
