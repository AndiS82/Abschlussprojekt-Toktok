import './ProfilMini.css';
import { Link } from "react-router-dom";
import { TbDotsCircleHorizontal } from "react-icons/tb";

const ProfilMini = () => {
    return (
        <div>
            <nav className="miniProfil">
                <div>
                    <img src='https://source.unsplash.com/random/?face' alt="User Picture Placeholder" />
                    <div className='description'>
                        <h1>Max_Mustermann</h1>
                        <p>Fullstack Web Developer</p>
                    </div>
                </div>
                <Link to="/UnderConstruction">
                    <TbDotsCircleHorizontal className="miniProfilIcon" />
                </Link>
            </nav>
        </div>

    );
};

export default ProfilMini;