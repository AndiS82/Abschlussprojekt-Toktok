import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import './Gallery.css'

const Gallery = () => {
    const [posts, setPosts] = useState(null)

    const user = useContext(UserContext)

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
                // console.log("Gallery.jsx", user)
            }
            else {
                console.log("fetch failed")
            }
        }
        fetchFotos()
    }, [user._id]
    )
    // console.log("posts Z 27 ", posts)

    return (
        <div className="galleryGrid">

            {posts?.map((post, key) => {
                return (
                    <article className='div1' key={key}>
                        <img className="newpostImg" src={post?.image?.url} alt="Gallerybild" ></img>
                    </article>
                )
            })}
        </div>
    );
}

export default Gallery;