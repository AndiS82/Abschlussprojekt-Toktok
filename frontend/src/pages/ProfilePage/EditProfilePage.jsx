import { useRef, useState } from 'react';
import NavbarBottom from '../../components/NavbarBottom/NavbarBottom';
import './EditProfilePage.css';

const EditProfilePage = () => {
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

    const [updatedUser, setUpdatedUser] = useState(null)
    const [image, setImage] = useState(null)
    const [imageFile, setImageFile] = useState(null)
    const [showFileInput, setShowFileInput] = useState(false)
    console.log(showFileInput)

    const showImage = () => {
        setImage(URL.createObjectURL(imageRef.current.files[0]))
        setImageFile(imageRef.current.files[0])
        submit()
    }

    const submit = async () => {
        console.log(imageFile)
        const file = imageFile
        const imageForm = new FormData()
        imageForm.append('file', file)
        imageForm.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)

        const form = {
            name: nameRef.current.value,
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
            <section>
                <img src={image} alt="profile" />
                <button onClick={() => setShowFileInput(prev => !prev)}>ICON</button>

            </section>
            <section className='editSection'>
                {showFileInput &&
                    <input type="file" ref={imageRef} />
                }
                <input ref={nameRef} type="text" placeholder='Your Name' />
                <input ref={usernameRef} type="text" placeholder='Username' />
                <input ref={occupationRef} type="text" placeholder='Occupation' />
                <input ref={dobRef} type="date" placeholder='Date of Birth' />
                <input ref={emailRef} type="email" placeholder='Email Address' />
                <input ref={telRef} type="tel" placeholder='Telephone Number' />
                <select ref={sexRef} defaultValue={"default"}>
                    <option value="default" disabled>-select-</option>
                    <option value="male" >Male</option>
                    <option value="female" >Female</option>
                    <option value="other" >Other</option>
                </select>
                <input ref={websiteRef} type="url" placeholder='Your Website' />
                <textarea ref={aboutRef} placeholder='About Me' />
                <button onClick={showImage}>Save Updates</button>
            </section>
        </div>
    );
}

export default EditProfilePage;