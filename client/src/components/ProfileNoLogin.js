import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom'
import '../App.css'

const ProfileNoLogin = () => {

    const { state, dispatch } = useContext(UserContext)

    const navigate = useNavigate()

    const [userData, setUserData] = useState({})
    const [cardData, setcarddata] = useState([])
    const [defaultvalue, setvalue] = useState(false)

    console.log("in no profilelogin" + state)

    const callnoprofile = async () => {

        try {
            const res = await fetch('/noprofilelogin', {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    email: state.email
                })
            })
            // console.log("type=" + typeof (res) + " res" + JSON.stringify(await res.json()));
            const data = await res.json();
            console.log("in no profilelogin", data)
            setUserData(data)
            setvalue(true)

            const res1 = await fetch('/noprofileproject', {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    email: state.email
                })
            })

            const data1 = await res1.json();
            // const data2 = await JSON.parse(await data1)

            setcarddata(data1)
            console.log("in noprofileproject", data1)

            // setvalue(true)
        } catch (error) {
            console.log(error)
        }


    }

    useEffect(() => {
        callnoprofile()
    }, [])

    const handlview = async (card) => {
        await dispatch({ type: "CARD", payload: card })
        navigate('/singleproject')
    }


    if (defaultvalue) {
        return (
            <>
                <section style={{ backgroundColor: "#eee" }}>
                    <div class="container py-5">

                        <div class="row">
                            <div class="col-lg-4">
                                <div class="card mb-4">
                                    <div class="card-body text-center">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                                            class="rounded-circle img-fluid" style={{ width: "150px" }} />
                                        <h5 class="my-3 text-capitalize">{userData.name}</h5>
                                        <p class="text-muted mb-1">Full Stack Developer</p>

                                    </div>
                                </div>
                                <div class="card mb-4 mb-lg-0">
                                    <div class="card-body p-0">
                                        <ul class="list-group list-group-flush rounded-3">
                                            <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                                                <div className="row" style={{ width: "100%" }}>
                                                    <div className="col-6 my-auto">
                                                        <p className='my-auto'>LinkedIn</p>

                                                    </div>
                                                    <div className="col-6 ms-auto">
                                                        <p class="mb-0">{userData.linkedin}</p>

                                                    </div>
                                                </div>
                                            </li>
                                            <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                                                <div className="row " style={{ width: "100%" }}>
                                                    <div className="col-6 my-auto">
                                                        <p className='my-auto'>Github</p>

                                                    </div>
                                                    <div className="col-6 ms-auto">
                                                        <p class="mb-0">{userData.github}</p>

                                                    </div>
                                                </div>
                                            </li>
                                            <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                                                <div className="row " style={{ width: "100%" }}>
                                                    <div className="col-6 my-auto">
                                                        <p className='my-auto'>Twitter</p>

                                                    </div>
                                                    <div className="col-6 ms-auto">
                                                        <p class="mb-0">{userData.twitter}</p>

                                                    </div>
                                                </div>
                                            </li>
                                            <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                                                <div className="row " style={{ width: "100%" }}>
                                                    <div className="col-6 my-auto ">
                                                        <p className='my-auto'>Instagram</p>

                                                    </div>
                                                    <div className="col-6 ms-auto">
                                                        <p class="mb-0">{userData.insta}</p>

                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-8">
                                <div class="card mb-4">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <p class="mb-0">Full Name</p>
                                            </div>
                                            <div class="col-sm-9">
                                                <p class="text-muted mb-0 text-capitalize">{userData.name}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <p class="mb-0">Email</p>
                                            </div>
                                            <div class="col-sm-9">
                                                <p class="text-muted mb-0">{userData.email}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <p class="mb-0">Phone</p>
                                            </div>
                                            <div class="col-sm-9">
                                                <p class="text-muted mb-0">{userData.phone}</p>
                                            </div>
                                        </div>
                                        <hr />


                                        <div class="row">
                                            <div class="col-sm-3">
                                                <p class="mb-0">Designation</p>
                                            </div>
                                            <div class="col-sm-9">
                                                <p class="text-muted mb-0">{userData.work}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="card mb-4 mb-md-0">
                                            <div class="card-body">
                                                <p class="mb-4"><span class="text-primary font-italic me-1">Projects Done</span>
                                                </p>
                                                {

                                                    cardData.map((card) => {
                                                        return (
                                                            <div className="row mt-3">
                                                                <div className="col-md-6 text-uppercase">
                                                                    <strong>{card.title}</strong>
                                                                </div>
                                                                <div className="col-md-6">

                                                                    <button type="button" class="btn btn-outline-primary mx-5" onClick={() => { handlview(card) }}>View Project</button>

                                                                    <button type="button" class="btn btn-outline-warning mx-5"><a href={`https://${card.reference}`} target="blank">Website</a></button>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
    else {
        return (
            <>
                <h4 className='text-center'>User has not created any profile yet!</h4>
            </>
        )
    }
}

export default ProfileNoLogin