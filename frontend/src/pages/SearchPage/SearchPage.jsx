import { useEffect } from 'react';
import NavbarBottom from '../../components/NavbarBottom/NavbarBottom';
import PersonSearch from '../../components/Searchbar/PersonSearch';
import './SearchPage.css'

const SearchPage = ({ setUserData, setUserLoaded, userLoaded }) => {

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
        <div className='searchPage'>
            {userLoaded && <>
                <div>
                    <PersonSearch />
                </div>
                <NavbarBottom />
            </>}
            {!userLoaded && <p>Loading ...</p>}
        </div>
    )
}

export default SearchPage;