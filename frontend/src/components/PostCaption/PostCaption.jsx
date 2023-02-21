import './PostCaption.css'

const PostCaption = ({ postData }) => {
    return (
        <div className='postCap'>
            <p className='postCapP'>{postData?.content}</p>
        </div>
    );
}

export default PostCaption;