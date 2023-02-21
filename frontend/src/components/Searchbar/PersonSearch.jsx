import { useEffect, useState } from 'react';
import { GoSearch, GoTrashcan, GoPerson } from "react-icons/go";
import FollowButton from '../FollowButton/FollowButton';
import './PersonSearch.css'

const userFetch = process.env.REACT_APP_BACKEND_URL_USERS;

const PersonSearch = ({ useContextUser }) => {
    const [searchData, setSearchData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [wordEntered, setWordEntered] = useState("")

    // const useContextUserName = useContextUser.username

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
            return useContextUser.user.toLowerCase().includes(searchWord.toLowerCase()) !== user.user?.toLowerCase().includes(searchWord.toLowerCase())
                || useContextUser.username.toLowerCase().includes(searchWord.toLowerCase()) !== user.username?.toLowerCase().includes(searchWord.toLowerCase())
                || useContextUser.name.toLowerCase().includes(searchWord.toLowerCase()) !== user.name?.toLowerCase().includes(searchWord.toLowerCase())
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
                    <input className='searchInput' type="text" placeholder="Search name" onInput={enteredInput} value={wordEntered} />
                </div>
                <div className='goPersonDiv'>
                    <GoPerson className='personIcon' />
                </div>
            </form>
            {wordEntered === "" &&
                <div id='searchResultsDiv'>
                    <div>
                        {searchData?.filter(user => user._id !== useContextUser._id).map((user, index) => {
                            return (
                                <div className='searchUserContainer' key={index}>
                                    <div className='searchPicContainer'>
                                        <img className='searchImage' src={user?.image?.url} alt={user.username}></img>
                                    </div>
                                    <div className='userInfo'>
                                        <p className='searchUser' key={index}>{user.username}</p>
                                        <p className='searchOccupation'>{user.occupation}</p>
                                    </div>
                                    <FollowButton followedUser={user} />
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
                                <FollowButton followedUser={user} />
                            </div>)
                    })}
                </div>
            }

            {wordEntered.includes(filteredData) && wordEntered !== "" &&
                <div className='noResults'>
                    <p className='searchUser'>No results</p>
                </div>
            }
        </div >
    )
};

export default PersonSearch;