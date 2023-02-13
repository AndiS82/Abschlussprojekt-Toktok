import './HomePage.css'
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import MiniLogo from '../../img/LogoMini.png';

const HomePage = ({ user }) => {
    return (
        <nav className="navbar">
            <img src={MiniLogo} alt="Your Image" />
            <h1>Toktok</h1>
            <Link to="/UnderConstruction">
                <FaRegHeart className="icon" />
            </Link>
        </nav>
    );
};


export default HomePage;