import { useEffect, useState } from 'react'
import Profil from '../Profil/Profil'
import './Feed.css'

const Feed = ({ rerender, setRerender }) => {
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
            }
            else {
                console.log('feed not loaded')
            }
        }
        getFeed()
    }, [])

    return (
        <div>
            {feed?.map((singlePost, key) => {
                return <Profil key={key} singlePost={singlePost} rerender={rerender} setRerender={setRerender} />
            })}
        </div>
    );
}

export default Feed;