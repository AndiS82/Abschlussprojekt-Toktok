import './PostComment.css'

const PostComment = () => {
    return (
        <div className="postComment">
            <p>POST COMMENT COMPONENT</p>
            <input type="text" placeholder="Your comment"></input>
            <button type="submit">Post</button>
        </div>

    );
}

export default PostComment;