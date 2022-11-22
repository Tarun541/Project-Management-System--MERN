import React, { useState } from 'react'
import { UserContext } from '../App'
import { useContext } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import cse from '../images/profile.png'
import Typography from '@mui/material/Typography'
import { Rating } from '@mui/material/Rating';
import ReactStars from "react-rating-stars-component";
// import { Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import '../App.css'
import {
    MDBFooter,
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBIcon,
    MDBBtn,
} from "mdb-react-ui-kit";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import { downloadPlugin } from '@react-pdf-viewer/download';


const Carousl = () => {



    const { state, dispatch } = useContext(UserContext)

    console.log(state.card);

    const card = state.card.image.split(",");

    return (<>

        <div className="container mt-5">
            <Carousel>

                {card.map((path) => {
                    return (
                        <Carousel.Item interval={1000}>
                            <img
                                className="d-block"
                                src={`${path}`}
                                alt="First slide"
                                style={{ width: "100%", height: "50vh", objectFit: "cover", borderRadius: "10px" }}
                            />

                        </Carousel.Item>
                    )
                })}
            </Carousel>
        </div>
    </>)
}


const Right = () => {

    const { state, dispatch } = useContext(UserContext)

    return (<>
        <div class="card border-0">
            <div class="card-body">
                <div className='bg-danger text-white p-3 mb-2' style={{ borderRadius: "7px" }}>
                    <h5 class="card-title text-center" >Description</h5>
                </div>
                <div class="container">
                    <div class="row mt-5">
                        <div class="col">
                            <h6>Branch:</h6>
                        </div>
                        <div class="col">
                            {state.card.branch}
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col">
                            <h6>Tech Stack:</h6>
                        </div>
                        <div class="col">
                            {state.card.tech}
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col">
                            <h6>Admin:</h6>
                        </div>
                        <div class="col">
                            {state.card.email}
                        </div>
                    </div>


                    <div class="row mt-3">
                        <div class="col">
                            <h6>About:</h6>
                        </div>
                        <div class="col">
                            {state.card.description}
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col">
                            <h6>Website:</h6>
                        </div>
                        <div class="col">
                            <a href={`https://${state.card.reference}`}>{state.card.reference}</a>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </>)

}

const SingleProject = () => {



    // The button to download the current file


    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const { state, dispatch } = useContext(UserContext)

    const navigate = useNavigate()

    const handle1 = async () => {
        console.log("in handle1")
        await dispatch({ type: "email", payload: state.card.team1email })
        navigate('/noprofilelogin')
    }

    const handle2 = async () => {
        console.log("in handle2")
        await dispatch({ type: "email", payload: state.card.team2email })
        navigate('/noprofilelogin')
    }

    const handle3 = async () => {
        console.log("in handle3")
        await dispatch({ type: "email", payload: state.card.team3email })
        navigate('/noprofilelogin')
    }

    return (
        <>

            <div className="container">
                <h1 className='mt-3 text-center mb-5 text-capitalize'>{state.card.title}</h1>
            </div>

            <div class="container mx-auto">
                <div class="row">
                    <div class="col-sm">
                        <Carousl />


                    </div>
                    <div class="col-sm-7">
                        <Right />
                    </div>
                </div>
            </div>




            <div className="container mt-5">
                <div className="row">

                    <div className="col-lg-1">

                    </div>
                    <div className="col-lg-4 d-flex justify-content-center align-items-center">
                        <div className="container">
                            <div className="row">
                                <h5 className='mb-3'>Team Members:</h5>
                                <div class="card mb-3 border-0" style={{ maxWidth: "400px" }}>
                                    <div class="row g-0">
                                        <div class="col-md-3">
                                            <img
                                                src={cse}
                                                alt="Trendy Pants and Shoes"

                                                style={{ width: "70px", height: "70px", borderRadius: "50%" }}
                                            />
                                        </div>

                                        <div class="col-md-9 conatiner2">

                                            <div class="card-body">

                                                <div className="row">

                                                    <div className="col-sm-6">
                                                        <h6 class="card-title">{state.card.teammember1}</h6>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <button onClick={handle1} className="btn btn-outline-secondary">view profile</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                <div class="card mb-3 border-0" style={{ maxWidth: "400px" }}>
                                    <div class="row g-0">
                                        <div class="col-md-3">
                                            <img
                                                src={cse}
                                                alt="Trendy Pants and Shoes"

                                                style={{ width: "70px", height: "70px", borderRadius: "50%" }}
                                            />
                                        </div>
                                        <div class="col-md-9 conatiner2 ">
                                            <div class="card-body">
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <h6 class="card-title">{state.card.teammember2}</h6>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <button onClick={handle2} className="btn btn-outline-secondary">view profile</button>
                                                    </div>
                                                </div>


                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                <div class="card mb-3 border-0" style={{ maxWidth: "400px" }}>
                                    <div class="row g-0">
                                        <div class="col-md-3">
                                            <img
                                                src={cse}
                                                alt="Trendy Pants and Shoes"

                                                style={{ width: "70px", height: "70px", borderRadius: "50%" }}
                                            />
                                        </div>
                                        <div class="col-md-9 conatiner2">
                                            <div class="card-body">
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <h6 class="card-title">{state.card.teammember3}</h6>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <button onClick={handle2} className="btn btn-outline-secondary">view profile</button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="col-lg-7">
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js">
                            <div className="container mt-5">
                                <div className="row">

                                    <div
                                        style={{
                                            border: '1px solid rgba(0, 0, 0, 0.3)',
                                            height: '500px'
                                        }}
                                    >
                                        <Viewer

                                            fileUrl={`${state.card.documentation}`}
                                            defaultScale={SpecialZoomLevel.PageFit}
                                        />;
                                    </div>



                                </div>
                            </div>
                        </Worker>
                    </div>




                </div>

                <div className='container mt-5 d-flex justify-content-center'>
                    <h3>Share Project:</h3>
                </div>


                <div className='d-flex justify-content-center '>

                    <section className="mb-4">
                        <button className='share-buttons mx-2'>
                            <a

                                href={`https://www.facebook.com/sharer/share.php?u=${window.location.href}`}
                                target='_blank'
                                style={{ textDecoration: "none", marginLeft: "5px", marginRight: "5px" }}
                            >
                                <MDBIcon fab icon="facebook-f" /> Share
                            </a>
                        </button>

                        <button className='share2 mt-1'>
                            <a


                                href={`https://twitter.com/share?url=${window.location.href}`}
                                role="button"
                                target="_blank"
                                style={{ textDecoration: "none", marginLeft: "5px", marginRight: "5px" }}
                            >
                                <MDBIcon fab icon="twitter" /> Tweet
                            </a>
                        </button>
                        <button className='share3 mt-1 mx-2'>
                            <a


                                style={{ textDecoration: "none", marginLeft: "5px", marginRight: "5px" }}
                                href={`https://web.whatsapp.com://send?text=${window.location.href}`}
                                role="button"
                                target="_blank"
                            >
                                <MDBIcon fab icon="whatsapp" /> whatsapp
                            </a>

                        </button>

                    </section>
                </div>

            </div>





        </>
    )
}

export default SingleProject


