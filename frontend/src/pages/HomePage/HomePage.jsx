import './HomePage.css'
import { Link, useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import MiniLogo from '../../img/LogoMini.png';
import { useEffect } from 'react';
import NavbarBottom from '../../components/NavbarBottom/NavbarBottom.jsx';
import Feed from '../../components/Feed/Feed';

const HomePage = ({ setUserData, userLoaded, setUserLoaded, showSettings, setShowSettings }) => {
    const nav = useNavigate()
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

    return (
        <div>
            {userLoaded &&
                <>
                    <div className='homeMainStyle'>
                        <div>
                            <nav className="homeNavbar">
                                <div>
                                    <img src={MiniLogo} alt="MiniLogo" />
                                    <h1>TokTok</h1>
                                </div>
                                <Link to="/UnderConstruction">
                                    <FaRegHeart className="homeIcon" />
                                </Link>
                            </nav>
                        </div>
                        <Feed userLoaded={userLoaded} showSettings={showSettings} setShowSettings={setShowSettings} />
                    </div>
                    <NavbarBottom />
                </>}
            {!userLoaded && <p>Loading ...</p>}
        </div>
    );
};

export default HomePage;