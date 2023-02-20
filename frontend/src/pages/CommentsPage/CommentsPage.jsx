import './CommentsPage.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import arrowTriangle from '../../icons/arrow_triangle.png'
import ProfilMini from '../../components/ProfilMini/ProfilMini';
import LikesCommentsButtons from '../../components/LikesCommentsButtons/LikesCommentsButtons';
import PostCaption from '../../components/PostCaption/PostCaption';
import LikeReplyTime from '../../components/LikeReplyTime/LikeReplyTime';
import PostComment from '../../components/PostComment/PostComment';
import BackButton from '../../components/BackButton/BackButton';
import { useEffect, useState } from 'react';
import moment from "moment";
import warteUhr from '../../img/Frame.png';
import CommentsMiniProfil from '../../components/CommentsMiniProfil/CommentsMiniProfil';

const CommentsPage = ({ setUserData, setUserLoaded, userLoaded }) => {
    const postsFetch = process.env.REACT_APP_BACKEND_URL;
    const [postData, setPostData] = useState([])
    const [reRender, setReRender] = useState(false)
    const nav = useNavigate()
    const params = useParams()
    // console.log('postData', postData)

    useEffect(() => {
        const getData = async () => {
            const posts = await fetch(postsFetch + `/api/posts/${params.postID}`, {
                credentials: "include"
            })
            if (posts.ok) {
                const fetchedPosts = await posts.json()
                setPostData(fetchedPosts)
                // console.log('fetchedPosts', fetchedPosts)
            }
            else (console.log("comment not fetched"))
        }
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reRender])
    useEffect(() => {
        const getUser = async () => {
            setUserLoaded(false)
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user`,
                {
                    credentials: 'include'
                })
            if (response.ok) {
                const data = await response.json()
                setUserData(data)
                setUserLoaded(true)
                // console.log(data)
            }
            else {
                nav('/')
            }
        }
        getUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='commentsMainStyle'>
            {userLoaded &&
                <>
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
                    <PostCaption postData={postData} />
                    <div className='LCB-Border'>
                        <div className='LCB-Time'>
                            <p>{moment(postData.createdAt).fromNow()}</p>
                        </div>
                        <div className='LCB-edit' >
                            <LikesCommentsButtons singlePost={postData} />
                        </div>
                    </div>
                    {postData?.comments?.map((post, key) => {
                        return (
                            <section key={key}>
                                <CommentsMiniProfil post={post} />
                                <p className='postedContent'>{post?.content}</p>
                                <LikeReplyTime commentInPost={post} post={postData} />
                            </section>)
                    })}
                    <PostComment user={postData?.user} postID={postData?._id} setReRender={setReRender} />
                </>}
            {!userLoaded && <div className="notLoadedDiv"><p className='loadingP'>Loading ...</p>
                <img className='warteUhr' src={warteUhr} alt='Warteuhr' />
            </div>}
        </div>
    );
}

export default CommentsPage;