import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext';
import './EditProfilePage.css';
import defaultImage from '../../img/ProfileImgPlaceholder.png'
import editIcon from '../../img/Edit_Square.png'
import BackButton from '../../components/BackButton/BackButton';

const EditProfilePage = () => {
    const user = useContext(UserContext)

    const nav = useNavigate()

    const [nameRef, setNameRef] = useState(user?.name)
    const [username, setUsername] = useState(user?.username)
    const [occupation, setOccupation] = useState(user?.occupation)
    const [dob, setDob] = useState(user?.dob)
    const [email, setEmail] = useState(user?.email)
    const [tel, setTel] = useState(user?.tel)
    const [website, setWebsite] = useState(user?.website)
    const [about, setAbout] = useState(user?.about)
    const [sex, setSex] = useState(user?.sex)
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

    const [imageUpdated, setImageUpdated] = useState(false)

    const showImage = () => {
        console.log('show Image')
        if (imageRef?.current?.files[0] !== null) {
            console.log('setting a new image')
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
            aboutme: about
        }
        console.log('submit')
        console.log(imageFile)
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
                console.log(data)

                form.image = data.secure_url
                form.public_id = data.public_id
            }
        }
        console.log("nameRef" + nameRef)
        console.log(form)
        console.log(process.env.REACT_APP_CLOUDINARY_URL)

        // if (imageResponse.ok) {
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
            const data = await response.json()
            setUpdatedUser(data)
            console.log(data)
        }
        else {
            console.log('failure to edit')
        }
    }
    // else {
    //     console.log('image response not ok', form)
    // }
    console.log(nameRef)
    return (
        <div>
            <BackButton />
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
                <input contentEditable={edit} placeholder="Name" value={nameRef} onChange={((e) => setNameRef(e.target.value))} />
                <input contentEditable={edit} placeholder="Username" value={username} onChange={((e) => setUsername(e.target.value))} />
                <input contentEditable={edit} placeholder="Occupation" value={occupation} onChange={((e) => setOccupation(e.target.value))} />
                <input contentEditable={edit} placeholder="Date of Birth" value={dob} onChange={((e) => setDob(e.target.value))} />
                <input contentEditable={edit} placeholder="Email Address" value={email} onChange={((e) => setEmail(e.target.value))} />
                <input contentEditable={edit} placeholder="Telephone" value={tel} onChange={((e) => setTel(e.target.value))} />
                <select  >
                    {/* BUG: zeigt nicht immer richtig den vorher ausgewählten Geschlecht, der im User Datensatz zu finden ist */}
                    <option value="default" disabled>-select-</option>
                    <option value="male" selected={sex === "male"}>Male</option>
                    <option value="female" selected={sex === "female"}>Female</option>
                    <option value="other" selected={sex === "other"}>Other</option>
                </select>
                <p contentEditable={edit}>{user?.website ? user.website : "Website"}</p>
                <p contentEditable={edit}>{user?.aboutMe ? user.aboutMe : "About Me"}</p>
                <button onClick={submit}>Save Updates</button>
            </section>
        </div >
    );
}

export default EditProfilePage;