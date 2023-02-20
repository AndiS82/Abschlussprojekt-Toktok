import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '../../components/BackButton/BackButton';
import Gallery from '../../components/Gallery/Gallery';
import NavbarBottom from '../../components/NavbarBottom/NavbarBottom';
import ProfilMini from '../../components/ProfilMini/ProfilMini.jsx';
import { UserContext } from '../../contexts/UserContext';
import './ProfilePage.css'
import { TbArrowBarDown } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";
import { BsBookmarkStar } from "react-icons/bs";
import { IoQrCode } from "react-icons/io5";
import { TfiTimer } from "react-icons/tfi";
import { HiOutlineArchiveBoxArrowDown } from "react-icons/hi2";
import { FiSettings } from "react-icons/fi";
import { VscGrabber } from "react-icons/vsc";
import SettingsView from '../../components/SettingsView/SettingsView';

const ProfilePage = ({ setUserData, setUserLoaded, userLoaded, setShowSettings, showSettings }) => {
    const nav = useNavigate()
    const user = useContext(UserContext)

    useEffect(() => {
        const getUser = async () => {
            setUserLoaded(false)
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user`,
                {
                    credentials: 'include'
                })
            if (response.ok) {
                const data = await response.json()
                setUserData(data)
                setUserLoaded(true)
                // console.log(data)
            }
            else {
                nav('/')
            }
        }
        getUser()
    }, [])

    const logout = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/logout`, {
            credentials: 'include'
        })
        if (response.ok) {
            nav('/')
        } else {
            console.log('problem logging out')
        }

    }

    const [checked, setChecked] = useState(false)

    return (
        <main className='profile-container'>
            {userLoaded && <>
                <div className='profile-topbar'>
                    <BackButton />
                    <p onClick={logout}>Logout</p>
                </div>

                <ProfilMini showSettings={showSettings} setShowSettings={setShowSettings} />
                <Link to="/editprofile">TEMP LINK TO EDIT PROFILE</Link>
                <Gallery user={user} />
                <NavbarBottom />
                <label htmlFor="burger" className='burgerClicker' onClick={() => setShowSettings(prev => !prev)}>
                    <span className='grabberSkew'><VscGrabber className='grabberIcon' /></span>
                </label>
                {showSettings &&
                    <SettingsView showSettings={showSettings} setShowSettings={setShowSettings} />}
            </>}
            {!userLoaded && <p>Loading ...</p>}
        </main >
    );
}

export default ProfilePage;