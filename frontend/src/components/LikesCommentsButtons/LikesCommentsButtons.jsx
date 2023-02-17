import './LikesCommentsButtons.css'
import { BsChatDots } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import pinkHeart from "../../img/pinkheart.png"
import emptyHeart from "../../img/emptyheart.png"

const LikesCommentsButtons = ({ singlePost, post }) => {
    const [like, setLike] = useState(false)

    const likeHandler = () => {
        setLike(prev => !prev)
    }

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