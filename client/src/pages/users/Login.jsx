import React, { useState, useContext } from "react";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../../App";


const Login = ({ setAuth }) => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const { email, password } = inputs;

    const { setToken } = useContext(AppContext);

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();

        const body = { email, password };

        try {
            const res = await fetch(`/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            const data = await res.json();
            //console.log(data);

            if (data.token) {
                localStorage.setItem("token", data.token);
                setToken(data.token);
                setAuth(true);
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
                <h1 className="text-center">Login</h1>
                <Row className="justify-content-center text-center">
                    <form onSubmit={onSubmitForm} className="w-50">
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
                    <span >Don't have an account yet?</span>
                    <Link to="/register" >Register</Link>
                </Row>
            </Container>
        </div>
    );
};

export default Login;
