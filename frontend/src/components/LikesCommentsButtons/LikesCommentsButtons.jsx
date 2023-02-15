import './LikesCommentsButtons.css'
import { FaRegHeart } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";
import { Link } from 'react-router-dom';

const LikesCommentsButtons = ({ singlePost }) => {
    return (
        <div className='LCB'>
            <FaRegHeart className='homeHeartIconBottom' />
            <p>{new Intl.NumberFormat().format(singlePost?.likes)}</p>
            <Link to='.././comments/:postID'>
                <BsChatDots className='homeCommentButtonBottom' />
            </Link>
            <p>{new Intl.NumberFormat().format(singlePost?.comments)}</p>
        </div>
    );
}

export default LikesCommentsButtons;