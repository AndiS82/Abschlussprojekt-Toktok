import { useEffect, useState } from 'react';
import { GoSearch, GoTrashcan } from "react-icons/go";
import './PersonSearch.css'

const userFetch = process.env.REACT_APP_BACKEND_URL_USERS;

const PersonSearch = () => {
    const [searchData, setSearchData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [wordEntered, setWordEntered] = useState("")

    useEffect(() => {
        const getData = async () => {
            const users = await fetch(userFetch)
            const userData = await users.json()
            setSearchData(userData)
        }
        getData()
    }, [])

    const enteredInput = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const filteredSearch = searchData.filter((user) => {
            console.log(user)
            return user.user?.toLowerCase().includes(searchWord.toLowerCase())
                || user.username?.toLowerCase().includes(searchWord.toLowerCase())
                || user.name?.toLowerCase().includes(searchWord.toLowerCase())
        }, [event])
        setFilteredData(filteredSearch)

    }

    const clearButton = () => {
        setFilteredData([])
        setWordEntered("")
    }
    console.log(searchData)
    return (
        <div className='personSearch'>
            <form className='form'>
                <div className='formInput'>
                    <span className='searchBar'>
                        {wordEntered === "" && <GoSearch className='icon' />}
                        {wordEntered !== "" && <button className='resetButton' onClick={clearButton}><GoTrashcan className='icon' /></button>}
                    </span>
                    <input type="text" placeholder="Search name" onInput={enteredInput} value={wordEntered} />
                </div>
            </form>
            {wordEntered === "" &&
                <div id='searchResultsDiv'>
                    <div>
                        {searchData.map((user, index) => {
                            return (
                                <div className='searchUserContainer' key={index}>
                                    <div className='searchPicContainer'>
                                        <img className='searchImage' src={user?.image?.url} alt={user.user}></img>
                                    </div>
                                    <div className='userInfo'>
                                        <p className='searchUser' key={index}>{user.user}</p>
                                        <p className='searchOccupation'>{user.occupation}</p>
                                    </div>
                                    <button type="button" className='followButton'>Follow</button>
                                </div>
                            )
                        })}</div>
                </div>
            }

            {filteredData && wordEntered !== "" &&
                < div id='searchResultsDiv'>
                    {filteredData.map((user, index) => {
                        return (
                            <div className='searchUserContainer' key={index}>
                                <div className='searchPicContainer'>
                                    <img className='searchImage' src={user?.image?.url} alt={user.user}></img>
                                </div>
                                <div className='userInfo'>
                                    <p className='searchUser' key={index}>{user.user}</p>
                                    <p className='searchOccupation'>{user.occupation}</p>
                                </div>
                                <button type="button" className='followButton'>Follow</button>
                            </div>)
                    })}
                </div>
            }

            {wordEntered.includes(filteredData) && wordEntered !== "" &&
                <div className='noResults'>
                    <p>No results</p>
                </div>
            }
        </div >)
};

export default PersonSearch;