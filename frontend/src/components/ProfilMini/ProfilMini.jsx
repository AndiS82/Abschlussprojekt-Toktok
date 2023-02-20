import './ProfilMini.css';
import { TbDotsCircleHorizontal } from "react-icons/tb";
import placeholderImg from "../../img/ProfileImgPlaceholder.png"
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import SettingsView from '../SettingsView/SettingsView.jsx';

const ProfilMini = ({ showSettings, setShowSettings }) => {
    // { singlePost, post }
    const user = useContext(UserContext)
    console.log(user)
    return (
        <div>
            <nav className="miniProfil">
                <div>
                    {user &&
                        <div>
                            <img src={user?.image?.url ? user?.image?.url : placeholderImg} alt={user?.username} />
                            <div className='description'>
                                <h1>{user?.username ? user?.username : 'username'}</h1>
                                <p>{user?.occupation ? user?.occupation : 'occupation'}</p>
                            </div>
                        </div>
                    }
                </div >
                {/* <Link to="/UnderConstruction"> */}
                <TbDotsCircleHorizontal onClick={() => setShowSettings(prev => !prev)} className={showSettings ? 'showBurgerNav miniProfilIcon' : " miniProfilIcon"} />
                {showSettings &&
                    <SettingsView showSettings={showSettings} setShowSettings={setShowSettings} />}
                {/* </Link> */}
            </nav>
        </div>

    );
};

export default ProfilMini;