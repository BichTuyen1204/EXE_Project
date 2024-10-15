import React from "react";
import { Link } from "react-router-dom";

const LoginButton = () => {

    return (
        <p className="mb-0">
            <Link to="/Login" className="link-in-icon-person">
                <h6>Login</h6>
            </Link>
            <br />
            <Link to="/Signup" className="link-in-icon-person">
                <h6>Sign up</h6>
            </Link>
        </p>
    );
}

export default LoginButton;