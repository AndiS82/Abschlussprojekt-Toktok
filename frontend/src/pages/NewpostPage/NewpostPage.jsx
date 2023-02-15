import { useContext, useRef, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import './NewpostPage.css'
import { MdPhotoCamera } from "react-icons/md"
import { IoIosArrowDown } from "react-icons/io";
import Gallery from '../../components/Gallery/Gallery.jsx';
import { NavLink } from 'react-router-dom';
import { RxCrossCircled } from "react-icons/rx";
import { HiSquares2X2 } from "react-icons/hi2";

const NewpostPage = () => {
    const [selectImage, setSelectImage] = useState(true)
    const [newImage, setNewImage] = useState(false)
    const [image, setImage] = useState(null)
    const [imageFile, setImageFile] = useState(null)

    const user = useContext(UserContext)

    const imageRef = useRef()
    const contentRef = useRef()

    const showImage = () => {
        setImage(URL.createObjectURL(imageRef.current.files[0]))
        setNewImage(true)
        setImageFile(imageRef.current.files[0])
    }

    const publish = async () => {
        try {
            const post = {
                content: contentRef.current.value
            }
            //IMAGE
            const file = imageFile
            console.log(imageFile)
            const form = new FormData()
            form.append('file', file)
            form.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
            const imageResponse = await fetch(process.env.REACT_APP_CLOUDINARY_URL, {
                method: 'POST',
                body: form
            })
            const data = await imageResponse.json()
            console.log(data)

            // ADD IMAGE TO POST
            post.image = data.secure_url
            post.public_id = data.public_id

            // ADD USER DATA FROM USECONTEXT TO POST
            post._id = user._id
            post.username = user.username
            post.occupation = user.occupation
            post.image = user.image

            console.log(post)

            // POST ABSCHICKEN INS BACKEND
            const postResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/${user._id}/post`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(post)
            })

            if (postResponse.ok) {
                console.log('success posting')
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className='newPostMainStyle'>
            <section className='newPostHeader'>
                <NavLink to="/Home"><RxCrossCircled className='newPostBack' /> </NavLink>
                <h1>New Post</h1>
                {/* Wir hatten hier den Usernamen eingefügt. Das ist in der Vorlage aber nicht so, daher hinterlege ich den Tag hier für's ggf. recycling an anderer Stelle in diesem Dokument {user?.username}  SV */}
            </section>

            {selectImage && // hier kann man das Bild auswählen, wird gezeigt wenn selectImage === true
                <>
                    <article className='articleUploadButton'>
                        <label htmlFor="fotoUpload" className='uploadButton' >
                            <MdPhotoCamera className='uploadButtonIcon' />Upload
                        </label>
                    </article>
                    <input id="fotoUpload" type="file" ref={imageRef} onChange={showImage}></input>
                    {newImage &&
                        <>
                            <img className='imgSelected' src={image} alt="selected" />
                            <button className='uploadButton' onClick={() => setSelectImage(false)}>Add Caption</button>
                        </>}

                </>}
            {!selectImage && // hier kann man den text hinzufügen, wird gezeigt wenn selectImage === false
                <section>
                    <div>
                        <section className='newPostHeader'>
                            <NavLink to="/Home"><RxCrossCircled className='newPostBack' /> </NavLink>
                            <h1>New Post</h1>
                            {/* Wir hatten hier den Usernamen eingefügt. Das ist in der Vorlage aber nicht so, daher hinterlege ich den Tag hier für's ggf. recycling an anderer Stelle in diesem Dokument {user?.username}  SV */}
                        </section>
                        <img src={user?.image} alt={user?.username} />

                        <img className='imgSelected' src={image} alt="selected" />
                        <textarea ref={contentRef} placeholder='Write a caption'></textarea>
                    </div>
                    <div>
                        <button onClick={() => setSelectImage(true)}>Back to Image Selection</button>
                        <button onClick={publish}>Publish</button>
                    </div>
                </section>
            }
            {/* Fetch Posts, die zum eingeloggten User gehören. Dann durch die posts mappen und nur die Bilder zeigen */}
            <div className='galleryHeader'>
                <article className='galleryDrop'><h1>Gallery <IoIosArrowDown className='galleryDropIcon' /></h1></article>
                <article className='galleryIconsRight'> <HiSquares2X2 className='galleryIcons' /> <MdPhotoCamera className='galleryIcons' /></article>
            </div>

            <Gallery className="galleryTag" user={user} />
        </div>
    );
}

export default NewpostPage;