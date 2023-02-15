import './LikeReplyTime.css';
import { FaRegHeart } from "react-icons/fa";

const LikeReplyTime = () => {
    return (
        <div className='LRT'>
            <FaRegHeart className="homeIcon" />
            <p>Reply</p>
            <p>6 hours ago</p>
        </div>
    );
}

export default LikeReplyTime;