import './LikesCommentsButtons.css'
import { FaRegHeart } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";
import { Link } from 'react-router-dom';

const LikesCommentsButtons = ({ singlePost, post }) => {
    return (
        <div className='LCB'>
            <FaRegHeart className='homeHeartIconBottom' />
            <p>{singlePost?.likes ? new Intl.NumberFormat().format(singlePost.likes) : 0}</p>
            <p>{post?.likes ? new Intl.NumberFormat().format(post.likes) : 0}</p>
            {singlePost && <Link to={`/comments/${singlePost?._id}`}>
                <BsChatDots className='homeCommentButtonBottom' />
            </Link>}
            {post && <Link to={`/comments/${post?._id}`}>
                <BsChatDots className='homeCommentButtonBottom' />
            </Link>
            }
            <p>{singlePost?.comments ? new Intl.NumberFormat().format(singlePost.comments) : 0}</p>
            <p>{post?.comments ? new Intl.NumberFormat().format(post.comments) : 0}</p>
        </div>
    );
}

export default LikesCommentsButtons;