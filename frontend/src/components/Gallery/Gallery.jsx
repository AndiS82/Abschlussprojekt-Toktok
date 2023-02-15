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
    // console.log("posts Z 27 ", posts)

    return (
        <div className="galleryGrid">
            <article className='div1'>
                {posts?.map((post, key) => {
                    return (
                        <img className="newpostImg" src={post?.image.url} alt="Gallerybild" key={key}></img>
                    )
                })}
            </article>
            <article className='div2'>
                {posts?.map((post, key) => {
                    return (
                        <img className="newpostImg" src={post?.image.url} alt="Gallerybild" key={key}></img>
                    )
                })}
            </article>
            <article className='div3'>
                {posts?.map((post, key) => {
                    return (
                        <img className="newpostImg" src={post?.image.url} alt="Gallerybild" key={key}></img>
                    )
                })}
            </article>
            <article className='div4'>
                {posts?.map((post, key) => {
                    return (
                        <img className="newpostImg" src={post?.image.url} alt="Gallerybild" key={key}></img>
                    )
                })}
            </article>
            <article className='div5'>
                {posts?.map((post, key) => {
                    return (
                        <img className="newpostImg" src={post?.image.url} alt="Gallerybild" key={key}></img>
                    )
                })}
            </article>
            <article className='div6'>
                {posts?.map((post, key) => {
                    return (
                        <img className="newpostImg" src={post?.image.url} alt="Gallerybild" key={key}></img>
                    )
                })}
            </article>
            <article className='div7'>
                {posts?.map((post, key) => {
                    return (
                        <img className="newpostImg" src={post?.image.url} alt="Gallerybild" key={key}></img>
                    )
                })}
            </article>
            <article className='div8'>
                {posts?.map((post, key) => {
                    return (
                        <img className="newpostImg" src={post?.image.url} alt="Gallerybild" key={key}></img>
                    )
                })}
            </article>
            <article className='div9'>
                {posts?.map((post, key) => {
                    return (
                        <img className="newpostImg" src={post?.image.url} alt="Gallerybild" key={key}></img>
                    )
                })}
            </article>
        </div>
    );
}

export default Gallery;