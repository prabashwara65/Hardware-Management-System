import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './subcomponents/header';
import Footer from './subcomponents/footer';
import Table from './subcomponents/table';

export default function Home() {
    const navigate = useNavigate(); // Hook to get access to the navigate function

    // This function will be called when the "Create Driver" button is clicked
    const handleClick = () => {
        navigate('/createDriver'); // Navigate programmatically to the create driver page
    };

    // This function will be called when the "Go to Report Page" button is clicked
    const reportHandleClick = () => {
        navigate('/report'); // Navigate programmatically to the report page
    };

    return (
        <div>
            <Header />
            <button type="button" className="btn btn-primary" onClick={handleClick}>
                Create Driver
            </button>
            <button type="button" className="btn btn-primary" onClick={reportHandleClick}>
                Go to Report Page
            </button>
            <Table />
            <Footer />
        </div>
    );
}
