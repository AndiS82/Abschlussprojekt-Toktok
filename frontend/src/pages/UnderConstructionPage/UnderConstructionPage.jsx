import { useEffect } from 'react';
import BackButton from '../../components/BackButton/BackButton';
import NavbarBottom from '../../components/NavbarBottom/NavbarBottom';
import './UnderConstructionPage.css'

const UnderConstructionPage = ({ setUserData, setUserLoaded, userLoaded }) => {
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
                // console.log(data)
            }
            else {
                // console.log('failed to get user')
            }
        }
        getUser()
    }, [])

    return (
        <div>
            {userLoaded && <>
                <BackButton />
                <div className='underConstruction'>
                    <h1>Under Construction</h1>
                    <img src='https://source.unsplash.com/random/?construction'></img>
                </div>
                <NavbarBottom />
            </>}
        </div>
    );
}

export default UnderConstructionPage;