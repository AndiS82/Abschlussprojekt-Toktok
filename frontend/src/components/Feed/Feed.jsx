import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Profil from '../Profil/Profil'
import './Feed.css'

const Feed = ({ userLoaded }) => {
    const [feed, setFeed] = useState([])
    // const nav = useNavigate()
    // useEffect(() => {
    //     const getUser = async () => {
    //         setUserLoaded(false)
    //         const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user`,
    //             {
    //                 credentials: 'include'
    //             })
    //         if (response.ok) {
    //             const data = await response.json()
    //             setUserData(data)
    //             setUserLoaded(true)
    //             // console.log(data)
    //         }
    //         else {
    //             nav('/')
    //         }
    //     }
    //     getUser()
    // }, [])

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
                        return <Profil key={key} singlePost={singlePost} />
                    })}
                </>
            }
            {!userLoaded && <p>Loading...</p>}
        </div>
    );
}

export default Feed;