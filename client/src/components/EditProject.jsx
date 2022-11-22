import React, { useState } from 'react'
import { UserContext } from '../App'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const EditProject = () => {

    const { state, dispatch } = useContext(UserContext)

    const navigate = useNavigate()

    const [carddata, setcarddata] = useState({
        title: state.card.title,
        branch: state.card.branch,
        tech: state.card.tech,
        teammember1: state.card.teammember1,
        teammember2: state.card.teammember2,
        teammember3: state.card.teammember3,
        description: state.card.description,
        _id: state.card._id
    })

    console.log(carddata)

    const handlechange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setcarddata({ ...carddata, [name]: value })
        console.log(carddata)

    }

    const savechanges = async (e) => {
        const { title, branch, tech, teammember1, teammember2, teammember3, description, _id } = carddata;
        e.preventDefault();
        console.log(carddata);
        const res = await fetch("/editproject", {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({
                title, branch, tech, teammember1, teammember2, teammember3, description, _id
            })
        })

        const data = await res.json();
        console.log(data)

        if (res.status === 422 || !data) {
            window.alert("Edit failed");

        }
        else {
            window.alert("Edit Successful");
            navigate('/');
        }




    }

    return (
        <>
            <div className="container">

                <div class="card">
                    <h5 class="card-header">Edit Project</h5>
                    <div class="card-body">
                        <form>
                            <div class="form-outline mb-4">
                                <label class="form-label" for="form4Example1">Title of Project</label>
                                <input type="text" name="title" id="form4Example1" class="form-control" value={carddata.title} onChange={handlechange} />

                            </div>

                            <div class="form-outline mb-4">
                                <label class="form-label" for="form4Example2">Branch</label>
                                <input type="text" name="branch" id="form4Example2" class="form-control" value={carddata.branch} onChange={handlechange} />

                            </div>

                            <div class="form-outline mb-4">
                                <label class="form-label" for="form4Example2">Tech Stack</label>
                                <input type="text" name="tech" id="form4Example2" class="form-control" value={carddata.tech} onChange={handlechange} />

                            </div>

                            <div class="form-outline mb-4">
                                <label class="form-label" for="form4Example2">Team Member 1</label>
                                <input type="text" name="teammember1" id="form4Example2" class="form-control" value={carddata.teammember1} onChange={handlechange} />

                            </div>

                            <div class="form-outline mb-4">
                                <label class="form-label" for="form4Example2">Team Member 2</label>
                                <input type="text" name="teammember2" id="form4Example2" class="form-control" value={carddata.teammember2} onChange={handlechange} />

                            </div>

                            <div class="form-outline mb-4">
                                <label class="form-label" for="form4Example2">Team Member 3</label>
                                <input type="text" name="teammember3" id="form4Example2" class="form-control" value={carddata.teammember3} onChange={handlechange} />

                            </div>


                            <div class="form-outline mb-4">
                                <label class="form-label" for="form4Example3">Description</label>

                                <textarea class="form-control" name="description" id="form4Example3" rows="4" value={carddata.description} onChange={handlechange}></textarea>
                            </div>



                            <button type="submit" onClick={savechanges}
                                class="btn btn-primary btn-block mb-4 d-flex justify-content-center">Save Changes</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProject