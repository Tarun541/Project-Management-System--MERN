import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import '../App.css'
import { UserContext } from '../App';

const Login = () => {

    const { state, dispatch } = useContext(UserContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();

        const res = await fetch('/signin', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        const data = await res.json();
        console.log(data)

        if (res.status === 400 || !data) {
            window.alert('Invalid Credentials');

        }
        else {
            dispatch({ type: 'USER', payload: true })
            console.log(state);
            window.alert("Login Successful");
            navigate('/')

        }

    }


    return (
        <>

            <section class="vh-80 mt-5" style={{ height: "100%" }}>
                <div class="container py-3 h-80">
                    <div class="row d-flex justify-content-center align-items-center h-50">
                        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div class="card bg-white text-black" style={{ borderRadius: '1rem', boxShadow: "0 0px 20px 0 rgba(0,0,0,0.1)" }}>
                                <div class="card-body px-5 text-center">

                                    <div class="mb-md-5 mt-md-4 pb-5">

                                        <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                                        <p class="text-black-50 mb-5">Please enter your login and password!</p>

                                        <form>
                                            <div class="form-outline form-white mb-4">
                                                <input type="text"
                                                    name="name"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    class="form-control"
                                                    id="fullname"
                                                    placeholder="Email" />

                                            </div>

                                            <div class="form-outline form-white mb-4">
                                                <input type="password"
                                                    name="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    class="form-control"
                                                    id="password"
                                                    placeholder="Password" />

                                            </div>



                                            <button type='submit' className='btn-get-started' onClick={loginUser}>Login</button>

                                        </form>

                                    </div>

                                    <div>
                                        <p class="mb-0">Don't have an account? <NavLink to="/register" class="text-dark-50 fw-bold">Sign Up</NavLink>
                                        </p>
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

export default Login