import './CommentsMiniProfil.css'
import placeholderImg from "../../img/ProfileImgPlaceholder.png"
import { TbDotsCircleHorizontal } from "react-icons/tb";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';


const CommentsMiniProfil = ({ comment }) => {
    // console.log('comment user', comment.user)
    const [profile, setProfile] = useState()

    useEffect(() => {
        const getProfile = async () => {
            // console.log('getting profile', comment)
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/profile/${comment?.user}`, {
                credentials: 'include'
            })
            if (response.ok) {
                const data = await response.json()
                // console.log('cmp data', data)
                setProfile(data)
            }
            else {
                console.log('problem with fetching comment profile')
            }
        }
        getProfile()
        // eslint-disable-next-line
    }, [])

    console.log("HIERMINIComments " + profile?._id)
    console.log("HIERMINICommentscomment " + comment?.user)
    console.log("fucking " + profile?.name)
    return (
        <div>
            <section className="miniProfil">
                <div>
                    {profile &&
                        <Link to={`/Profile/${profile?._id}`}>
                            <div>
                                <img src={profile?.image?.url ? profile?.image?.url : placeholderImg} alt={profile?.username} />
                                <div className='description'>
                                    <h1 className="miniProfilCommentsH1" >{profile?.username ? profile?.username : 'username'}</h1>
                                    <p className="miniProfilCommentsP">{profile?.occupation ? profile?.occupation : 'occupation'}</p>
                                </div>
                            </div>
                        </Link>
                    }

                </div >
                <TbDotsCircleHorizontal className="miniProfilIcon" />
            </section>
        </div>
    );
}

export default CommentsMiniProfil;