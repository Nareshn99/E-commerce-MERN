import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Spinner = ({path="login"}) => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue);
        }, 1000);
        count === 0 &&
            navigate(`/${path}`, {
                state: location.pathname,
            });
        return () => clearInterval(interval);
    }, [count, navigate, location, path]);

    return (
        <div className="form-container">
            <div className="spinner" >
            </div>
            <p>Loading........</p><br></br>
            <p>Redirect After {count} Seconds..</p>
        </div>
    )
};

export default Spinner;