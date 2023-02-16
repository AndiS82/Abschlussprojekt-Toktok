import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import './LoginPages.css';
import LoginLogo from '../../img/LoginLogo.png';
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { MdEmail } from "react-icons/md"
import { HiLockClosed } from "react-icons/hi"

const LoginPages = ({ setUser, setUserData }) => {

    const [isActive, setIsActive] = useState(false);
    const [pwShown, setPwShown] = useState(false)
    const nav = useNavigate()
    const emailRef = useRef()
    const passwordRef = useRef()

    const handleClick = () => {
        setIsActive(prev => !prev);
    }

    const togglePw = () => {
        setPwShown(!pwShown)
    }

    const userData = async (e) => {
        e.preventDefault()
        const form = {
            user: emailRef.current.value,
            password: passwordRef.current.value
        }
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/${isActive ? 'register' : 'login'}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(form)
        })

        if (response.ok) {
            if (isActive === false) {
                nav('/home')
                setUser(true)
            }
            else {
                nav('/login')
                setIsActive(false)
            }
        }
        else {
            console.log('fetch failed')
        }
    }

    return (
        <div className='loginMainStyle'>
            <h1 className='loginTitle'>{isActive ? "Create your" : "Login to your"} <br />Account</h1>
            <img className='loginLogo' src={LoginLogo} alt="Login Logo"></img>
            <form className='loginForm'>
                <div className='loginDiv' >
                    <MdEmail className="loginIcon" />
                    <input ref={emailRef} type='email' placeholder='Email'>
                    </input>
                </div>
                <div className='loginDiv' >
                    <div>
                        <HiLockClosed className="loginIcon" />
                        <input ref={passwordRef} type={pwShown ? "text" : "password"} placeholder='Password' />
                    </div>
                    <AiOutlineEyeInvisible onClick={togglePw} className='showPWIcon' />
                    {/* AiOutlineEye */}
                </div>
                <button className='pinkButton' onClick={userData} type='submit'>{isActive ? "Sign up" : "Sign in"}</button>
            </form>
            <div className='loginFooter'>
                <p>{isActive ? "Already have an account?" : "Don't have an account?"}</p>
                <button onClick={handleClick} className='inTextButton'>{isActive ? "Sign in" : "Sign up"}</button>
            </div>
        </div>
    );
}
export default LoginPages;