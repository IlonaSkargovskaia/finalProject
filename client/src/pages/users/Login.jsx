import React, { useState } from "react";
import { Container } from "react-bootstrap";
import {Link} from 'react-router-dom'

const BASE_URL = "http://localhost:3005";

const Login = ({ setAuth }) => {

    const [inputs, setInputs] = useState({
      email: '',
      password: ''
    })

    const { email, password } = inputs;

    const onChange = (e) => {
      setInputs({...inputs, [e.target.name] : e.target.value })
    }

    const onSubmitForm = async (e) => {
      e.preventDefault();

      const body = {email, password}

      try {
        const res = await fetch(`${BASE_URL}/auth/login`, {
          method: 'POST',
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify(body)
        })

        const data = await res.json();
        //console.log(data);

        localStorage.setItem('token', data.token);
        
        setAuth(true);

      } catch (error) {
        console.log(error);
      }
    }

    return (
        <div>
            <Container>
                <h1 className="text-center">Login</h1>
                <form onSubmit={onSubmitForm}>
                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        className="form-control my-3"
                        value={email}
                        onChange={(e) => onChange(e)}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        className="form-control my-3"
                        value={password}
                        onChange={(e)=> onChange(e)}
                    />
                    <button className="btn purple">Submit</button>
                </form>
                <Link to='/register'>Register</Link>
            </Container>
        </div>
    );
};

export default Login;
