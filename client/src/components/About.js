import React from 'react'

const About = () => {
    return (
        <>
            <div class="container border d-flex align-items-center" style={{ height: "48vw", width: "100%" }}>
                <div class="row" style={{ width: "100%" }}>
                    <div class="col-sm-6 border ">
                        <h1 className='text-center'>About Us</h1>

                        <h3>Platform to maintain directory of projects</h3>

                        <ul>
                            <h4>Developed BY :</h4>
                            <li>
                                Tarun
                            </li>
                            <li>
                                Rahul
                            </li>
                            <li>
                                Pranay
                            </li>
                        </ul>

                    </div>
                    <div class="col-sm-6 border">
                        One of three columns
                    </div>

                </div>
            </div>
        </>
    )
}

export default About