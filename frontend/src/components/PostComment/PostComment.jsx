import { useContext, useRef } from 'react';
import './PostComment.css'
import placeholderImg from "../../img/ProfileImgPlaceholder.png"
import { UserContext } from '../../contexts/UserContext';

const PostComment = ({ user, postID, setReRender }) => {
    const contentRef = useRef()
    const loggedIn = useContext(UserContext)
    // console.log(`loggedIn = `, loggedIn) // evtl check, wenn nicht eingeloggt nav('/')
    // console.log('userPostComment', user)

    const postComment = async () => {
        console.log('post comment')
        const comment = {
            _id: user._id,
            username: user.username,
            occupation: user.occupation,
            image: user.image,
            content: contentRef.current.value,
            postID: postID
        }

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/${user._id}/post`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(comment)
        })
        console.log(response)
        if (response.ok) {
            const data = response.json()
            setReRender(prev => !prev)
            console.log('comment added', data)
            contentRef.current.value = ""
        }
        else {
            console.log('failed to add comment')
        }

    }
    return (
        <div className='postCommentBorder'>
            <div className="postComment">
                <img className='miniProfilDetail' src={loggedIn?.image?.url ? loggedIn?.image?.url : placeholderImg} alt={loggedIn?.username} />
                <input ref={contentRef} type="text" placeholder="Your comment... "></input>
                <button type="submit" onClick={postComment}>Post</button>
            </div>
        </div>
    );
}

export default PostComment;