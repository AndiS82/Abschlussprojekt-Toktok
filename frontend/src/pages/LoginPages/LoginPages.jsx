import React, { useState, useEffect } from 'react';
import './LoginPages.css';
import LoginLogo from '../../img/LoginLogo.png';

const LoginPages = () => {

    const [createOrLogin, setCreateOrLogin] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(prev => !prev);
        setCreateOrLogin(prev => !prev);
    }

    return (
        <div>
            <h1>{createOrLogin ? "Create " : "Login to "}your Account</h1>
            <img src={LoginLogo} alt="Login Logo"></img>
            <form>
                <input type='email' placeholder='Email'></input>
                <input type='password' placeholder='Password'></input>
                <button type='submit'>{isActive ? "Sign up" : "Sign in"}</button>
            </form>
            <div>
                <p>Already have an account?</p>
                <button onClick={handleClick} className='ButtonStyle'>{isActive ? "Sign in" : "Sign up"}</button>
            </div>
        </div>
    );
}
export default LoginPages;