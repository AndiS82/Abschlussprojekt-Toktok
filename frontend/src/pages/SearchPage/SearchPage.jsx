import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarBottom from '../../components/NavbarBottom/NavbarBottom';
import PersonSearch from '../../components/Searchbar/PersonSearch';
import './SearchPage.css'

const SearchPage = ({ setUserData, setUserLoaded, userLoaded }) => {
    const nav = useNavigate()
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
                nav('/')
            }
        }
        getUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
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