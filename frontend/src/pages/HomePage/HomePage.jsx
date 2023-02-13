import './HomePage.css'
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import MiniLogo from '../../img/LogoMini.png';
import ProfilMini from '../../components/ProfilMini/ProfilMini';

const HomePage = () => {
    return (
        <>
            <div>
                <nav className="homeNavbar">
                    <img src={MiniLogo} alt="MiniLogo" />
                    <Link to="/Home">
                        <h1>Toktok</h1>
                    </Link>
                    <Link to="/UnderConstruction">
                        <FaRegHeart className="homeIcon" />
                    </Link>
                </nav>
            </div>
            <ProfilMini />
        </>
    );
};


export default HomePage;