import { useEffect, useState } from 'react';
import './Gallery.css'

const Gallery = ({ user }) => {
    const [posts, setPosts] = useState(null)

    useEffect(() => {

        const fetchFotos = async () => {
            const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/${user._id}/posts`,
                {
                    credentials: "include"
                })
            if (data.ok) {
                // console.log("data.check", data)
                const user = await data.json()
                setPosts(user)
                // console.log("Gallery.jsx Z 13 ", user)
            }
            else {
                console.log("fetch failed")
            }
        }
        fetchFotos()
    }, []
    )
    console.log("posts Z 27 ", posts)
    return (
        <div>
            <h1>Gallerie</h1>
            {posts?.map((post, key) => {
                return (
                    <img src={post?.image.url} alt="Gallerybild" key={key}></img>
                )
            })}
        </div>
    );
}

export default Gallery;