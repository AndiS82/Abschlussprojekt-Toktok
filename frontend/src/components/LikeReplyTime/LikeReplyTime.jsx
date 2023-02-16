import './LikeReplyTime.css';
import { FaRegHeart } from "react-icons/fa";

const LikeReplyTime = ({ post }) => {
    console.log(post)
    return (
        <div className='LRT'>
            <FaRegHeart className="homeIcon" />
            <p>Reply</p>
            <p>6 hours ago</p>
            {/* post.createdAt.$timestamp */}
        </div>
    );
}

export default LikeReplyTime;