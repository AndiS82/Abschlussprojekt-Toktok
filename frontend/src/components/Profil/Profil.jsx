import LikesCommentsButtons from '../LikesCommentsButtons/LikesCommentsButtons';
import PostImage from '../PostImage/PostImage';
import ProfilMini from '../ProfilMini/ProfilMini';
import './Profil.css'

const Profil = ({ singlePost, showSettings, setShowSettings }) => {
    // console.log('singlePost', singlePost)
    return (
        <div>
            <ProfilMini singlePost={singlePost} showSettings={showSettings} setShowSettings={setShowSettings} />
            <PostImage singlePost={singlePost} />
            <LikesCommentsButtons singlePost={singlePost} />
        </div>
    );
}

export default Profil;