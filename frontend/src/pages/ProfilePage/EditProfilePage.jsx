import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext';
import './EditProfilePage.css';
import defaultImage from '../../img/ProfileImgPlaceholder.png'
import editIcon from '../../img/Edit_Square.png'

const EditProfilePage = () => {
    const user = useContext(UserContext)

    const nav = useNavigate()

    const nameRef = useRef()
    const usernameRef = useRef()
    const occupationRef = useRef()
    const dobRef = useRef()
    const emailRef = useRef()
    const telRef = useRef()
    const websiteRef = useRef()
    const aboutRef = useRef()
    const sexRef = useRef()
    const imageRef = useRef()

    const [updatedUser, setUpdatedUser] = useState()
    const [image, setImage] = useState({ defaultImage })
    const [imageFile, setImageFile] = useState(null)
    const [showFileInput, setShowFileInput] = useState(false)
    const [edit, setEdit] = useState(true)
    console.log(showFileInput)

    useEffect(() => {
        console.log(user)
        if (user) {
            setImage(user?.image?.url)
        }
        else {
            setImage(defaultImage)
        }

    }, [])

    const showImage = () => {
        console.log('show Image')
        if (imageRef?.current?.files[0] !== null) {
            console.log('setting a new image')
            setImage(URL.createObjectURL(imageRef.current.files[0]))
            setImageFile(imageRef.current.files[0])
        }
        else {
            console.log('no new image')
        }
    }

    const submit = async () => {
        console.log('submit')
        console.log(imageFile)
        const file = imageFile
        const imageForm = new FormData()
        imageForm.append('file', file)
        imageForm.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)

        const form = {
            name: nameRef.current.value ? nameRef.current.value : user.name,
            username: usernameRef.current.value,
            occupation: occupationRef.current.value,
            dob: dobRef.current.value,
            email: emailRef.current.value,
            tel: telRef.current.value,
            sex: sexRef.current.value,
            website: websiteRef.current.value,
            aboutme: aboutRef.current.value
        }
        console.log(process.env.REACT_APP_CLOUDINARY_URL)
        const imageResponse = await fetch(process.env.REACT_APP_CLOUDINARY_URL, {
            method: 'POST',
            body: imageForm
        })
        const data = await imageResponse.json()
        console.log(data)

        form.image = data.secure_url
        form.public_id = data.public_id

        if (imageResponse.ok) {
            console.log(form)
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(form)
            })
            console.log(response)
            if (response.ok) {
                const data = response.json()
                setUpdatedUser(data)
                console.log(data)
            }
            else {
                console.log('failure to edit')
            }
        }
    }

    return (
        <div>
            <p onClick={() => nav(-1)}>PLACEHOLDER - CLICK TO GO BACK</p>
            <section className='profileImg-edit-section'>
                <div className='profileImg-div'>
                    <img className='origProfileImg' src={image} alt="profile" />
                </div>
                <button onClick={() => setShowFileInput(prev => !prev)}><img src={editIcon} alt="edit" /></button>
            </section>
            <section className='editSection'>
                {showFileInput &&
                    <input type="file" onChange={showImage} ref={imageRef} />
                }
                <p ref={nameRef} contentEditable={edit} >{user?.name ? user.name : "Name"}</p>
                <p ref={usernameRef} contentEditable={edit}>{user?.username ? user.username : "Username"}</p>
                <p ref={occupationRef} contentEditable={edit}>{user?.occupation ? user.occupation : "Occupation"}</p>
                <p ref={dobRef} contentEditable={edit}>{user?.dob ? user.dob : "DD.MM.YYYY"}</p>
                <p ref={emailRef} contentEditable={edit}>{user?.email ? user.email : "Email Address"}</p>
                <p ref={telRef} contentEditable={edit}>{user?.tel ? user.tel : "Telephone Number"}</p>
                <select ref={sexRef} >
                    {/* BUG: zeigt nicht immer richtig den vorher ausgewählten Geschlecht, der im User Datensatz zu finden ist */}
                    <option value="default" disabled>-select-</option>
                    <option value="male" selected={user?.sex === "male"}>Male</option>
                    <option value="female" selected={user?.sex === "female"}>Female</option>
                    <option value="other" selected={user?.sex === "other"}>Other</option>
                </select>
                <p ref={websiteRef} contentEditable={edit}>{user?.website ? user.website : "Website"}</p>
                <p ref={aboutRef} contentEditable={edit}>{user?.aboutMe ? user.aboutMe : "About Me"}</p>
                <button onClick={submit}>Save Updates</button>
            </section>
        </div >
    );
}

export default EditProfilePage;