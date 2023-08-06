import React from "react";
import { Container } from "react-bootstrap";

const UserDashboard = ({setAuth}) => {
    return (
        <Container>
            <h1>User dashboard</h1>
            <button onClick={() => setAuth(false)}>Log out</button>
        </Container>
    );
};

export default UserDashboard;
