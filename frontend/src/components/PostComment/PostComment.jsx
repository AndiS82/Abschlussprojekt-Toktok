const PostComment = ({ singlePost }) => {
    return (
        <div className="postComment">
            <h1>POST COMMENT COMPONENT</h1>
            <img src={singlePost?.user?.image} alt={singlePost?.user?.username} />
            <input type="text" placeholder="Your comment"></input>
            <button type="submit">Post</button>
        </div>

    );
}

export default PostComment;