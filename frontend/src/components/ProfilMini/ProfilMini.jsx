import './ProfilMini.css';
import { Link } from "react-router-dom";
import { TbDotsCircleHorizontal } from "react-icons/tb";
import placeholderImg from "../../img/ProfileImgPlaceholder.png"
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const ProfilMini = ({ singlePost }) => {
    // NOTIZ ZUR CONDITIONAL RENDERING UNTEN:
    // singlePost wurde am HomePage deklariert und trifft die Verwendung dieser Component auf der ProfilePage nicht zu. Von daher, rendern wir mit singlePost daten wenn singlePost überhaupt existiert. Wenn nicht, benutzen wir die daten vom UserContext (dh: auf der ProfilePage wird alles dargestellt mit dem User Daten des eingeloggten Users aus der Datenbank)
    // Wir dürfen nur die Userdaten vom UseContext benutzen, wenn SinglePost nicht existiert. Das vermeidet, dass wir damit die Darstellung des Homepages stören.

    const user = useContext(UserContext)

    console.log(singlePost)
    return (
        <div>
            <nav className="miniProfil">
                <div>
                    {singlePost && <img src={singlePost?.user?.image ? singlePost?.user?.image : placeholderImg} alt={singlePost?.user?.username} />}
                    {!singlePost && <img src={user?.image?.url ? user?.image?.url : placeholderImg} alt={user?.username} />}
                    <div className='description'>
                        {singlePost && <h1>{singlePost?.user?.username}</h1>}
                        {!singlePost && <h1>{user?.username ? user?.username : 'username'}</h1>}
                        {singlePost && <p>{singlePost?.user?.occupation}</p>}
                        {!singlePost && <h1>{user?.occupation ? user?.occupation : 'occupation'}</h1>}
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