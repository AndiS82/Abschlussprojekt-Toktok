import './LikeReplyTime.css';
import pinkHeart from "../../img/pinkheart.png"
import emptyHeart from "../../img/emptyheart.png"
import { useEffect, useState } from 'react';

const LikeReplyTime = ({ post }) => {
    // console.log(post)
    const [like, setLike] = useState(false)
    const [timestamp, setTimestamp] = useState()

    const likeHandler = () => {
        setLike(prev => !prev)
    }


    useEffect(() => {
        // const objectId = post._id
        // console.log(objectId.substring(0, 8), 16)
        // const dateFromObjectId = (objectId) => {
        //     const timestampConverter = new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
        //     setTimestamp(timestampConverter)
        // };

    }, [])


    return (
        <div className='LRT'>
            <div className='LRT-heart' onClick={likeHandler} ><img src={like ? pinkHeart : emptyHeart} alt="heart" className='homeHeartIconBottom' /></div>
            <p>Reply</p>
            <p>6 hours ago, {timestamp}</p>
            {/* post.createdAt.$timestamp */}
        </div>
    );
}

export default LikeReplyTime;