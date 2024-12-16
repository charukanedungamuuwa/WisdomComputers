    import React, { useState } from 'react';
    import Suppliers from "./Suppliers";
    import {useNavigate} from "react-router-dom";
    const HomePage=()=>{
    const navigate = useNavigate();
        const handleButtonClick = () => {
            navigate('/suppliers');  // Navigate to the Suppliers page
        };
   return(

    <div>


        <button onClick={handleButtonClick}>
            Suppliers

        </button>
    </div>);
    };
     export default HomePage;