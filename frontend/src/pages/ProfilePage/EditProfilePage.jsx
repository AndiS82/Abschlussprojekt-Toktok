import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext';
import './EditProfilePage.css';
import defaultImage from '../../img/ProfileImgPlaceholder.png'
import editIcon from '../../img/Edit_Square.png'
import BackButton from '../../components/BackButton/BackButton';
import warteUhr from '../../img/Frame.png'

const EditProfilePage = ({ userLoaded, setUserLoaded, setUserData }) => {
    const user = useContext(UserContext)
    // console.log(user)
    const nav = useNavigate()

    const [nameRef, setNameRef] = useState(user?.name)
    const [username, setUsername] = useState(user?.username)
    const [occupation, setOccupation] = useState(user?.occupation)
    const [dob, setDob] = useState(user?.dob)
    const [email, setEmail] = useState(user?.email)
    const [tel, setTel] = useState(user?.tel)
    const [website, setWebsite] = useState(user?.website)
    const [about, setAbout] = useState(user?.aboutMe)
    const [sex, setSex] = useState(user?.sex)
    const imageRef = useRef()
    // eslint-disable-next-line 
    const [updatedUser, setUpdatedUser] = useState()
    const [image, setImage] = useState({ defaultImage })
    const [imageFile, setImageFile] = useState(null)
    const [showFileInput, setShowFileInput] = useState(false)
    const [edit] = useState(true)
    const [imageUpdated, setImageUpdated] = useState(false)

    useEffect(() => {
        // console.log(user)
        if (user) {
            setImage(user?.image?.url)
        }
        else {
            setImage(defaultImage)
        }

    }, [user])

    useEffect(() => {
        const getUser = async () => {
            setUserLoaded(false)
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user`,
                {
                    credentials: 'include'
                })
            if (response.ok) {
                const data = await response.json()
                setUserData(data)
                setUserLoaded(true)
                setNameRef(data?.name)
                setUsername(data?.username)
                setOccupation(data?.occupation)
                setDob(data?.dob)
                setEmail(data?.email)
                setTel(data?.tel)
                setWebsite(data?.website)
                setAbout(data?.aboutMe)
                setSex(data?.sex)
                setImage(data?.image?.url)
                // console.log(data)
            }
            else {
                nav('/')
            }
        }
        getUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const showImage = () => {
        if (imageRef?.current?.files[0] !== null) {
            setImage(URL.createObjectURL(imageRef.current.files[0]))
            setImageFile(imageRef.current.files[0])
            setImageUpdated(true)
        }
        else {
            console.log('no new image')
        }
    }

    const submit = async () => {
        const form = {
            name: nameRef,
            username: username,
            occupation: occupation,
            dob: dob,
            email: email,
            tel: tel,
            sex: sex,
            website: website,
            aboutme: about,
            public_id: user?.image?.public_id
        }
        // console.log('submit')
        // console.log(imageFile)
        if (imageUpdated) {
            const file = imageFile
            const imageForm = new FormData()
            imageForm.append('file', file)
            imageForm.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
            const imageResponse = await fetch(process.env.REACT_APP_CLOUDINARY_URL, {
                method: 'POST',
                body: imageForm
            })
            if (imageResponse.ok) {
                const data = await imageResponse.json()
                // console.log(data)

                form.old_id = form.public_id
                form.image = data.secure_url
                form.public_id = data.public_id
            }
        }

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(form)
        })

        if (response.ok) {
            const data = await response.json()
            setUpdatedUser(data)
            nav("/Home")
        }
        else {
            console.log('failure to edit')
        }
    }

    // console.log(nameRef)
    return (
        <div>
            {userLoaded &&
                <>
                    <BackButton />
                    <section className='profileImg-edit-section'>
                        <div className='profileImg-div'>
                            <img className='origProfileImg' src={image} alt="profile" />
                        </div>
                        <button className='profileImgEdit' onClick={() => setShowFileInput(prev => !prev)}><img src={editIcon} alt="edit" /></button>
                    </section>
                    <section className='editSection'>
                        {showFileInput &&
                            <input type="file" onChange={showImage} ref={imageRef} />
                        }
                        <input contentEditable={edit} placeholder="Name" value={nameRef} onChange={((e) => setNameRef(e.target.value))} />
                        <input contentEditable={edit} placeholder="Username" value={username} onChange={((e) => setUsername(e.target.value))} />
                        <input contentEditable={edit} placeholder="Occupation" value={occupation} onChange={((e) => setOccupation(e.target.value))} />
                        <input contentEditable={edit} placeholder="Date of Birth" value={dob} onChange={((e) => setDob(e.target.value))} />
                        <input contentEditable={edit} placeholder="Email Address" value={email} onChange={((e) => setEmail(e.target.value))} />
                        <input contentEditable={edit} placeholder="Telephone" value={tel} onChange={((e) => setTel(e.target.value))} />
                        <select onChange={(e) => setSex(e.target.value)}>
                            <option value="default" disabled >-select-</option>
                            <option value="male" selected={sex === "male"}>Male</option>
                            <option value="female" selected={sex === "female"}>Female</option>
                            <option value="other" selected={sex === "other"}>Other</option>
                        </select>
                        <input contentEditable={edit} placeholder="Website" value={website} onChange={((e) => setWebsite(e.target.value))} />
                        <input contentEditable={edit} placeholder="About Me" value={about} onChange={((e) => setAbout(e.target.value))} />
                        <button className='editProfileSubmit' onClick={submit}>Save Updates</button>
                    </section>
                </>}
            {!userLoaded && <div className="notLoadedDiv"><p className='loadingP'>Loading ...</p>
                <img className='warteUhr' src={warteUhr} alt='Warteuhr' />
            </div>}
        </div >
    );
}

export default EditProfilePage;