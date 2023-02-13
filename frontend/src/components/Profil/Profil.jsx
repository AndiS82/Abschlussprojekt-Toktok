import LikesCommentsButtons from '../LikesCommentsButtons/LikesCommentsButtons';
import PostImage from '../PostImage/PostImage';
import ProfilMini from '../ProfilMini/ProfilMini';
import './Profil.css'

const Profil = ({ singlePost }) => {
    console.log(singlePost)
    return (
        <div>
            <ProfilMini singlePost={singlePost} />
            <PostImage singlePost={singlePost} />
            <LikesCommentsButtons />
            {/* <ProfilMini />
            <PostImage />
            <LikesCommentsButtons />
            <ProfilMini />
            <PostImage />
            <LikesCommentsButtons /> */}
        </div>
    );
}

export default Profil;