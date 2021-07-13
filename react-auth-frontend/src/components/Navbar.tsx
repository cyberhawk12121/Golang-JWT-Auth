import React, { SyntheticEvent, useState } from "react";
import { Link, Redirect } from "react-router-dom";


const Navbar=(props:{name:string}) =>{
    
    const [redirect, setRedirect]=useState(false);

    const submit=async (e: SyntheticEvent)=>{
        e.preventDefault();
        await fetch("http://localhost:8000/api/logout", {
            headers:{"Content-Type":"application/json"},
            credentials:"include"
        })
        setRedirect(true);
    }
    if(redirect){
        return <Redirect to="/login/"></Redirect>
    }

    // If the user is logged-in then show a different Navbar with "Logout" button
    if (props.name){
    return (
        <div>
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><Link to="/" className="nav-link px-2 text-secondary">Home</Link></li>
                    </ul>
                    <div className="text-end">
                        <form onSubmit={submit}>
                            <input type="submit" value="Logout" className="btn btn-outline-light me-2" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )}
    // Otherwise show a different navbar with "login" and "Signup" buttons
    else{
        return (
            <div>
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><Link to="/" className="nav-link px-2 text-secondary">Home</Link></li>
                        </ul>
                        <div className="text-end">
                            <Link to="/login"><button type="button" className="btn btn-outline-light me-2">Login</button></Link>
                            <Link to="/register"><button type="button" className="btn btn-warning">Sign-up</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        )}  
    }
export default Navbar;