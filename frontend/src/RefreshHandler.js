import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function RefreshHandler({ setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();

    React.useEffect(()=>{
        if(localStorage.getItem('jwtToken')){
            setIsAuthenticated(true);
            if(location.pathname === '/login' ||
            location.pathname === '/signup' ||
            location.pathname === '/'){
                navigate('/home', {replace: false});
            }
        }
    },[location, navigate, setIsAuthenticated]);

  return (
    null
  )
}

export default RefreshHandler
