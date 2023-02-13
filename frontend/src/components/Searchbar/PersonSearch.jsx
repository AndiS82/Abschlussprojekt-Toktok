import { useEffect, useState } from 'react';
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
        console.log(searchData)
    }, [])

    const enteredInput = (event) => {
        const searchWord = event.target.value;
        console.log(event.target.value)
        setWordEntered(searchWord);
        console.log(searchData)
        const filteredSearch = searchData.filter((user) => {
            return user.user.toLowerCase().includes(searchWord.toLowerCase());
        }, [])
        setFilteredData(filteredSearch)
        console.log(filteredSearch)
    }
    console.log(filteredData)
    console.log(wordEntered)

    if (wordEntered === "") {
        return (
            <div id='searchResultsDiv'>
                <input type="text" placeholder="Search name" onInput={enteredInput} value={wordEntered} />
                <div>
                    {searchData.map((user, index) => {
                        return <p key={index}>{user.user}</p>
                    })}</div>
            </div>
        )
    } else {
        return (
            <div>
                <div>
                    <input type="text" placeholder="Search name" onInput={enteredInput} value={wordEntered} />
                </div>
                <div>
                    {filteredData.map((user, index) => {
                        return <p key={index}>{user.user}</p>
                    })}
                </div>
            </div>
        )
    };
}

export default PersonSearch;