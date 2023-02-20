import './LikesCommentsButtons.css'
import { BsChatDots } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import pinkHeart from "../../img/pinkheart.png"
import emptyHeart from "../../img/emptyheart.png"
import { UserContext } from '../../contexts/UserContext';

const LikesCommentsButtons = ({ singlePost, post }) => {
    const user = useContext(UserContext)
    const [usePost, setUsePost] = useState(false)
    const [like, setLike] = useState(false) // fürs schicken ins Backend und display änderung des herzes
    let [countLikes, setCountLikes] = useState(0) // für die hoch und runterzahlung der Anzahl am Likes, NUR im Frontend 
    console.log('singlePost', singlePost)
    useEffect(() => {
        if (usePost?.likedBy?.includes(user._id)) {
            setLike(true)
        }

    }, [usePost, user._id])

    useEffect(() => {
        if (singlePost) {
            setUsePost(singlePost)
            setCountLikes(Number(singlePost?.likedBy?.length))
        }
        if (post) {
            setUsePost(post)
            setCountLikes(Number(post?.likedBy?.length))
        }
    }, [post, singlePost])

    const likeHandler = async () => {
        console.log('like handler', like)
        setLike(prev => !prev)
        if (like === false) { // hier sieht komisch aus, liegt aber daran, dass hier den Wert von 'like' gelesen wird, bevor setCountLikes gemacht wird
            setCountLikes(countLikes += 1)
        } else {
            setCountLikes(countLikes -= 1)
        }

        const body = {
            result: !like, // zeigt korrekt, ob der User diesen Post liked oder nicht
            likedBy: user._id
        }
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
        }
        else {
            console.log('problem with likes')
        }
    }
    // console.log('lcb post', singlePost)

    return (
        <div className='LCB'>
            <div onClick={likeHandler} ><img src={like ? pinkHeart : emptyHeart} alt="heart" className='homeHeartIconBottom' /></div>
            {post &&
                <>
                    <p>{countLikes}</p>
                    <Link to={`/comments/${post?._id}`}>
                        <BsChatDots className='homeCommentButtonBottom' />
                    </Link>
                    <p>{post?.comments ? new Intl.NumberFormat().format(post?.comments?.length) : 0}</p>
                </>
            }
            {!post &&
                <>
                    <p>{countLikes}</p>
                    <Link to={`/comments/${singlePost?._id}`}>
                        <BsChatDots className='homeCommentButtonBottom' />
                    </Link>
                    <p>{singlePost?.comments ? new Intl.NumberFormat().format(singlePost?.comments?.length) : 0}</p>
                </>
            }
        </div>
    );
}

export default LikesCommentsButtons;