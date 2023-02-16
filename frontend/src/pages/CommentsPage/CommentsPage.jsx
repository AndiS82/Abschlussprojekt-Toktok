import './CommentsPage.css'
import { Link, useParams } from 'react-router-dom';
import arrowTriangle from '../../icons/arrow_triangle.png'
import ProfilMini from '../../components/ProfilMini/ProfilMini';
import LikesCommentsButtons from '../../components/LikesCommentsButtons/LikesCommentsButtons';
import PostCaption from '../../components/PostCaption/PostCaption';
import LikeReplyTime from '../../components/LikeReplyTime/LikeReplyTime';
import Comments from '../../components/Comments/Comments';
import PostComment from '../../components/PostComment/PostComment';
import BackButton from '../../components/BackButton/BackButton';
import { useEffect, useState } from 'react';
import PostImage from '../../components/PostImage/PostImage';

const CommentsPage = () => {
    const postsFetch = process.env.REACT_APP_BACKEND_URL;
    const [postData, setPostData] = useState([])
    const [reRender, setReRender] = useState(false)
    const params = useParams()
    console.log('postData', postData)

    useEffect(() => {
        const getData = async () => {
            const posts = await fetch(postsFetch + `/api/posts/${params.postID}`, {
                credentials: "include"
            })
            if (posts.ok) {
                const fetchedPosts = await posts.json()
                setPostData(fetchedPosts)
                console.log('fetchedPosts', fetchedPosts)
            }
            else (console.log("comment not fetched"))
        }
        getData()
    }, [reRender])


    return (
        <div className='commentsMainStyle'>
            <nav className='commentsNav'>
                <div className='backBtnH1'>
                    <BackButton />
                    <h1>Comments</h1>
                </div>
                <Link to="/UnderConstruction">
                    <img className='arrowTriangle' src={arrowTriangle} alt="arrowTriangle" />
                </Link>
            </nav>
            <ProfilMini singlePost={postData} />
            <PostCaption />
            <div className='LCB-edit' >
                <LikesCommentsButtons singlePost={postData} />
            </div>
            {postData?.comments?.map((post, key) => {
                return (
                    <section key={key}>
                        <ProfilMini post={post} />
                        <p className='postedContent'>{post.content}</p>
                        <LikeReplyTime post={post} />
                    </section>)
            })}
            <PostComment user={postData?.user} postID={postData?._id} setReRender={setReRender} />
        </div>
    );
}

export default CommentsPage;