import React from "react";
import { useNavigate } from 'react-router-dom';
import UpdateForm from "./subcomponents/updateForm";
import Header from "./subcomponents/header";
import Footer from "./subcomponents/footer";

export default function Update(){

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
           <UpdateForm/>
          
           <Footer/>
        </div>
    )
}