import './HomePage.css'
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import MiniLogo from '../../img/LogoMini.png';
import Profil from '../../components/Profil/Profil';
import { useEffect, useState } from 'react';
import NavbarBottom from '../../components/NavbarBottom/NavbarBottom.jsx';

const HomePage = ({ setUserData, userData }) => {
    const [feed, setFeed] = useState(null)

    useEffect(() => {
        const getUser = async () => {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user`,
                {
                    credentials: 'include'
                })
            if (response.ok) {
                const data = await response.json()
                setUserData(data)
                // console.log(data)
            }
            else {
                // console.log('failed to get user')
            }
        }
        getUser()
    }, [])

    useEffect(() => {
        const getFeed = async () => {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/posts`,
                {
                    credentials: 'include'
                })
            if (response.ok) {
                const data = await response.json()
                await setFeed(data)
            }
            else {
                console.log('feed not loaded')
            }
        }
        getFeed()
    }, [])
    console.log(feed)
    return (
        <div>
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
                {feed?.map((singlePost, key) => {
                    return <Profil key={key} singlePost={singlePost} />
                })}
            </div>
            <NavbarBottom />
        </div>
    );
};

export default HomePage;