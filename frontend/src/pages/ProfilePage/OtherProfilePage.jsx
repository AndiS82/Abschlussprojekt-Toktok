import { useEffect, useState, useContext } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import "./OtherProfilePage.css"
import BackButton from '../../components/BackButton/BackButton';
import Gallery from '../../components/Gallery/Gallery';
import NavbarBottom from '../../components/NavbarBottom/NavbarBottom';
import EditLogo from '../../img/edit.png';
import { VscGrabber } from "react-icons/vsc";
import warteUhr from '../../img/Frame.png'
import SettingsView from '../../components/SettingsView/SettingsView';
import ImagePlaceholder from '../../img/ProfileImgPlaceholder.png';
import editIcon from '../../img/Edit_Square.png'
import categoryIMG from '../../img/Category.png';
// import FollowButton from "../../components/FollowButton/FollowButton";
import { HiUserPlus } from "react-icons/hi2";
import { UserContext } from "../../contexts/UserContext";

const OtherProfilePage = ({ setUserData, setUserLoaded, userLoaded, setShowSettings, showSettings }) => {
    const nav = useNavigate()
    const params = useParams()
    const profileId = params.user
    const [profile, setProfile] = useState()
    const [otherFollowing, setOtherFollowing] = useState(false)
    const user = useContext(UserContext);

    console.log(profileId)

    useEffect(() => {
        const getUserProfile = async () => {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/profile/${profileId}`,
                { credentials: 'include' })
            if (response.ok) {
                const data = await response.json()
                setProfile(data)
                console.log(data)
            }
            else {
                console.log('problem displaying profile')
                nav('/UnderConstruction')
            }
        }
        getUserProfile()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profileId])

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

    console.log(profile?._id)

    console.log("userloaded " + user?._id)

    const otherFollowHandler = async () => {
        setOtherFollowing(prev => !prev)
        console.log('follow Handler')

        const body = {
            result: !otherFollowing,
            _id: user._id,
            following: profile._id
        }
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/${user._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(body)
        })
        if (response.ok) {
            console.log('follows updated')
        }
        else {
            console.log('problem with follows')
        }
    }

    return (
        <main>
            {userLoaded && <>
                <div className='profile-container'>
                    <div className='profile-topbar'>
                    </div>
                    <section className='profileHeader'>
                        <div className='imageIconContainer'>
                            <BackButton />
                            <h3 className='profileH3'>{profile?.username}</h3>
                        </div>
                        <div className='imageIconContainer1'>
                            <Link to={"/UnderConstruction"}><img className='iconImage' src={EditLogo} alt="settings"></img></Link>
                        </div>
                    </section>
                    <section className='mainProfile'>
                        <img src={profile?.image?.url ? profile?.image?.url : ImagePlaceholder} alt="placeholder" />
                        <button className={profile?._id === user?._id ? 'profileImgEdit' : 'invisibleImgEdit'}><img src={editIcon} alt="edit" /></button>
                        <h3 className='profileH3'>{profile?.name}</h3>
                        <p>{profile?.occupation}</p>
                        <p>{profile?.aboutMe}</p>
                        <p>{profile?.website}</p>
                    </section>
                    <div className='postsFollowers'>
                        <div>
                            <p className='postsFollowersNumber'>{profile?.posts?.length ? profile?.posts?.length : 0}</p>
                            <p className='postsFollowersText'>Posts</p>
                        </div>
                        <div>
                            <p className='postsFollowersNumber'>{profile?.followedBy?.length ? profile?.followedBy?.length : 0}</p>
                            <p className='postsFollowersText'>Followers</p>
                        </div>
                        <div>
                            <p className='postsFollowersNumber'>{profile?.following?.length ? profile?.following?.length : 0}</p>
                            <p className='postsFollowersText'>Following</p>
                        </div>
                    </div>
                    <div className="followButtonDiv">
                        {/* <FollowButton followedUser={profile} /> */}
                        <button className={otherFollowing ? "otherFollowing" : "otherProfileFollow"} onClick={otherFollowHandler}><HiUserPlus className="otherProfileIcon" />{otherFollowing ? " Following" : " Follow"}</button>
                    </div>
                    <div className='galleryCatIMG'>
                        <img src={categoryIMG} alt="categoryIMG" />
                        <h3>Feeds</h3>
                    </div>
                    <Gallery user={profile} />
                </div>
                <NavbarBottom />
                <label htmlFor="burger" className='burgerClicker' onClick={() => setShowSettings(prev => !prev)}>
                    <span className='grabberSkew'><VscGrabber className='grabberIcon' /></span>
                </label>
                {showSettings &&
                    <>
                        <div className='greyScreenActive'></div>
                        <SettingsView showSettings={showSettings} setShowSettings={setShowSettings} />
                    </>
                }
            </>}

            {!userLoaded && <div className="notLoadedDiv">
                <p className='loadingP'>Loading ...</p>
                <img className='warteUhr' src={warteUhr} alt='Warteuhr' />
            </div>
            }
        </main>
    );
}


export default OtherProfilePage;