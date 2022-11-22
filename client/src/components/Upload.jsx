import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UploadForm from './UploadForm';

const Upload = () => {

    const [default_value, setdefault] = useState(false);

    const [userData, setUserData] = useState({});

    const history = useNavigate()

    const callUploadPage = async () => {
        try {

            const res = await fetch('/check', {
                method: "GET",
                headers: {

                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                credentials: "include"
            })

            const data = await res.json();
            console.log(data);

            setUserData(data);
            setdefault(true);

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (error) {
            console.log(error);
            history('/login');
        }
    }

    useEffect(() => {
        callUploadPage();
    }, [])




    if (default_value) {
        return (
            <>
                <UploadForm />
            </>
        )
    } else {
        <>
        </>
    }
}

export default Upload