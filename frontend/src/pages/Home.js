import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toastError, toastSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home() {
  const [loggedInUser, setLoggedInUser] = React.useState('');
  const [products, setProducts] = React.useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    setLoggedInUser(localStorage.getItem('loggedInUsername'));
  },[]);

  const handleClick = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('loggedInUsername');
    toastSuccess('Logged out successfully');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  }

  const fetchProducts = async ()=> {
    try{
      const url = 'https://mern-app-api-lyart.vercel.app/products';
      const headers = {
        headers : {
          'Authorization' : localStorage.getItem('jwtToken')
        }
      }
      const respone = await fetch(url,headers);
      const result = await respone.json();
      console.log(result);
      setProducts(result);
    }
    catch(err){
      toastError(err);
    }
  }

  React.useEffect(()=>{
    fetchProducts();
  },[]);

  return (
    <div>
      <h1>HELLO Welcome! {loggedInUser}</h1>
      <button onClick={handleClick}>Logout</button>
      <div>
        {
          products && products?.map((item,index)=>(
            <ul key={index}>
              <span>{item.name} : {item.price}</span>
            </ul>
          ))
        }
        </div>
      <ToastContainer /> 
    </div>
  )
}

export default Home
