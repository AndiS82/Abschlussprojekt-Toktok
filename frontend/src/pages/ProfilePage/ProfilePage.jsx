import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '../../components/BackButton/BackButton';
import Gallery from '../../components/Gallery/Gallery';
import NavbarBottom from '../../components/NavbarBottom/NavbarBottom';
// import Profil from '../../components/Profil/Profil';
import ProfilMini from '../../components/ProfilMini/ProfilMini';
import { UserContext } from '../../contexts/UserContext';
import './ProfilePage.css'

const ProfilePage = () => {
    const nav = useNavigate()

    const user = useContext(UserContext)

    return (
        <div>
            <BackButton />
            <ProfilMini />
            <Gallery user={user} />
            <NavbarBottom />
        </div>
    );
}

export default ProfilePage;