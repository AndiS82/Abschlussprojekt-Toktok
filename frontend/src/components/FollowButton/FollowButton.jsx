import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import "./FollowButton.css"

const FollowButton = ({ followedUser }) => {
    const [following, setFollowing] = useState(false)

    const user = useContext(UserContext)

    useEffect(() => {
        if (followedUser?.followedBy.includes(user._id)) {
            setFollowing(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const followHandler = async () => {
        console.log('follow Handler')
        setFollowing(prev => !prev)

        const body = {
            result: !following, // zeigt korrekt, ist komisch wegen asynchrones Laufen der Funktion
            _id: user._id,// der User, der den anderen followed/unfollowed
            following: followedUser._id// der User, der gefollowed/ungefollowed wird
        }
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/${user._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(body)
        })
        if (response.ok) {
            console.log('follows updated')
        }
        else {
            console.log('problem with follows')
        }
    }

    return (
        <div className="followButtonContainer">
            <button type="button" className={following ? 'following' : 'followButton'} onClick={followHandler}>{following ? 'Following' : 'Follow'}</button>
        </div>
    );
}

export default FollowButton;