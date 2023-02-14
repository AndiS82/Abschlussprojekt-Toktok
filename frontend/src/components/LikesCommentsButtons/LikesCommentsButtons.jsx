import './LikesCommentsButtons.css'
import { FaRegHeart } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";

const LikesCommentsButtons = ({ singlePost }) => {
    return (
        <div className='LCB'>
            <FaRegHeart className='homeHeartIconBottom' />
            <p>{new Intl.NumberFormat().format(singlePost?.likes)}</p>
            <BsChatDots className='homeCommentButtonBottom' />
            <p>{new Intl.NumberFormat().format(singlePost?.comments)}</p>
        </div>
    );
}

export default LikesCommentsButtons;