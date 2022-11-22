import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom'

const Cse = (props) => {

    const { state, dispatch } = useContext(UserContext)

    const navigate = useNavigate()

    const [branchdata, setbranchdata] = useState();
    const [defaultvalue, setvalue] = useState(false)
    console.log(window.location.pathname);

    const callBranchProject = async () => {
        try {



            const res = await fetch(`${window.location.pathname}`, {
                method: "GET",
                headers: {

                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                credentials: "include"
            })

            const data = await res.json();
            setbranchdata(data)
            setvalue(true)
            console.log(data);


            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        callBranchProject();
    }, [])

    const handleclick = async (card) => {
        await dispatch({ type: "CARD", payload: card })
        navigate('/singleproject')
        // console.log(state)
    }

    if (defaultvalue) {

        if (branchdata.length == 0) {
            return (<>
                <div className='text-center mt-5'>NO Data found related to This Branch.</div>
            </>)
        }

        return (
            <>


                <div className="container mt-3 card-group ">
                    {branchdata.map((card) => {
                        return (
                            <div className="row mx-auto g-2">
                                <div class="card mb-3" style={{ maxWidth: "548px" }}>
                                    <div class="row g-0">
                                        <div class="col-md-6">
                                            <img
                                                src={`${card.image}`}
                                                alt="Trendy Pants and Shoes"
                                                class="img-fluid rounded"
                                                style={{ maxHeight: "210px", objectFit: "cover" }}

                                            />
                                        </div>
                                        <div class="col-md-6 conatiner2">
                                            <div class="card-body">
                                                <h5 class="card-title">{`${card.title}`}</h5>
                                                <p class="card-text">
                                                    {`${card.description}`}
                                                </p>
                                                <p class="card-text">
                                                    <small class="text-muted">Last updated 3 mins ago</small>
                                                </p>
                                                <div>
                                                    <button type="button" onClick={() => { handleclick(card) }}
                                                        class="btn btn-info btn-rounded bottom-right">Info</button>
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

export default Cse