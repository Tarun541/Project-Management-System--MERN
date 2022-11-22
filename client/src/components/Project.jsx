import React, { useState } from 'react'
import cse from '../images/cse2.jpg'
import ece from '../images/ece8.jpg'
import civil from '../images/civil1.jpg'
import mech from '../images/mech2.jpg'
import chem from '../images/chem2.jpg'
import mme from '../images/mme2.jpg'
import '../index.css'
import { NavLink } from 'react-router-dom'

const Project = () => {

    const [branch, setbranch] = useState("");


    return (
        <>
            <div class="container">
                <div class="row bg-light gy-4 my-5">

                    <div class="col-md-6  col-lg-4 d-flex align-items-center justify-content-center">
                        <div class="container2">
                            <NavLink to={`/CSE`}>
                                <img src={cse} alt=".." />
                                <div className="bottom-left text-white"><h1 className='fsize'>C S E</h1></div>
                            </NavLink>
                        </div>
                    </div>

                    <div class="col-md-6 col-lg-4 d-flex align-items-center justify-content-center">
                        <div class="container2">
                            <NavLink to={`/ECE`}>
                                <img src={ece} alt="Snow" />
                                <div className="bottom-left text-white"><h1 className='fsize text-left'>E C E</h1></div>
                            </NavLink>
                        </div>
                    </div>

                    <div class="col-md-6  col-lg-4 d-flex align-items-center justify-content-center">
                        <div class="container2">
                            <NavLink to={`/CIVIL`}>
                                <img src={civil} alt=".." style={{ width: "50%" }} />
                                <div className="bottom-left text-white"><h1 className='fsize'>C I V I L</h1></div>
                            </NavLink>
                        </div>
                    </div>

                    <div class="col-md-6  col-lg-4 d-flex align-items-center justify-content-center">
                        <div class="container2">
                            <NavLink to={`/MECH`} >
                                <img src={mech} alt=".." />
                                <div className="bottom-left text-white"><h1 className='fsize'>M E C H</h1></div>
                            </NavLink>
                        </div>
                    </div>

                    <div class="col-md-6 col-lg-4 d-flex align-items-center justify-content-center">
                        <div class="container2">
                            <NavLink to={`/CHEM`} >
                                <img src={chem} alt="Snow" />
                                <div className="bottom-left text-white"><h1 className='fsize text-left'>C H E M</h1></div>
                            </NavLink>
                        </div>
                    </div>

                    <div class="col-md-6  col-lg-4 d-flex align-items-center justify-content-center">
                        <div class="container2">
                            <NavLink to={`/MME`} >
                                <img src={mme} alt=".." />
                                <div className="bottom-left text-white"><h1 className='fsize'>M M E</h1></div>
                            </NavLink>
                        </div>
                    </div>

                </div>
            </div >

        </>
    )
}

export default Project