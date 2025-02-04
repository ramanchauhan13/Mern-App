import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { toastError, toastSuccess } from '../utils'

function Login() {
    const[loginInfo, setLogininfo] = React.useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log(name, value)

        const copyLoginInfo ={...loginInfo};
        copyLoginInfo[name] = value;
        setLogininfo(copyLoginInfo);

    }

    const handleSignup = async (e) => {
        e.preventDefault(); 
        console.log('Login Info:', loginInfo)
        const {email, password} = loginInfo;
        if(!email || !password){
            return toastError('All fields are required');
        }
    try{
        const url = 'https://mern-app-api-lyart.vercel.app/auth/login';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginInfo)
        });
            const result = await response.json();
            const {success, message, token, name, error} = result;
            if(success){
                toastSuccess(message);
                localStorage.setItem('jwtToken', token);
                localStorage.setItem('loggedInUsername', name);
                setTimeout(() => {
                    navigate('/home');
                },1000);
                console.log(result);
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
        <h1>Login</h1>
        <form onSubmit={handleSignup}>
            <div>
                <label htmlFor="email">Email</label>
                <input
                onChange={handleChange} 
                type="email" 
                id="email" 
                name="email"
                value={loginInfo.email} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                onChange={handleChange} 
                type="password" 
                id="password" 
                name="password"
                value={loginInfo.password} />
            </div>
            <button type="submit">Login</button>
            <span>Dont have an account? <Link to='/signup'>Signup</Link> </span>
        </form>
        <ToastContainer />
    </div>
  )
}

export default Login
