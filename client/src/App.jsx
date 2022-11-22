import React, { useEffect } from 'react'
import { createContext } from 'react'
import { useReducer } from 'react'
import Home from './components/Home'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import Cse from './components/Cse'
import './index.css'
import Project from './components/Project'
import Login from './components/Login'
import Register from './components/Register'
import Upload from './components/Upload'
import Showcase from './components/Showcase'
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// import bg from './images/bg.jpeg'



import { initialState, reducer } from './reducer/UseReducer'
import SingleProject from './components/SingleProject'
import Logout from './components/Logout'
import About from './components/About'
import { Footer } from './components/Footer'
import EditProject from './components/EditProject'
import Profile from './components/Profile'
import ProfileNoLogin from './components/ProfileNoLogin'

export const UserContext = createContext();

const App = () => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const checkiflogin = async () => {
        console.log("in appjsx")
        try {

            const res = await fetch('/about', {
                method: "GET",
                headers: {

                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                credentials: "include"
            })

            const data = await res.json();
            console.log("in appjx " + data)

            console.log("in appjx" + res.status)
            if (!(res.status === 200)) {
                const error = new Error(res.error);
                throw error;

            }

            await dispatch({ type: "USER", payload: true })
            console.log("in app" + state.login)


        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        checkiflogin();
    }, [])



    return (

        <div className='height'

        >
            <UserContext.Provider value={{ state, dispatch }}>
                < Navbar />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path='/:branch' element={<Cse />} />
                    <Route exact path='/viewprojects' element={<Project />} />
                    <Route exact path='/login' element={<Login />} />
                    <Route exact path='/register' element={<Register />} />
                    <Route exact path='/upload' element={<Upload />} />
                    <Route exact path='/showcase' element={<Showcase />} />
                    <Route exact path='/singleproject' element={<SingleProject />} />
                    <Route exact path='/logout' element={<Logout />} />
                    <Route exact path='/about' element={<About />} />
                    <Route exact path='/edit' element={<EditProject />} />
                    <Route exact path='/profile' element={<Profile />} />
                    <Route exact path='/noprofilelogin' element={<ProfileNoLogin />} />
                </Routes>
                <Footer />
            </UserContext.Provider>
        </div>


    )
}

export default App