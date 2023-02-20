import { useContext, useEffect, useState } from 'react';
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
import { TbArrowBarDown } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";
import { BsBookmarkStar } from "react-icons/bs";
import { IoQrCode } from "react-icons/io5";
import { TfiTimer } from "react-icons/tfi";
import { HiOutlineArchiveBoxArrowDown } from "react-icons/hi2";
import { FiSettings } from "react-icons/fi";
import { VscGrabber } from "react-icons/vsc";
import warteUhr from '../../img/Frame.png'

const ProfilePage = ({ setUserData, setUserLoaded, userLoaded }) => {
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

    const [showSettings, setShowSettings] = useState(true)
    const [checked, setChecked] = useState(false)

    return (
        <main className='profile-container'>
            {userLoaded && <>
                <div className='profile-topbar'>
                    <BackButton />
                    <p onClick={logout}>Logout</p>
                </div>

                <section className='profileHeader'>
                    <div className='imageIconContainer'><img className='iconImage' src={MiniLogo}></img>
                    </div>
                    <h3 className='profileH3'>{user.username}</h3>
                    <div className='imageIconContainer'>
                        <Link to={"/Newpost"}><img className='iconImage' src={UploadLogo}></img></Link>
                        <Link to={"/EditProfile"}><img className='iconImage' src={WriteLogo}></img></Link>
                        <Link to={"/UnderConstruction"}><img className='iconImage' src={EditLogo}></img></Link>
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
                <label for="burger" className='burgerClicker' onClick={() => setShowSettings(prev => !prev)}>
                    <VscGrabber className='grabberIcon' />
                </label>
                <article className='burgerWrapper'>
                    <div className={checked ? 'greyScreenActive' : 'greyScreenInactive'}></div>
                    <input id="burger" type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
                    <nav className='burgerNav'>
                        <ul>
                            <li><label for="burger" className='burgerDown' onClick={() => setShowSettings(prev => !prev)}><TbArrowBarDown className='barDownBurger' /></label></li>
                            <li><a href={checked ? "/UnderConstruction" : ""}><FiSettings className='advSetIcon' />Settings</a></li>
                            <li><a href="/UnderConstruction"><HiOutlineArchiveBoxArrowDown className='advSetIcon' />Archive</a></li>
                            <li><a href="/UnderConstruction"><TfiTimer className='advSetIcon' />Your Activity</a></li>
                            <li><a href="/UnderConstruction"><IoQrCode className='advSetIcon' />QR Code</a></li>
                            <li><a href="/UnderConstruction"><BsBookmarkStar className='advSetIcon' />Close Friends</a></li>
                            <li><a href="/UnderConstruction"><FaRegHeart className='advSetIcon' />Favourites</a></li>
                        </ul>
                    </nav>
                </article>
            </>}
            {!userLoaded && <div className="notLoadedDiv"><p className='loadingP'>Loading ...</p>
                <img className='warteUhr' src={warteUhr} alt='Warteuhr' />
            </div>}
        </main>
    );
}

export default ProfilePage;