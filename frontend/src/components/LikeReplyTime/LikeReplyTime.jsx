import './LikeReplyTime.css';
import pinkHeart from "../../img/pinkheart.png"
import emptyHeart from "../../img/emptyheart.png"
import { useState } from 'react';
import moment from "moment"

const LikeReplyTime = ({ post }) => {
    const [like, setLike] = useState(false)

    const likeHandler = () => {
        setLike(prev => !prev)
    }

    return (
        <div className='LRT'>
            <div className='LRT-heart' onClick={likeHandler} ><img src={like ? pinkHeart : emptyHeart} alt="heart" className='homeHeartIconBottom' /></div>
            <p>Reply</p>
            <p>{moment(post.createdAt).fromNow()}</p>
        </div>
    );
}

export default LikeReplyTime;