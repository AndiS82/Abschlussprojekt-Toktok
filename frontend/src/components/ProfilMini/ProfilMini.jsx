import './ProfilMini.css';
import { Link } from "react-router-dom";
import { TbDotsCircleHorizontal } from "react-icons/tb";

const ProfilMini = () => {
    return (
        <div>
            <nav className="miniProfil">
                <img src='' alt="User Picture Placeholder" />
                <div>
                    <h1>Miniaturprofil</h1>
                    <p>Jobbeschreibung</p>
                </div>
                <Link to="/UnderConstruction">
                    <TbDotsCircleHorizontal className="miniProfilIcon" />
                </Link>
            </nav>
        </div>

    );
};

export default ProfilMini;