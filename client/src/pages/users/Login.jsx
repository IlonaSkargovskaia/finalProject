import React, { useState, useContext } from "react";
import { Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../../App";
import jwt from "jsonwebtoken";
import { MdOutlineLockPerson } from "react-icons/md";

const Login = ({ setAuth }) => {
    // store user's email and password
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const { email, password } = inputs;

    //get from appContext from App info
    const { setToken, setUserRole, setIsVerify } = useContext(AppContext);
    const navigate = useNavigate();

    //handle input changes
    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    // what will happens after submit
    const onSubmitForm = async (e) => {
        e.preventDefault();

        // Create a request body with user's email and password
        const body = { email, password };

        try {
            // Send a POST request to the server for authentication
            const res = await fetch(`/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            const data = await res.json();

            //console.log('Data in Login:', data);

            // Check if a token is present in the response
            if (data.token) {
                localStorage.setItem("token", data.token);

                // Decode the token to get user information
                const decodedToken = jwt.decode(data.token);

                //console.log('Decoded token in Login:',decodedToken);

                if (decodedToken) {
                    const { role } = decodedToken;

                    // Update context state with token, user role, and verification status
                    setToken(data.token);
                    setAuth(true);
                    setUserRole(role.trim());

                    console.log("Role in Login: ", role);
                }
            } else {
                setAuth(false);
                toast(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Container>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />

                <div className="auth-form">
                    <div className="register-i">
                        <MdOutlineLockPerson />
                    </div>
                    <h1 className="text-center">Login</h1>
                    <Row className="justify-content-center text-center">
                        <form onSubmit={onSubmitForm} className="my-authform">
                            <input
                                type="email"
                                name="email"
                                placeholder="email"
                                className="form-control my-3"
                                value={email}
                                onChange={(e) => onChange(e)}
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="password"
                                className="form-control my-3"
                                value={password}
                                onChange={(e) => onChange(e)}
                                required
                            />
                            <button className="btn purple">Submit</button>
                        </form>
                        <p style={{ marginTop: "25px" }}>
                        not registered yet?
                            <Link to="/register" target="_blank"> Register now</Link>
                        </p>
                    </Row>
                </div>
            </Container>
        </div>
    );
};

export default Login;
