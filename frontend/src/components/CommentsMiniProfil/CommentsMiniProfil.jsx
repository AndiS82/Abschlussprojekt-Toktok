import './CommentsMiniProfil.css'
import placeholderImg from "../../img/ProfileImgPlaceholder.png"
import { TbDotsCircleHorizontal } from "react-icons/tb";


const CommentsMiniProfil = ({ post }) => {
    // console.log(post)

    return (
        <div>
            <section className="miniProfil">
                <div>
                    {post &&
                        <div>
                            <img src={post?.user?.image?.url ? post?.user?.image?.url : placeholderImg} alt={post?.user?.username} />
                            <div className='description'>
                                <h1>{post?.user?.username ? post?.user?.username : 'username'}</h1>
                                <p>{post?.user?.occupation ? post?.user?.occupation : 'occupation'}</p>
                            </div>
                        </div>
                    }

                </div >
                <TbDotsCircleHorizontal className="miniProfilIcon" />
            </section>
        </div>
    );
}

export default CommentsMiniProfil;