import React, { SyntheticEvent, useState } from "react";
import {Redirect} from "react-router-dom";

const Login=()=>{
    const [email,setEmail]= useState('');
    const [password, setPassword]= useState('')

    const [redirect,setRedirect]= useState(false)
    
    // var redirect= false;
    const submit= async (e: SyntheticEvent)=>{
        e.preventDefault();

        await fetch ("http://localhost:8000/api/login", {
            method: "POST",
            headers:{"Content-Type": "application/json"},
            credentials:'include',  // to get the cookies from the backend
            body: JSON.stringify({
                email,
                password,
            })
        })
        // set redirect to true
        setRedirect(true);
    }
    if(redirect){
        return <Redirect exact to="/"> </Redirect>
    }
    
    return (
        <div>
            <form className="form-signin" onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                <div className="form-floating">
                    <input type="email" className="form-control" id="floatingPassword" 
                    placeholder="Email" onChange={e=>setEmail(e.target.value)} />
                    <label htmlFor="floatingPassword">Enter Email</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" 
                    placeholder="Password" onChange={e=> setPassword(e.target.value)} />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            </form>
        </div>
    );
};
export default Login;