import './ProfilMini.css';
import { Link } from "react-router-dom";
import { TbDotsCircleHorizontal } from "react-icons/tb";
import placeholderImg from "../../img/ProfileImgPlaceholder.png"
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';

const ProfilMini = ({ singlePost, post }) => {
    const [addPostGallery, setAddPostGallery] = useState(false)
    const user = useContext(UserContext)
    console.log("singlePost: ", singlePost)
    console.log("post", post)
    console.log("user", user)
    // useEffect(() => {
    //     console.log("user: ", user)
    //     if (!singlePost && !post) {
    //         setAddPostGallery(true)
    //     }
    // }, [])

    // const addPostGallery = 
    return (
        <div>
            <nav className="miniProfil">
                <div>
                    {singlePost &&
                        <div className='miniProfilDetail'>
                            <img src={singlePost?.user?.image ? singlePost?.user?.image : placeholderImg} alt={singlePost?.user?.username} />
                            <div className='description'>
                                <h1>{singlePost?.user?.username}</h1>
                                <p>{singlePost?.user?.occupation}</p>
                            </div>
                        </div>
                    }
                    {post &&
                        <div>
                            <img src={post?.user?.image ? post?.user?.image : placeholderImg} alt={post?.user?.username} />
                            <div className='description'>
                                <h1>{post?.username ? post?.username : 'username'}</h1>
                                <p>{post?.occupation ? post?.occupation : 'occupation'}</p>
                            </div>
                        </div>
                    }

                    {/* weiteren use case, Emily fix me */}
                    {(!singlePost && !post) &&
                        <div>
                            <img src={user?.image?.url ? user?.image?.url : placeholderImg} alt={user?.username} />
                            <div className='description'>
                                {!singlePost && <h1>{user?.username ? user?.username : 'username'}</h1>}
                                {!singlePost && <p>{user?.occupation ? user?.occupation : 'occupation'}</p>}
                            </div>
                        </div>
                    }
                </div>
                <Link to="/UnderConstruction">
                    <TbDotsCircleHorizontal className="miniProfilIcon" />
                </Link>
            </nav>
        </div>

    );
};

export default ProfilMini;