import './ProfilMini.css';
import { Link } from "react-router-dom";
import { TbDotsCircleHorizontal } from "react-icons/tb";
import placeholderImg from "../../img/ProfileImgPlaceholder.png"
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const ProfilMini = ({ singlePost }) => {

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