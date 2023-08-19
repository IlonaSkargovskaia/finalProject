import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { MdLockPerson } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";

const Register = ({ setAuth }) => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        username: "",
    });

    const { username, email, password } = inputs;

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    //
    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            // Create a request body with user's username, email, and password from the state
            const body = { username, email, password };

            // Send a POST request to the server for registration
            const res = await fetch(`/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            const data = await res.json();
            //if all okay  - we get token
            //console.log(data); //data = {token: "kedjrgejrbgselhb"}

            if (data.token) {
                //now we need to save token to localstorage
                localStorage.setItem("token", data.token);

                setAuth(true);
                toast("Registered successfully!");
            } else {
                setAuth(false);
                toast(data.error);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
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
                    <MdLockPerson />
                </div>

                <h1 className="text-center">Register</h1>

                <Row className="justify-content-center text-center">
                    <form onSubmit={onSubmitForm} className="my-authform">
                        <input
                            type="text"
                            name="username"
                            placeholder="username"
                            className="form-control my-3"
                            value={username}
                            onChange={(e) => onChange(e)}
                            required
                        />
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
                        Do you already have an account?{" "}
                        <Link to="/login">Login</Link>
                    </p>
                </Row>
            </div>
        </Container>
    );
};

export default Register;
