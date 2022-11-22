import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import profile from '../images/project.jpeg'
import { UserContext } from '../App';
import { MDBIcon } from 'mdb-react-ui-kit'
import '../App.css'


const Profile = () => {


    const { state, dispatch } = useContext(UserContext)
    const [edit, setedit] = useState("border-0");

    const [userData, setUserData] = useState({});
    const [cardData, setcarddata] = useState([])
    const [defaultvalue, setvalue] = useState(false)

    const history = useNavigate()

    const callAboutPage = async () => {
        try {

            const res = await fetch('/about', {
                method: "GET",
                headers: {

                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                credentials: "include"
            })

            const data = await res.json();

            setUserData(data);
            console.log(userData)

            const res1 = await fetch('/loginshowcase', {
                method: "GET",
                headers: {

                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                credentials: "include"
            })

            const data1 = await res1.json();
            setcarddata(data1)
            console.log(data1)

            setvalue(true)

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (error) {
            console.log(error);
            history('/');
        }
    }

    useEffect(() => {
        callAboutPage();
    }, [])

    const handleprofile = () => {
        setedit("")
    }

    const editprofile = (e) => {
        let name = e.target.name
        let value = e.target.value

        setUserData({ ...userData, [name]: value })

    }

    const changeprofile = async (e) => {
        e.preventDefault();

        console.log("in change profile")
        const { name, email, work, phone, linkedin, github, twitter, insta, _id } = userData;


        const res = await fetch("/editprofile", {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({
                name, email, work, phone, linkedin, github, twitter, insta, _id
            })
        })

        const data = await res.json();
        console.log(data)

        if (res.status === 200) {
            window.alert("Profile update Successful");

        }
        else {
            window.alert("Profile update failed");
            history('/profile');
        }


    }

    const handlview = async (card) => {
        await dispatch({ type: "CARD", payload: card })
        history('/singleproject')
    }

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
                                            <div className="row ">
                                                <div className="col-4 my-auto">
                                                    <p className='my-auto'>LinkedIn</p>

                                                </div>
                                                <div className="col-8 ms-auto">
                                                    <input type="text" name='linkedin' value={userData.linkedin} onChange={editprofile}
                                                        class={`form-control form-control ${edit}`} />
                                                </div>
                                            </div>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                                            <div className="row ">
                                                <div className="col-4 my-auto">
                                                    <p className='my-auto'>Github</p>

                                                </div>
                                                <div className="col-8 ms-auto">
                                                    <input type="text" name='github' value={userData.github} onChange={editprofile}
                                                        class={`form-control form-control ${edit}`} />
                                                </div>
                                            </div>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                                            <div className="row ">
                                                <div className="col-4 my-auto">
                                                    <p className='my-auto'>Twitter</p>

                                                </div>
                                                <div className="col-8 ms-auto">
                                                    <input type="text" name='twitter' value={userData.twitter} onChange={editprofile}
                                                        class={`form-control form-control ${edit}`} />
                                                </div>
                                            </div>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                                            <div className="row ">
                                                <div className="col-4 my-auto ">
                                                    <p className='my-auto'>Instagram</p>

                                                </div>
                                                <div className="col-8 ms-auto">
                                                    <input type="text" name='insta' value={userData.insta} onChange={editprofile}
                                                        class={`form-control form-control ${edit}`} />
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
                                        <div class="col-sm-3 my-auto">
                                            <p class="mb-0">Full Name</p>
                                        </div>
                                        <div class="col-sm-9 ">
                                            <input type="text" name='name' value={userData.name} onChange={editprofile}
                                                class={`form-control form-control ${edit}`} style={{ width: "350px" }} />
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col-sm-3 my-auto">
                                            <p class="mb-0">Email</p>
                                        </div>
                                        <div class="col-sm-9">
                                            <input type="email" name='email' value={userData.email} onChange={editprofile}
                                                class={`form-control form-control ${edit}`} style={{ width: "350px" }} />
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col-sm-3 my-auto">
                                            <p class="mb-0">Phone</p>
                                        </div>
                                        <div class="col-sm-9">
                                            <input type="text" name='phone' value={userData.phone} onChange={editprofile}
                                                class={`form-control form-control ${edit}`} style={{ width: "350px" }} />
                                        </div>
                                    </div>
                                    <hr />


                                    <div class="row ">
                                        <div class="col-sm-3 my-auto">
                                            <p class="mb-0">Designation</p>
                                        </div>
                                        <div class="col-sm-9">
                                            <input type="text" name='work' value={userData.work} onChange={editprofile}
                                                class={`form-control form-control ${edit}`} style={{ width: "350px" }} />
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
                        <div class="d-flex justify-content-center mb-2 mt-5">
                            <button type="button" class="btn-get-started" onClick={() => { handleprofile() }} style={{ border: "none" }}>Edit Profile</button>
                            <button type="submit" class="btn-get-started  ms-3" onClick={changeprofile} style={{ border: "none" }}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )

}

export default Profile