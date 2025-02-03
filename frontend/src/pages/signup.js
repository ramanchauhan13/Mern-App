import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { toastError, toastSuccess } from '../utils'

function Signup() {
    const[signupInfo, setSignupInfo] = React.useState({
        name: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log(name, value)

        const copySignupInfo ={...signupInfo};
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);

    }

    const handleSignup = async (e) => {
        e.preventDefault(); 
        console.log('Signup Info:', signupInfo)
        const {name, email, password} = signupInfo;
        if(!name || !email || !password){
            return toastError('All fields are required');
        }
    try{
        const url = 'http://localhost:8080/auth/signup';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupInfo)
        });
            const result = await response.json();
            const {success, message,error} = result;
            if(success){
                toastSuccess(message);
                setTimeout(() => {
                    navigate('/login');
                },1000);
    }
    else if(error){
                const details = error.details;
                toastError(details[0].message); 
    }
    else{
        toastError(message);
    }
    console.log(result);
}
    catch(err){ 
        toastError(err);
    }
}

  return (
    <div className="container">
        <h1>Signup Page</h1>
        <form onSubmit={handleSignup}>
            <div>
                <label htmlFor="name">Name</label>
                <input 
                onChange={handleChange} 
                autoFocus
                type="text" 
                id="name" 
                name="name"
                value={signupInfo.name} />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input
                onChange={handleChange} 
                type="email" 
                id="email" 
                name="email"
                value={signupInfo.email} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                onChange={handleChange} 
                type="password" 
                id="password" 
                name="password"
                value={signupInfo.password} />
            </div>
            <button type="submit">Signup</button>
            <span>Already have an account? <Link to='/login'>Login</Link> </span>
        </form>
        <ToastContainer />
    </div>
  )
}

export default Signup
