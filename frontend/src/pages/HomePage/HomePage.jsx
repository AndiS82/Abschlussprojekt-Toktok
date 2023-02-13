import './HomePage.css'
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import MiniLogo from '../../img/LogoMini.png';
import Profil from '../../components/Profil/Profil';

const HomePage = () => {
    return (
        <>
            <div>
                <nav className="homeNavbar">
                    <div>
                        <img src={MiniLogo} alt="MiniLogo" />
                        <h1>TokTok</h1>
                    </div>
                    <Link to="/UnderConstruction">
                        <FaRegHeart className="homeIcon" />
                    </Link>
                </nav>
            </div>
            <Profil />
        </>
    );
};


export default HomePage;