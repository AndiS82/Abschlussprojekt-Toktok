import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
            <p onClick={() => nav(-1)}>PLACEHOLDER - CLICK TO GO BACK</p>

            <Link to="/EditProfile">TEMP LINK EDIT PROFILE</Link>
            <ProfilMini />
            <Gallery user={user} />
            <NavbarBottom />
        </div>
    );
}

export default ProfilePage;