import { useContext } from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../../components/BackButton/BackButton';
import Gallery from '../../components/Gallery/Gallery';
import NavbarBottom from '../../components/NavbarBottom/NavbarBottom';
import ProfilMini from '../../components/ProfilMini/ProfilMini';
import { UserContext } from '../../contexts/UserContext';
import './ProfilePage.css'

const ProfilePage = () => {

    const user = useContext(UserContext)

    return (
        <div>
            <BackButton />
            <ProfilMini />
            <Link to="/editprofile">TEMP LINK TO EDIT PROFILE</Link>
            <Gallery user={user} />
            <NavbarBottom />
        </div>
    );
}

export default ProfilePage;