import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import './NewpostPage.css'
import { MdPhotoCamera } from "react-icons/md"
import { IoIosArrowDown } from "react-icons/io";
import { HiSquares2X2 } from "react-icons/hi2";
import { CiLocationOn } from "react-icons/ci";
import { FiSettings } from "react-icons/fi";
import Gallery from '../../components/Gallery/Gallery.jsx';
import BackButton from '../../components/BackButton/BackButton';
import { redirect } from "react-router-dom";

const NewpostPage = () => {
    const [selectImage, setSelectImage] = useState(true)
    const [newImage, setNewImage] = useState(false)
    const [image, setImage] = useState(null)
    const [imageFile, setImageFile] = useState(null)
    const [city, setCity] = useState(null)
    const [country, setCountry] = useState(null)

    const user = useContext(UserContext)

    const imageRef = useRef()
    const contentRef = useRef()

    const showImage = () => {
        setImage(URL.createObjectURL(imageRef.current.files[0]))
        setNewImage(true)
        setImageFile(imageRef.current.files[0])
        setSelectImage(false)
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
            console.log("data: ", data)

            // ADD IMAGE TO POST
            post.image = data.secure_url //
            post.public_id = data.public_id

            // ADD USER DATA FROM USECONTEXT TO POST
            post._id = user._id
            post.username = user.username
            post.occupation = user.occupation
            post.userimage = user.image

            if (addLocation) {
                setCity(addLocation[0].name)
                setCountry(addLocation[0].country)
            }
            post.city = city
            post.country = country

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
                return redirect("/Home")
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    const OnInput = (event) => {
        const textarea = event.target
        const offSet = textarea.offsetHeight - textarea.clientHeight
        textarea.style.height = "auto"
        console.log("Offsetheight:", textarea.offsetHeight)
        textarea.style.height = textarea.scrollHeight + offSet + "px"
    }

    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");

    const getMyLocation = () => {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Latitude: " + position.coords.latitude)
            setLat(position.coords.latitude)
            console.log("Longitude: " + position.coords.longitude)
            setLong(position.coords.longitude)
        })
    }

    console.log(lat, long)

    const [addLocation, setAddLocation] = useState()

    useEffect(() => {
        const getLocationData = async () => {
            const location = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat.toString()}&lon=${long.toString()}&limit=2&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
            const locationData = await location.json()
            setAddLocation(locationData)
            console.log("locationData:", locationData)
        }
        // console.log("addLocation:", addLocation)
        // console.log("name: ", addLocation[0].name)
        getLocationData()
    }, [])

    return (
        <div className='newPostMainStyle'>
            <section className='newPostHeader'>
                <BackButton />
                <h1>New Post</h1>
            </section>

            {selectImage && // hier kann man das Bild auswählen, wird gezeigt wenn selectImage === true
                <>
                    <article className='articleUploadButton'>
                        <label htmlFor="fotoUpload" className='uploadButton' >
                            <MdPhotoCamera className='uploadButtonIcon' />Upload
                        </label>
                    </article>
                    <input id="fotoUpload" type="file" ref={imageRef} onChange={showImage}></input>
                    <div className='galleryHeader'>
                        <article className='galleryDrop'><h1>Gallery <IoIosArrowDown className='galleryDropIcon' /></h1></article>
                        <article className='galleryIconsRight'> <HiSquares2X2 className='galleryIcons' /> <MdPhotoCamera className='galleryIcons' /></article>
                    </div>
                    <Gallery className="galleryComponent" user={user} />
                </>}
            {!selectImage && // hier kann man den text hinzufügen, wird gezeigt wenn selectImage === false
                <section>
                    <div className='captionInputBar'>
                        <img className='profilePicRound' src={user?.image?.url} alt={user?.username} />
                        <textarea className="textarea" onInput={OnInput} ref={contentRef} placeholder='Add a caption' style={{ resize: "none", minHeight: "80px" }}></textarea>
                        <img className='imgSelected' src={image} alt="selected" />
                    </div>
                    <div className='wrapperLocation'>
                        <button className='locationButton' onClick={getMyLocation}>
                            <CiLocationOn className='locationIcon' />
                            <h2>Add Location</h2>
                            <h2>Location: {addLocation[0]?.name} {addLocation[0]?.country}</h2>
                        </button>
                    </div>
                    <div className='wrapperSmToggles'>
                        <section className='sMToggle'>
                            <h2>Also post to</h2>
                        </section>
                        <section className='sMToggle'>
                            <h2>Facebook</h2>
                            <label className="switch">
                                <input type="checkbox" />
                                <span className="slider round">

                                </span>
                            </label>
                        </section>
                        <section className='sMToggle'>
                            <h2>Twitter</h2>
                            <label className="switch">
                                <input type="checkbox" />
                                <span className="slider round">
                                </span>
                            </label>
                        </section>
                        <section className='sMToggle'>
                            <h2>Tumblr</h2>
                            <label className="switch">
                                <input type="checkbox" />
                                <span className="slider round">
                                </span>
                            </label>
                        </section>
                    </div>
                    <div className='wrapperSettings'>
                        <FiSettings className='locationIcon' />
                        <h2>Advanced Settings</h2>
                    </div>
                    <div className='newPostNavButtonWrapper'>
                        <button className='backAndPublishButton' onClick={() => setSelectImage(true)}>Back</button>
                        <button className='backAndPublishButton' onClick={publish}>Publish</button>
                    </div>
                </section>
            }
        </div>
    );
}

export default NewpostPage;