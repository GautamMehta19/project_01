import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'


function Investigation() {

    const history = useNavigate()
    const { pId } = useParams()

    const [user, setUser] = useState({
        visitedDay: 'Monday',
        investigation: '',
        visitedDate: ''
    })

    const handleInputChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    // console.log(user)
    const handleSubmit = (e) => {
        // e.preventDefault()
        axios.put(`http://localhost:3000/updateVisit/${pId}`, {
            ...user
        })
            .then(res => {
                console.log(res.data)
                history(`/`)
            })
            .catch(err => console.log(err))
        // .catch(err => console.log(err.response.data.message))
    }
    // console.log(user)
    

    return (
        <div className="form">
            <div className="form-body">
                {/* {pId} */}
                <div className="visited">
                    <label>visitedDay</label>
                    <select name="visitedDay" value={user.visitedDay} onChange={(e) => handleInputChange(e)}>
                        <option >Monday</option>
                        <option >Tuesday</option>
                        <option >Wednesday</option>
                        <option >Thrusday</option>
                        <option >Friday</option>
                        <option >Saturday</option>
                        <option >Sunday</option>
                    </select>
                    {/* <input name="visitedDay" type="text" value={user.visitedDay} onChange={(e) => handleInputChange(e)} placeholder="visitedDay" /> */}

                    <label>investigation</label>
                    <input name="investigation" type="text" value={user.investigation} onChange={(e) => handleInputChange(e)} placeholder="investigation" />

                    {/* <label>visitedDate</label>
                    <input name="visitedDate" type="date" value={user.visitedDate} onChange={(e) => handleInputChange(e)} placeholder="visitedDate" /> */}
                </div>

            </div>
            <div class="footer">
                <button onClick={() => handleSubmit()} type="submit" class="btn">Add Investigation</button>
            </div>
        </div>
    )
}

export default Investigation



// updateVisit/6419568d65912c660c542858