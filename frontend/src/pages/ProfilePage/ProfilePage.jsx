import { Link } from 'react-router-dom';
import NavbarBottom from '../../components/NavbarBottom/NavbarBottom';
import Profil from '../../components/Profil/Profil';
import './ProfilePage.css'

const ProfilePage = () => {

    return (
        <div>
            <Link to="/EditProfile">TEMP LINK EDIT PROFILE</Link>
            <Profil />
            <NavbarBottom />
        </div>
    );
}

export default ProfilePage;