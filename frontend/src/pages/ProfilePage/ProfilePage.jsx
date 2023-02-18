import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '../../components/BackButton/BackButton';
import Gallery from '../../components/Gallery/Gallery';
import NavbarBottom from '../../components/NavbarBottom/NavbarBottom';
import ProfilMini from '../../components/ProfilMini/ProfilMini.jsx';
import { UserContext } from '../../contexts/UserContext';
import './ProfilePage.css'

const ProfilePage = ({ setUserData, setUserLoaded, userLoaded }) => {
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

    return (
        <main className='profile-container'>
            {userLoaded && <>
                <div className='profile-topbar'>
                    <BackButton />
                    <p onClick={logout}>Logout</p>
                </div>

                <ProfilMini />
                <Link to="/editprofile">TEMP LINK TO EDIT PROFILE</Link>
                <Gallery user={user} />
                <NavbarBottom />
            </>}
            {!userLoaded && <p>Loading ...</p>}
        </main>
    );
}

export default ProfilePage;