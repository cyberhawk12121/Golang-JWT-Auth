import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import {BrowserRouter, Route} from "react-router-dom";

function App() {

  // const { create } = require('ipfs-http-client')
  // const ipfs = create('https://ipfs.infura.io:5001')

  const [name, setName]= useState('');

  // const run= async ()=>{
  //   const file= await ipfs.add("Hello World")
  //   const imageHash= file['path']
  //   console.log("CID: ",imageHash)
  // } 
  // run();

  useEffect(()=>{
      (
          async ()=>{
              const response= await fetch("http://localhost:8000/api/user", {
                  headers:{"Content-Type":"application/json"},
                  credentials:"include",
              })
              const content= await response.json();   // convert promise to JSON
              setName(content.Name)   // set name var to User's Name.
          }
      )();
  });

  return (
    <div className="App">
      <BrowserRouter>
        <header className="p-3 bg-dark text-white">
          {/* <Navbar> name={name}</Navbar> */}
          <Navbar name={name}></Navbar>
        </header>

        <main>
          {/* Check how to pass props in some other way LATER! Because this method is confusing */}
            <Route exact path="/" component={()=><Home name={name}></Home>} />  
            <Route path="/login" component={Login}></Route>
            <Route path="/Register" component={Register}></Route>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
