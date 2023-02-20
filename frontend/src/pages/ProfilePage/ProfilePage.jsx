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
        <main className='profile-container'>
            {userLoaded && <>
                <div className='profile-topbar'>
                    <BackButton />
                    <p onClick={logout}>Logout</p>
                </div>
                <section className='profileHeader'>
                    <div className='imageIconContainer'><img className='iconImage' src={MiniLogo} alt="toktok"></img>
                    </div>
                    <h3 className='profileH3'>{user.username}</h3>
                    <div className='imageIconContainer'>
                        <Link to={"/Newpost"}><img className='iconImage' src={UploadLogo} alt="upload"></img></Link>
                        <Link to={"/EditProfile"}><img className='iconImage' src={WriteLogo} alt="write"></img></Link>
                        <Link to={"/UnderConstruction"}><img className='iconImage' src={EditLogo} alt="edit"></img></Link>
                    </div>
                </section>
                <section className='mainProfile'>
                    <h3 className='profileH3'>{user.name}</h3>
                    <p>{user.occupation}</p>
                    <p>{user.aboutMe}</p>
                    <p>{user.website}</p>
                </section>
                <div>
                    <p>{user.numberOfPosts}Posts</p>
                    <p>{user.followedBy.length}Followers</p>
                    <p>{user.following.length}Following</p>
                </div>
                <Gallery user={user} />
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