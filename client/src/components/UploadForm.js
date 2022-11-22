import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const UploadForm = () => {

    const navigate = useNavigate()

    const [uploadData, setData] = useState({
        title: "",
        tech: "",
        branch: "",
        description: "",
        reference: "",
        rating: 0,
        teammember1: "",
        teammember2: "",
        teammember3: "",
        team1email: "",
        team2email: "",
        team3email: ""
    })

    const [docdata, setdocdata] = useState({
        docpath: ""
    })

    const [image, setimage] = useState('');
    const [documentation, setdocument] = useState('');


    let name, value;

    const handleData = (e) => {
        name = e.target.name;
        value = e.target.value;
        setData({ ...uploadData, [name]: value });
    }

    const Datapost = async () => {


        const res1 = await fetch('/about', {
            method: "GET",
            headers: {

                "Content-Type": "application/json",
                Accept: "application/json"
            },
            credentials: "include"
        })

        const data1 = await res1.json();
        console.log(data1.email)


        const formData = new FormData();
        for (let i = 0; i < image.length; i++) {
            formData.append('image', image[i]);
        }



        for (var key in uploadData) {
            formData.append(key, uploadData[key]);
        }

        console.log(formData);


        const res = await fetch('/upload', {
            method: 'POST',
            body: formData
        })

        console.log("adffa");
        const data = await res.json()
        console.log(data.path);



        const formData2 = new FormData();
        for (let i = 0; i < documentation.length; i++) {
            formData2.append('documentation', documentation[i]);
        }

        setdocdata(data);
        // for (var key in docdata) {
        //     formData2.append(key, docdata[key]);
        // }
        formData2.append('docpath', data.path)


        const res2 = await fetch('/updatedoc', {
            method: 'POST',
            body: formData2
        })
        const r = await res2.json()
        console.log(r)



        if (res.status === 422 || !data) {
            window.alert("upload failed");

        }
        else {
            window.alert("upload Successful");
            navigate('/')

        }

    }



    return (
        <>
            <section>
                <div class="container h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-xl-9">

                            <h1 className='text-center mb-4'>Upload Form</h1>


                            <div class="card" style={{ borderRadius: "15px;" }}>
                                <div class="card-body">



                                    <div class="row align-items-center pt-4 pb-3">
                                        <div class="col-md-3 ps-5">

                                            <h6 class="mb-0">Project Title</h6>

                                        </div>
                                        <div class="col-md-9 pe-5">

                                            <input type="text" name='title' value={uploadData.title} onChange={handleData}
                                                class="form-control form-control-lg" />

                                        </div>
                                    </div>

                                    <hr class="mx-n3" />

                                    <div class="row align-items-center py-3">
                                        <div class="col-md-3 ps-5">

                                            <h6 class="mb-0">Tech Stack</h6>

                                        </div>
                                        <div class="col-md-9 pe-5">

                                            <input type="text" name='tech' value={uploadData.tech}
                                                onChange={handleData} class="form-control form-control-lg" placeholder="Ex:Mern" />

                                        </div>
                                    </div>

                                    <hr class="mx-n3" />

                                    <div class="row align-items-center py-3">
                                        <div class="col-md-3 ps-5">

                                            <h6 class="mb-0">Branch</h6>

                                        </div>
                                        <div class="col-md-9 pe-5">

                                            <select class="select" name='branch' value={uploadData.branch} onChange={handleData}>
                                                <option value="1">Branch</option>
                                                <option value="CSE">CSE</option>
                                                <option value="MECH">MECHANICAL</option>
                                                <option value="CHEM">CHEMICAL</option>
                                                <option value="ECE">ECE</option>
                                                <option value="CIVIL">CIVIL</option>
                                                <option value="EEE">EEE</option>
                                            </select>

                                        </div>
                                    </div>



                                    <hr class="mx-n3" />

                                    <div class="row align-items-center py-3">
                                        <div class="col-md-3 ps-5">

                                            <h6 class="mb-0">Description</h6>

                                        </div>
                                        <div class="col-md-9 pe-5">

                                            <textarea class="form-control" name='description' onChange={handleData}
                                                value={uploadData.description} rows="3" placeholder="Describe your project"></textarea>

                                        </div>
                                    </div>

                                    <hr class="mx-n3" />

                                    <div class="row align-items-center py-3">
                                        <div class="col-md-3 ps-5">

                                            <h6 class="mb-0">Project Screenshots</h6>

                                        </div>
                                        <div class="col-md-9 pe-5">

                                            <input class="form-control form-control-lg" onChange={(e) => { setimage(e.target.files); console.log(image) }}
                                                name='screenshots' multiple id="formFileLg" type="file" />
                                            <div class="small text-muted mt-2">Upload Screenshots or images of your project</div>

                                        </div>
                                    </div>


                                    <hr class="mx-n3" />

                                    <div class="row align-items-center py-3">
                                        <div class="col-md-3 ps-5">

                                            <h6 class="mb-0">Documentation File</h6>

                                        </div>
                                        <div class="col-md-9 pe-5">

                                            <input class="form-control form-control-lg" onChange={(e) => { setdocument(e.target.files); }}
                                                name='documentation' multiple type="file" />

                                            <div class="small text-muted mt-2">Upload documentation file of your project</div>
                                        </div>
                                    </div>

                                    <hr class="mx-n3" />

                                    <div class="row align-items-center py-3">
                                        <div class="col-md-3 ps-5">

                                            <h6 class="mb-0">Team Members</h6>

                                        </div>
                                        <div class="col-md-9 pe-5">

                                            <div className='row'>
                                                <div className="col-6">
                                                    <input type="text" name='teammember1' value={uploadData.teammember1}
                                                        onChange={handleData} class="form-control form-control-lg" placeholder="Team Member 1" />
                                                </div>
                                                <div className="col-6">
                                                    <input type="email" name='team1email' value={uploadData.team1email}
                                                        onChange={handleData} class="form-control form-control-lg" placeholder="Team Member email" />
                                                </div>
                                            </div>

                                            <br />

                                            <div className='row'>
                                                <div className="col-6">
                                                    <input type="text" name='teammember2' value={uploadData.teammember2}
                                                        onChange={handleData} class="form-control form-control-lg" placeholder="Team Member 3" />
                                                </div>
                                                <div className="col-6">
                                                    <input type="email" name='team2email' value={uploadData.team2email}
                                                        onChange={handleData} class="form-control form-control-lg" placeholder="Team Member email" />
                                                </div>
                                            </div>

                                            <br />
                                            <div className='row'>
                                                <div className="col-6">
                                                    <input type="text" name='teammember3' value={uploadData.teammember3}
                                                        onChange={handleData} class="form-control form-control-lg" placeholder="Team Member 3" />
                                                </div>
                                                <div className="col-6">
                                                    <input type="email" name='team3email' value={uploadData.team3email}
                                                        onChange={handleData} class="form-control form-control-lg" placeholder="Team Member email" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <hr class="mx-n3" />

                                    <div class="row align-items-center py-3">
                                        <div class="col-md-3 ps-5">

                                            <h6 class="mb-0">Website Link</h6>

                                        </div>
                                        <div class="col-md-9 pe-5">

                                            <input type="text" class="form-control form-control-lg" value={uploadData.reference} onChange={handleData}
                                                name='reference' placeholder="github repository link or project url..." />

                                        </div>
                                    </div>

                                    <hr class="mx-n3" />

                                    <div class="px-5 py-4">
                                        <button type="submit" onClick={Datapost} class="btn btn-primary btn-lg">Send application</button>
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

export default UploadForm