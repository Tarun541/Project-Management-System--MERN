
import { NavLink } from 'react-router-dom'
import project from '../images/project.jpeg'
import { UserContext } from '../App';
import React, { useContext, useEffect } from 'react'
import '../App.css'


const Navbar = (props) => {

    const { state, dispatch } = useContext(UserContext)


    const navhandle = () => {
        dispatch({ type: "navbar", payload: false })
        console.log("clicked in Navbar" + state)
    }

    const RenderMenu = (props) => {

        console.log(state)


        if (state.login) {
            return (
                <>

                    <li className="nav-item">
                        <NavLink className="nav-link mx-2" onClick={() => { navhandle() }}
                            style={{ color: "white" }} to="/profile"><strong>Profile</strong></NavLink>
                    </li>


                    <li className="nav-item">
                        <NavLink className="nav-link mx-2" onClick={() => { navhandle() }}
                            style={{ color: `${props.data}` }} to="/logout"><strong>Logout</strong></NavLink>
                    </li>



                </>
            )

        } else {
            return (<>

                <li className="nav-item">
                    <NavLink className="nav-link mx-2" onClick={() => { navhandle() }}
                        style={{ color: `${props.data}` }} to="/login"><strong>Login/Register</strong></NavLink>
                </li>


            </>)
        }


    }



    console.log("in if navbar" + state)
    return (<>
        <div className="container-fluid navcol navcoll">
            <nav className="navbar navbar-expand-lg navbar-light bg-muted">
                <div className="container-fluid">
                    <NavLink className="navbar-brand mx-4" to="/" style={{ textDecoration: 'none' }} >
                        <div>
                            <img src={project} className="d-inline-block align-top" style={{ width: 40, height: 40 }} alt="" />
                            {/* <lead style={{ fontFamily: "verdana", color: "white" }}>Project Hub</lead> */}
                        </div>
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <NavLink exact className="nav-link active" style={{ color: "white" }} aria-current="page" to="/"><strong>Home</strong></NavLink>
                            </li>


                            <li className="nav-item">
                                <NavLink className="nav-link mx-2" onClick={() => { navhandle() }}
                                    style={{ color: "white" }} to="/upload"><strong>Upload</strong></NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link mx-2" onClick={() => { navhandle() }}
                                    style={{ color: "white" }} to="/showcase"><strong>All-Projects</strong></NavLink>
                            </li>



                            <RenderMenu data={"white"} />




                        </ul>
                    </div>
                </div>
            </nav>


        </div>
    </>)

}

export default Navbar