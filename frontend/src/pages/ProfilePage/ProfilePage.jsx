import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../../components/BackButton/BackButton';
import Gallery from '../../components/Gallery/Gallery';
import NavbarBottom from '../../components/NavbarBottom/NavbarBottom';
import ProfilMini from '../../components/ProfilMini/ProfilMini.jsx';
import { UserContext } from '../../contexts/UserContext';
import './ProfilePage.css'

const ProfilePage = ({ setUserData, setUserLoaded, userLoaded }) => {

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
                // console.log('failed to get user')
            }
        }
        getUser()
    }, [])

    return (
        <div>
            {userLoaded && <>
                <BackButton />
                <ProfilMini />
                <Link to="/editprofile">TEMP LINK TO EDIT PROFILE</Link>
                <Gallery user={user} />
                <NavbarBottom />
            </>}
            {!userLoaded && <p>Loading ...</p>}
        </div>
    );
}

export default ProfilePage;