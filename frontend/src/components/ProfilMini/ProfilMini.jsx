import './ProfilMini.css';
import { Link } from "react-router-dom";
import { TbDotsCircleHorizontal } from "react-icons/tb";

const ProfilMini = ({ singlePost }) => {
    return (
        <div>
            <nav className="miniProfil">
                <div>
                    <img src={singlePost?.user?.image} alt={singlePost?.user?.username} />
                    <div className='description'>
                        <h1>{singlePost?.user?.username}</h1>
                        <p>{singlePost?.user?.occupation}</p>
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