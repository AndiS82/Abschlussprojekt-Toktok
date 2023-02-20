import './PostCaption.css'

const PostCaption = ({ postData }) => {
    return (
        <div className='postCap'>
            <p>{postData?.content}</p>
        </div>
    );
}

export default PostCaption;