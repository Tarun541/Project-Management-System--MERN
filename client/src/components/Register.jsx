import React, { useState } from 'react'
import '../App.css'

import { useNavigate } from 'react-router-dom'

const Register = () => {


    const history = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        work: "",
        password: "",
        cpassword: ""
    })


    let name, value;


    const handleInputs = (e) => {
        console.log(e)
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });

    }

    const postData = async (e) => {

        e.preventDefault();
        const { name, email, work, password, cpassword } = user;

        const res = await fetch("/register", {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({
                name, email, work, password, cpassword
            })
        })

        const data = await res.json();
        console.log(data)

        if (res.status === 422 || !data) {
            window.alert("Registration failed");

        }
        else {
            window.alert("Registration Successful");
            history('/login');
        }

    }



    return (
        <>

            <div class="container">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-lg-12 col-xl-11">
                        <div class="text-black" style={{ borderRadius: "25px" }}>
                            <div class="p-md-5">
                                <div class="row justify-content-center">
                                    <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1 " style={{ borderRadius: '1rem', boxShadow: "0 0px 20px 0 rgba(0,0,0,0.1)" }}>

                                        <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                        <form method='POST' autoComplete='off' class="mx-1 mx-md-4" >

                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div class="form-outline flex-fill mb-0">
                                                    <input type="text" placeholder='Your Name'
                                                        onChange={handleInputs} value={user.name} name='name'
                                                        class="form-control" />

                                                </div>
                                            </div>

                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div class="form-outline flex-fill mb-0">
                                                    <input type="email" placeholder='Your Email'
                                                        onChange={handleInputs} value={user.email} name='email' class="form-control" />

                                                </div>
                                            </div>

                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                                                <div class="form-outline flex-fill mb-0">
                                                    <input type="text" placeholder='Profession'
                                                        onChange={handleInputs} value={user.work} name='work' class="form-control" />

                                                </div>
                                            </div>

                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div class="form-outline flex-fill mb-0">
                                                    <input type="password" placeholder=' Password' name='password'
                                                        onChange={handleInputs} value={user.password} class="form-control" />

                                                </div>
                                            </div>

                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                                                <div class="form-outline flex-fill mb-0">
                                                    <input type="password" placeholder='Confirm Password'
                                                        onChange={handleInputs} value={user.cpassword} name='cpassword'
                                                        class="form-control" />

                                                </div>
                                            </div>



                                            <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type='submit' className='btn-get-started' onClick={postData}>Register</button>

                                            </div>

                                        </form>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Register