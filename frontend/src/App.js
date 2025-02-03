import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/login';
import Signup from './pages/signup';
import RefreshHandler from './RefreshHandler';

function App() {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const PrivateRoute = ({children})=>{
        return isAuthenticated ? children : <Navigate to="/login" /> 
    };


    return (
        <div className="App">
            <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
            <Routes>
                <Route path="/" element={<Navigate to = '/login' />} />
                <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </div>
    );
}

export default App;