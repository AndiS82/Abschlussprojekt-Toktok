import './LikeReplyTime.css';
import pinkHeart from "../../img/pinkheart.png"
import emptyHeart from "../../img/emptyheart.png"
import { useContext, useEffect, useState } from 'react';
import moment from "moment"
import { UserContext } from '../../contexts/UserContext';

const LikeReplyTime = ({ comment, post }) => {
    const user = useContext(UserContext)
    const [like, setLike] = useState(false)// fürs schicken ins Backend und display änderung des herzes
    let [countLikes, setCountLikes] = useState(0)// für die hoch und runterzahlung der Anzahl am Likes, NUR im Frontend 

    useEffect(() => {
        if (comment?.likedBy?.includes(user._id)) {
            setLike(true)
        }
    }, [user._id, comment])

    const likeHandler = async () => {
        setLike(prev => !prev)
        if (like === false) { // hier sieht komisch aus, liegt aber daran, dass hier den Wert von 'like' gelesen wird, bevor setCountLikes gemacht wird
            setCountLikes(countLikes += 1)
        } else {
            setCountLikes(countLikes -= 1)
        }

        const body = {
            result: !like, // zeigt korrekt, ob der User diesen Post liked oder nicht
            likedBy: user._id,
            commentId: comment._id
        }

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/comments/${post._id}`, { // fetch muss auf dem Post zugreifen, da das Kommentar kein eigenes Dokument ist
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(body)
        })
        console.log(response)
        if (response.ok) {
            console.log('likes updated')
        }
        else {
            console.log('problem with likes')
        }
    }


    console.log(comment)

    return (
        <div className='LRT'>
            <div className='LRT-heart' onClick={likeHandler} ><img src={like ? pinkHeart : emptyHeart} alt="heart" className='homeHeartIconBottom' /></div>
            <p>{countLikes}</p>
            <p>Reply</p>
            <p>{moment(comment?.createdAt).fromNow()}</p>
        </div>
    );
}

export default LikeReplyTime;