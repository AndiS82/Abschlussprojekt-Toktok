import NavbarBottom from '../../components/NavbarBottom/NavbarBottom';
import PersonSearch from '../../components/Searchbar/PersonSearch';
import './SearchPage.css'

const SearchPage = () => {
    return (
        <div className='searchPage'>
            <div>
                <PersonSearch />
            </div>
            <NavbarBottom />
        </div>
    )
}

export default SearchPage;