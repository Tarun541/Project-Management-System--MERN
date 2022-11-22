import React, { useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import '../index.css'
import Project from './Project'
// import bg from '../images/bg.jpeg'
import { UserContext } from '../App';
import LoginProjects from './LoginProjects';

const Home = () => {
    const { state, dispatch } = useContext(UserContext)


    useEffect(() => {
        dispatch({ type: "navbar", payload: true })
    }, [])

    const handlenav = () => {
        dispatch({ type: "navbar", payload: false })
        console.log("clicked in home" + state)
    }

    console.log("in home" + state)

    if (!state.login) {
        return (
            <>

                <div className="bg">
                    <div className="conatiner d-flex align-items-center " style={{ zIndex: "1", width: "100%", height: "45vw" }}>
                        <div className="row ms-3" style={{ width: "100%", marginBottom: "10%" }}>
                            <div className="col-12 col-md-6 ">
                                <h1 className='logosize mb-4'>Project Managment System</h1>
                                <h6 className='subtitle'>    -   A web platform to maintain a directory of all the projects</h6>

                                <NavLink to="/upload" className='upload ms-3 my-3' onClick={() => { handlenav() }}
                                    style={{ textDecoration: "None" }}>Upload Project</NavLink>

                                <NavLink to="/showcase" className='upload ms-3 my-3' onClick={() => { handlenav() }}
                                    style={{ textDecoration: "None" }}>View Projects</NavLink>
                            </div>

                            <div className="col-0 col-md-6"></div>
                        </div>
                    </div>

                    <div className="trans"></div>


                </div>



                <div className="container mt-5">
                    <h1 className='text-center'>Branches</h1>
                </div>

                <Project />


            </>
        )
    }
    else {
        return (
            <>
                <div >
                    <h2 class="card-title text-center mt-5" style={{ color: "rgb(92, 79, 189)" }}><strong>Your Uploaded Projects</strong></h2>

                    <LoginProjects />
                </div>

            </>
        )
    }


}

export default Home