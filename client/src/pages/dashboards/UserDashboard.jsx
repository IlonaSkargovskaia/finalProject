import React, {useState, useEffect} from "react";
import { Container } from "react-bootstrap";

const BASE_URL = "http://localhost:3005";

const UserDashboard = ({setAuth}) => {

    const [username, setUsername] = useState('');

    const getName = async() => {
        try {
            const res = await fetch(`${BASE_URL}/dashboard/`, {
                method: "GET",
                headers: {
                    token: localStorage.token
                }
            })

            const data = await res.json();
            // data: {id: 12, username: 'newuser', email: 'new@gmail.com', password: '$2b$10$cO4StuB/ZRJPWXOSz9StnepNtqnbJeWrzhvvcCnQap0kpBuF49kNm', role: 'user', …}
            //console.log(data.username); //only username

            setUsername(data.username)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getName();
    }, [])

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        setAuth(false);
    }

    return (
        <Container>
            <h1>User dashboard {username}</h1>
            <button className="btn purple" onClick={(e) => logout(e)}>Logout</button>
        </Container>
    );
};

export default UserDashboard;
