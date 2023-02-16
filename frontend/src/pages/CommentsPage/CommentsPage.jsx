import './CommentsPage.css'
import { Link } from 'react-router-dom';
import arrowTriangle from '../../icons/arrow_triangle.png'
import ProfilMini from '../../components/ProfilMini/ProfilMini';
import LikesCommentsButtons from '../../components/LikesCommentsButtons/LikesCommentsButtons';
import PostCaption from '../../components/PostCaption/PostCaption';
import LikeReplyTime from '../../components/LikeReplyTime/LikeReplyTime';
import Comments from '../../components/Comments/Comments';
import PostComment from '../../components/PostComment/PostComment';
import BackButton from '../../components/BackButton/BackButton';
import { useEffect, useState } from 'react';

const CommentsPage = ({ singlePost }) => {
    const postsFetch = process.env.REACT_APP_BACKEND_URL_POSTS;
    const [postData, setPostData] = useState([])


    useEffect(() => {
        const getData = async () => {
            const posts = await fetch(postsFetch, {
                credentials: "include";
            })
            if (posts.ok) {
                const fetchedPosts = await posts.json()
                setPostData(fetchedPosts)
                console.log(fetchedPosts)
            }
            else (console.log("comment not fetched"))
        }
        getData()
    }, [])


    return (
        <div className='commentsMainStyle'>
            <nav className='commentsNav'>
                <div>
                    <BackButton />
                    <h1>Comments</h1>
                </div>
                <Link to="/UnderConstruction">
                    <img className='arrowTriangle' src={arrowTriangle} alt="arrowTriangle" />
                </Link>
            </nav>
            <ProfilMini singlePost={singlePost} />
            <PostCaption />
            <p>6 hours ago</p>
            <div className='LCB-edit' >
                <LikesCommentsButtons />
            </div>
            <ProfilMini />
            <Comments />
            <LikeReplyTime />
            <ProfilMini />
            <Comments />
            <LikeReplyTime />
            <ProfilMini />
            <Comments />
            <LikeReplyTime />
            <PostComment />
        </div>
    );
}

export default CommentsPage;