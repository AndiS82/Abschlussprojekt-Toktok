import { Link } from 'react-router-dom';
import NavbarBottom from '../../components/NavbarBottom/NavbarBottom';
import './ProfilePage.css'

const ProfilePage = () => {
    return (
        <div>
            <Link to="/EditProfile">TEMP LINK EDIT PROFILE</Link>
            <NavbarBottom />
        </div>
    );
}

export default ProfilePage;