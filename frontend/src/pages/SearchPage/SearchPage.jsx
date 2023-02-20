import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarBottom from '../../components/NavbarBottom/NavbarBottom';
import PersonSearch from '../../components/Searchbar/PersonSearch';
import { UserContext } from '../../contexts/UserContext';
import warteUhr from '../../img/Frame.png'
import './SearchPage.css'

const SearchPage = ({ setUserData, setUserLoaded, userLoaded }) => {
    const useContextUser = useContext(UserContext)
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
                    <PersonSearch useContextUser={useContextUser} />
                </div>
                <NavbarBottom />
            </>}
            {!userLoaded && <div className="notLoadedDiv"><p className='loadingP'>Loading ...</p>
                <img className='warteUhr' src={warteUhr} alt='Warteuhr' />
            </div>}
        </div>
    )
}

export default SearchPage;