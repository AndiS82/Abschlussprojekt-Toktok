import './ProfilMini.css';
import { TbDotsCircleHorizontal } from "react-icons/tb";
import placeholderImg from "../../img/ProfileImgPlaceholder.png"
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import SettingsView from '../SettingsView/SettingsView.jsx';
import { Link } from 'react-router-dom';

const ProfilMini = ({ showSettings, setShowSettings, singlePost, post }) => {
    // {  }
    const user = useContext(UserContext)
    console.log('singlePost', singlePost.user.image.url)
    console.log('post', post)
    return (
        <div>
            <nav className="miniProfil">
                <div>
                    {!singlePost && !post &&
                        <Link to={`/Profile/${user._id}`}>
                            <div>
                                <img src={user?.image?.url ? user.image.url : placeholderImg} alt={user?.username} />
                                <div className='description'>
                                    <h1>{user?.username ? user?.username : 'username'}</h1>
                                    <p>{user?.occupation ? user?.occupation : 'occupation'}</p>
                                </div>
                            </div>
                        </Link>
                    }
                    {singlePost &&
                        <Link to={`/Profile/${singlePost?.user?._id}`}>
                            <div className='miniProfilDetail'>
                                <img src={singlePost?.user?.image?.url ? singlePost?.user?.image?.url : placeholderImg} alt={singlePost?.user?.username} />
                                <div className='description'>
                                    <h1>{singlePost?.user?.username}</h1>
                                    <p>{singlePost?.user?.occupation}</p>
                                </div>
                            </div>
                        </Link>
                    }
                    {post &&
                        <Link to={`/Profile/${post?.user?._id}`}>
                            <div>
                                <img src={post?.user?.image ? post?.user?.image : placeholderImg} alt={post?.user?.username} />
                                <div className='description'>
                                    <h1>{post?.username ? post?.username : 'username'}</h1>
                                    <p>{post?.occupation ? post?.occupation : 'occupation'}</p>
                                </div>
                            </div>
                        </Link>
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