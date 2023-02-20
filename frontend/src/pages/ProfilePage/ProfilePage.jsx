import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '../../components/BackButton/BackButton';
import Gallery from '../../components/Gallery/Gallery';
import NavbarBottom from '../../components/NavbarBottom/NavbarBottom';
// import ProfilMini from '../../components/ProfilMini/ProfilMini.jsx';
import MiniLogo from '../../img/LogoMini.png';
import UploadLogo from '../../img/upload.png';
import WriteLogo from '../../img/write.png';
import EditLogo from '../../img/edit.png';
import { UserContext } from '../../contexts/UserContext';
import './ProfilePage.css'
import { VscGrabber } from "react-icons/vsc";
import warteUhr from '../../img/Frame.png'
import SettingsView from '../../components/SettingsView/SettingsView';
import categoryIMG from '../../img/Category.png';
import ImagePlaceholder from '../../img/ProfileImgPlaceholder.png';

const ProfilePage = ({ setUserData, setUserLoaded, userLoaded, setShowSettings, showSettings }) => {
    const nav = useNavigate()
    const user = useContext(UserContext)

    useEffect(() => {
        const getUser = async () => {
            setUserLoaded(false)
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user`,
                {
                    credentials: 'include'
                })
            if (response.ok) {
                const data = await response.json()
                setUserData(data)
                setUserLoaded(true)
                // console.log(data)
            }
            else {
                nav('/')
            }
        }
        getUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log(user)

    const logout = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/logout`, {
            credentials: 'include'
        })
        if (response.ok) {
            nav('/')
        } else {
            console.log('problem logging out')
        }

    }

    return (
        <main>
            {userLoaded && <>
                <div className='profile-container'>
                    <div className='profile-topbar'>
                        <BackButton />
                        <p onClick={logout}>Logout</p>
                    </div>
                    <section className='profileHeader'>
                        <div className='imageIconContainer'>
                            <img src={MiniLogo}></img>
                            <h3 className='profileH3'>{user.username}</h3>
                        </div>
                        <div className='imageIconContainer1'>
                            <Link to={"/Newpost"}><img className='iconImage' src={UploadLogo}></img></Link>
                            <Link to={"/EditProfile"}><img className='iconImage' src={WriteLogo}></img></Link>
                            <Link to={"/UnderConstruction"}><img className='iconImage' src={EditLogo}></img></Link>
                        </div>
                    </section>
                    <section className='mainProfile'>
                        <img src={user.image.url ? user.image.url : ImagePlaceholder} alt="placeholder" />
                        <h3 className='profileH3'>{user.name}</h3>
                        <p>{user.occupation}</p>
                        <p>{user.aboutMe}</p>
                        <p>{user.website}</p>
                    </section>
                    <div className='postsFollowers'>
                        <div>
                            <p className='postsFollowersNumber'>{user.numberOfPosts}</p>
                            <p className='postsFollowersText'>Posts</p>
                        </div>
                        <div>
                            <p className='postsFollowersNumber'>{user.followedBy.length}</p>
                            <p className='postsFollowersText'>Followers</p>
                        </div>
                        <div>
                            <p className='postsFollowersNumber'>{user.following.length}</p>
                            <p className='postsFollowersText'>Following</p>
                        </div>
                    </div>

                    <Gallery user={user} />
                </div>
                <NavbarBottom />
                <label htmlFor="burger" className='burgerClicker' onClick={() => setShowSettings(prev => !prev)}>
                    <span className='grabberSkew'><VscGrabber className='grabberIcon' /></span>
                </label>
                {showSettings &&
                    <SettingsView showSettings={showSettings} setShowSettings={setShowSettings} />}
            </>}

            {!userLoaded && <div className="notLoadedDiv">
                <p className='loadingP'>Loading ...</p>
                <img className='warteUhr' src={warteUhr} alt='Warteuhr' />
            </div>
            }</main >
    );
}

export default ProfilePage;