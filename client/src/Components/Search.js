import React, {useState} from 'react'

const Search = () => {

    const [user, setUser] = useState({
        name : ''
    })

    const handleInputChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

console.log(user)
    return (
        <div>
            <input name="search" type="text" value={user.name} onChange={(e) => handleInputChange(e)} placeholder="search"/>
            <button>Search</button>
        </div>
    )
}

export default Search