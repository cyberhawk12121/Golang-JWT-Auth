import React, {SyntheticEvent, useState} from "react";
import {Redirect} from 'react-router-dom';

const Register=()=>{
    const [name,setName] = useState('');
    const [username, setUsername]= useState('');
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    // initially "redirect" is false but when the submit is completed we want to redirect us to login page
    const  [redirect, setRedirect]= useState(false);

    // On submit we'll send this request to the "Register" function of the go backend to register a User
    // with the credentials given by the User
    const submit=async (e: SyntheticEvent)=>{
        e.preventDefault();
        // fetch(<request api>, <request info>) returns a promise  
        await fetch("http://localhost:8000/api/register",{
            method: 'POST',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                name,
                username,
                email,
                password,
            })
        })
        // Here redirect is set to true after success
        setRedirect(true);
    }
    if (redirect){
        return <Redirect to="/login/" />
    }
    return (
        <div>
            <form className="form-signin" onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

                <div className="form-floating">
                    <input type="text" name="name" className="form-control" id="floatingInput" 
                    placeholder="John Doe" onChange={e=>setName(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Enter Name</label>
                </div>
                <div className="form-floating">
                    <input type="email" name="email" className="form-control" id="floatingPassword" 
                    placeholder="abc@example.com" onChange={e=>setEmail(e.target.value)}
                    />
                    <label htmlFor="floatingPassword">Email</label>
                </div>
                <div className="form-floating">
                    <input type="text" name="username" className="form-control" id="floatingPassword" 
                    placeholder="Name123_" onChange={e=>setUsername(e.target.value)}
                    />
                    <label htmlFor="floatingPassword">Username</label>
                </div>
                <div className="form-floating">
                    <input type="password" name="password" className="form-control" id="floatingPassword" 
                    placeholder="Password" onChange={e=>setPassword(e.target.value)}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            </form>
        </div>
    )
}
export default Register

function initialState(initialState: any, arg1: string): [any, any] {
    throw new Error("Function not implemented.");
}
function input(input: any, arg1: string, init: any, arg3: { method: string; headers: { "Content-Type": string; }; body: string; }) {
    throw new Error("Function not implemented.");
}

function init(input: any, arg1: string, init: any, arg3: { method: string; headers: { "Content-Type": string; }; body: string; }) {
    throw new Error("Function not implemented.");
}

function value(value: any, arg1: { name: string; username: string; email: string; password: string; }) {
    throw new Error("Function not implemented.");
}
