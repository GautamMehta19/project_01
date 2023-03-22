import React, { useState, setState } from 'react';
import axios from 'axios'
import './CreatePatient.css'
import { useNavigate } from 'react-router-dom'

function CreatePatient() {

    const history = useNavigate()

    const [user, setUser] = useState({
        UHID: "",
        fName: "",
        mName: "",
        lName: "",
        gender: "Male",
        age: '',
        weight: '',
        title: 'Mr',
        address: '',
        mobile: '',
        email: '',
        dob: '',
        visitedDay : 'Monday',
        investigation : '',
        visitedDate : ''
    })

    const handleInputChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }


    const handleSubmit = (e) => {
        axios.post("http://localhost:3000/create", {
            ...user
        })
            .then(res => {
                console.log(res.data)
                history(`/updateVisit/${res.data.data._id}`)
            })
            // .catch(err => console.log(err))
            .catch(err => console.log(err.response.data.message))
    }
    // console.log(user)

    return (
        <div className="form">
            <div className="form-body">

                <div className="UHID">
                    <label>UHID</label>
                    <input name="UHID" type="text" value={user.UHID} onChange={(e) => handleInputChange(e)} placeholder="UHID" />
                </div>

                <div className="fName">
                    <label>first Name</label>
                    <input name="fName" type="text" value={user.fName} onChange={(e) => handleInputChange(e)} placeholder="first Name" />
                </div>

                <div className="mName">
                    <label>middle Name</label>
                    <input name="mName" type="text" value={user.mName} onChange={(e) => handleInputChange(e)} placeholder="middle Name" />
                </div>

                <div className="lName">
                    <label>last Name</label>
                    <input name="lName" type="text" value={user.lName} onChange={(e) => handleInputChange(e)} placeholder="last Name" />
                </div>

                <div className="gender">
                    <label>gender</label>
                    <select name="gender" value={user.gender} onChange={(e) => handleInputChange(e)}>
                        <option >Male</option>
                        <option >Female</option>
                    </select>

                    {/* <input name="gender" type="text" value={user.gender} onChange={(e) => handleInputChange(e)} placeholder="gender" /> */}
                </div>

                <div className="age">
                    <label>age</label>
                    <input name="age" type="number" value={user.age} onChange={(e) => handleInputChange(e)} placeholder="age" />
                </div>

                <div className="weight">
                    <label>weight</label>
                    <input name="weight" type="number" value={user.weight} onChange={(e) => handleInputChange(e)} placeholder="weight" />
                </div>

                <div className="title">
                    <label>title</label>
                    <select name="title" value={user.title} onChange={(e) => handleInputChange(e)}>
                        <option >Mr</option>
                        <option >Mrs</option>
                        <option >Miss</option>
                    </select>

                    {/* <input name="title" type="text" value={user.title} onChange={(e) => handleInputChange(e)} placeholder="title" /> */}
                </div>

                <div className="address">
                    <label>address</label>
                    <input name="address" type="text" value={user.address} onChange={(e) => handleInputChange(e)} placeholder="address" />
                </div>

                <div className="mobile">
                    <label>mobile</label>
                    <input name="mobile" type="number" value={user.mobile} onChange={(e) => handleInputChange(e)} placeholder="mobile" />
                </div>

                <div className="email">
                    <label>email</label>
                    <input name="email" type="text" value={user.email} onChange={(e) => handleInputChange(e)} placeholder="email" />
                </div>

                <div className="dob">
                    <label>dob</label>
                    <input name="dob" type="date" value={user.dob} onChange={(e) => handleInputChange(e)} placeholder="dob" />
                </div>

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
                <button onClick={() => handleSubmit()} type="submit" class="btn">Register</button>
            </div>
        </div>

    )
}

export default CreatePatient