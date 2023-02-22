import './ProfilMini.css';
import { TbDotsCircleHorizontal } from "react-icons/tb";
import placeholderImg from "../../img/ProfileImgPlaceholder.png"
import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import SettingsView from '../SettingsView/SettingsView.jsx';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const ProfilMini = ({ showSettings, setShowSettings, singlePost, post }) => {
    // {  }
    const user = useContext(UserContext)
    // console.log('singlePost', singlePost?.user)
    const [profile, setProfile] = useState()
    // console.log('post', post)


    // fetch den User Datensatz, der zu den user._id im Post gehört
    useEffect(() => {
        const getUserData = async () => {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/profile/${singlePost?.user}`,
                { credentials: 'include' })
            if (response.ok) {
                const data = await response.json()
                setProfile(data)
                // console.log('profilemini', data)
            }
        }
        getUserData()
        // eslint-disable-next-line 
    }, [])

    console.log("hier " + user?._id)
    console.log("hier " + profile?._id)
    console.log("hier " + profile?.username)
    console.log("singlePost " + singlePost?.user?._id)

    return (
        <div>
            <nav className="miniProfil">
                <div>
                    {!singlePost && !post &&
                        <Link to={`/Profile/${user?._id}`}>

                            <div>
                                <img src={user?.image?.url ? user?.image?.url : placeholderImg} alt={user?.username} />
                                <div className='description'>
                                    <h1 className="miniProfilH1">{user?.username ? user?.username : 'username'}</h1>
                                    <p className="miniProfilP">{user?.occupation ? user?.occupation : 'occupation'}</p>
                                </div>
                            </div>
                        </Link>
                    }
                    {profile &&
                        <Link to={`/Profile/${singlePost?.user}`}>
                            <div className='miniProfilDetail'>
                                <img src={profile?.image?.url ? profile?.image?.url : placeholderImg} alt={singlePost?.user?.username} />
                                <div className='description'>
                                    <h1 className="miniProfilH1">{profile?.username}</h1>
                                    <p className="miniProfilP">{profile?.occupation}</p>
                                </div>
                            </div>
                        </Link>
                    }
                    {post &&
                        <Link to={`/Profile/${post?.user}`}>
                            <div>
                                <img src={post?.user?.image ? post?.user?.image : placeholderImg} alt={post?.user?.username} />
                                <div className='description'>
                                    <h1 className="miniProfilH1">{post?.username ? post?.username : 'username'}</h1>
                                    <p className="miniProfilP">{post?.occupation ? post?.occupation : 'occupation'}</p>
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