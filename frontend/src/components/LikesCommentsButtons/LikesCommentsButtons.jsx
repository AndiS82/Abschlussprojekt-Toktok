import './LikesCommentsButtons.css'
import { FaRegHeart } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";

const LikesCommentsButtons = () => {
    return (
        <div className='LCB'>
            <FaRegHeart className='homeHeartIconBottom' />
            <p>44.389</p>
            <BsChatDots className='homeCommentButtonBottom' />
            <p>26.376</p>
        </div>
    );
}

export default LikesCommentsButtons;