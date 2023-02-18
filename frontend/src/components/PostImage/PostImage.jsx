import './PostImage.css'

const PostImage = ({ singlePost }) => {
    return (
        <div className='postImgStyle'>
            <img src={singlePost?.image?.url} alt="post" />
        </div>
    );
}

export default PostImage;