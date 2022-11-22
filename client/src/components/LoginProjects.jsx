import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import { UserContext } from '../App';

const LoginProjects = () => {

    const { state, dispatch } = useContext(UserContext)

    const navigate = useNavigate()
    const [cardData, setcarddata] = useState()
    const [defaultvalue, setvalue] = useState(false)

    const callUploadPage = async () => {
        try {

            const res = await fetch('/loginshowcase', {
                method: "GET",
                headers: {

                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                credentials: "include"
            })

            const data = await res.json();
            setcarddata(data)
            //console.log(data)

            setvalue(true)

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (error) {
            console.log(error);

            navigate('/login')
        }
    }

    useEffect(() => {
        callUploadPage();
    }, [])

    const handleclick = async (card) => {
        await dispatch({ type: "CARD", payload: card })
        navigate('/singleproject')
        // console.log(state)
    }

    const handleEdit = async (card) => {
        await dispatch({ type: "CARD", payload: card })
        navigate('/edit')
        // console.log(state)
    }


    if (defaultvalue) {

        return (
            <>

                <div className="container mt-5">
                    {cardData.map((card) => {
                        let cardimage = card.image.split(",");
                        return (
                            <div className="row mx-auto g-4 mb-3 d-flex justify-content-center">
                                <div class="card mb-3" style={{ maxWidth: "1200px" }}>
                                    <div class="row g-0">
                                        <div class="col-md-5">
                                            <img
                                                src={`${cardimage[0]}`}
                                                alt="project photos"
                                                class="img-fluid rounded"
                                                style={{ maxHeight: "210px", objectFit: "cover" }}
                                            />
                                        </div>
                                        <div class="col-md-7 conatiner2">
                                            <div class="card-body">
                                                <h5 class="card-title">{`${card.title}`}</h5>
                                                <p class="card-text">
                                                    <strong>BRANCH : </strong> {`${card.branch}`}
                                                </p>
                                                <p class="card-text">
                                                    <strong>TECH STACK : </strong> {`${card.tech}`}
                                                </p>
                                                <p class="card-text text-truncate">
                                                    <strong>DESCRIPTION : </strong> : {`${card.description}`}
                                                </p>
                                                <p class="card-text">
                                                    <small class="text-muted">Admin mail  : {`${card.email}`}</small>
                                                </p>
                                                <div className=' bottom-right'>
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <div>
                                                                    <button type="button" onClick={() => { handleclick(card) }}
                                                                        class="btn btn-info btn-rounded">View</button>
                                                                </div>
                                                            </div>
                                                            <div className="col-6">
                                                                <div>
                                                                    <button type="button" onClick={() => { handleEdit(card) }}
                                                                        class="btn btn-info btn-rounded">Edit</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </>
        )
    }
}

export default LoginProjects