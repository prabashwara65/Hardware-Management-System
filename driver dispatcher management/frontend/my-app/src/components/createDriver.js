import React from "react";
import { useNavigate } from 'react-router-dom';
import Header from "./subcomponents/header";
import Footer from "./subcomponents/footer";
import Form from "./subcomponents/form";


export default function CreateDriver(){

    const navigate = useNavigate(); // Hook to get access to the navigate function

    // This function will be called when the button is clicked
    const handleClick = () => {
        navigate('/'); // Navigate programmatically
    };

    return(
        <div>
            <Header/>
            <button type="button" className="btn btn-primary" onClick={handleClick}>
              View Drivers
            </button>
            <Form/>
          
            <Footer/>
        </div>
    )
}