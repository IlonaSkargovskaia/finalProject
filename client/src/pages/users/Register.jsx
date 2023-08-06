import React, { useState } from "react";
import { Container } from "react-bootstrap";

const BASE_URL = "http://localhost:3005";

const Register = () => {

    const [inputs, setInputs] = useState({
      email: '',
      password: '',
      username: ''
    })

    const {username, email, password} = inputs;

    const onChange = (e) => {
      //копируем текущее состояние, обновляем поля при этом достаем имя поля и присваиваем значение введенное пользователем name : value
      setInputs({...inputs, [e.target.name] : [e.target.value]})
    }

    //
    const onSubmitForm = async (e) => {
      e.preventDefault();

      try {
        //from the state
        const body = {username, email, password}

        const res = await fetch(`${BASE_URL}/auth/register`, {
          method: 'POST',
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify(body)
        });

        const data = await res.json();
        //if all okay  - we get token
        console.log(data);
        
      } catch (error) {
        console.log(error);
      }
    }

    return (
        <Container>
            <h1 className="text-center my-5">Register</h1>
            <form onSubmit={onSubmitForm}>
                <input
                    type="text"
                    name="username"
                    placeholder="username"
                    className="form-control my-3"
                    value={username}
                    onChange={(e) => onChange(e)}
                />
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
                    onChange={(e) => onChange(e)}
                />
                <button className="btn purple">Submit</button>
            </form>
        </Container>
    );
};

export default Register;
