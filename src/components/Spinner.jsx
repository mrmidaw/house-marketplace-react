import React from 'react';
import PulseLoader from "react-spinners/PulseLoader";

export const Spinner = () => {

    return (
        <div className='loadingSpinnerContainer'>
            <PulseLoader size={24} margin={12} />
        </div>
    );
};