import React from "react";
import { Spinner } from "react-bootstrap";


/* 
    Utility part with multiple uses and various props
    Display is dependent on the passed prop
*/
const Asset = ({ spinner, src, message }) => {
    return (
        <div className={'${styles.Asset} p-4'}>
            {spinner && <Spinner animation="border" />}
            {src && <img src={src} alt={message} />}
            {message && <p className="mt-4"> {message}</p>}
        </div>
    );
};

export default Asset;