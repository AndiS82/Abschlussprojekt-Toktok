import './LikesCommentsButtons.css'
import { BsChatDots } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import pinkHeart from "../../img/pinkheart.png"
import emptyHeart from "../../img/emptyheart.png"

const LikesCommentsButtons = ({ singlePost, post, rerender, setRerender }) => {
    const [like, setLike] = useState(false)
    const [usePost, setUsePost] = useState(false)
    useEffect(() => {
        if (singlePost) setUsePost(singlePost)
        if (post) setUsePost(post)
    }, [rerender])

    const likeHandler = async () => {
        console.log('like handler', like)
        setLike(prev => !prev) // GELOGGT KOMMT VOR DEM SET
        const body = { result: !like }
        console.log('body', body)
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/posts/${usePost._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(body)
        })
        if (response.ok) {
            console.log('likes updated')
            setRerender(prev => !prev)
        }
        else {
            console.log('problem with likes')
        }
    }
    console.log('lcb post', singlePost)

    return (
        <div className='LCB'>
            <div onClick={likeHandler} ><img src={like ? pinkHeart : emptyHeart} alt="heart" className='homeHeartIconBottom' /></div>
            {post &&
                <>
                    <p>{post?.likes ? new Intl.NumberFormat().format(post.likes) : 0}</p>
                    <Link to={`/comments/${post?._id}`}>
                        <BsChatDots className='homeCommentButtonBottom' />
                    </Link>
                    <p>{post?.comments ? new Intl.NumberFormat().format(post.comments.length) : 0}</p>
                </>
            }
            {!post &&
                <>
                    <p>{singlePost?.likes ? new Intl.NumberFormat().format(singlePost.likes) : 0}</p>
                    <Link to={`/comments/${singlePost?._id}`}>
                        <BsChatDots className='homeCommentButtonBottom' />
                    </Link>
                    <p>{singlePost?.comments ? new Intl.NumberFormat().format(singlePost.comments.length) : 0}</p>
                </>
            }
        </div>
    );
}

export default LikesCommentsButtons;