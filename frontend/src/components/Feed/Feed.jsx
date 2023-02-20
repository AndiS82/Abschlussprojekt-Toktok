import { useEffect, useState } from 'react'
import Profil from '../Profil/Profil'
import './Feed.css'

const Feed = ({ userLoaded, showSettings, setShowSettings }) => {
    const [feed, setFeed] = useState([])

    useEffect(() => {
        const getFeed = async () => {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/posts`,
                {
                    credentials: 'include'
                })
            if (response.ok) {
                const data = await response.json()
                setFeed(data)
                console.log(data)
            }
            else {
                console.log('feed not loaded')
            }
        }
        getFeed()
    }, [])

    return (
        <div>
            {userLoaded &&
                <>
                    {feed?.map((singlePost, key) => {
                        return <Profil key={key} singlePost={singlePost} showSettings={showSettings} setShowSettings={setShowSettings} />
                    })}
                </>
            }
            {!userLoaded && <p>Loading...</p>}
            {showSettings && <div className='greyScreenActive'></div>}
        </div>
    );
}

export default Feed;