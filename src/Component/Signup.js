import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import AlertContext from '../context/alert/alertContext';

const Signup = () => {
    const { showAlert } = useContext(AlertContext);
    const [cered, setCred] = useState({ name: "", email: "", password: "", Cpassword: "" });
    let navigate = useNavigate();
    const handleRquest = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: cered.name,email: cered.email, password: cered.password })
        });
        const data = await response.json();
        if (data.success) 
        {
            localStorage.setItem("token", data.token);
            navigate("/");
            showAlert("Account Created Successfully", "success");
        }
        else {
            showAlert("invalid Credential", "danger");
        }
    }
    const OnInput = (e) => {
        setCred({ ...cered, [e.target.name]: e.target.value });
    }
    return (
        <div className='container-md px-10'>
            <h2>Create Account to Use Digital Notebook</h2>
            <form onSubmit={handleRquest}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' onChange={OnInput} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' required  onChange={OnInput} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" required minLength={ 6} onChange={OnInput} name='password' />
                </div>
                <div className="mb-3">
                    <label htmlFor="Cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="Cpassword" required minLength={6} onChange={OnInput} name='Cpassword' />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Signup
