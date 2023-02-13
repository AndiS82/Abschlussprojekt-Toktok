import LikesCommentsButtons from '../LikesCommentsButtons/LikesCommentsButtons';
import PostImage from '../PostImage/PostImage';
import ProfilMini from '../ProfilMini/ProfilMini';
import './Profil.css'

const Profil = () => {
    return (
        <div>
            <ProfilMini />
            <PostImage />
            <LikesCommentsButtons />
            <ProfilMini />
            <PostImage />
            <LikesCommentsButtons />
            <ProfilMini />
            <PostImage />
            <LikesCommentsButtons />
        </div>
    );
}

export default Profil;