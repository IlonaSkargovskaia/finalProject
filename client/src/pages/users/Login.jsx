import React from 'react'
import { Container } from 'react-bootstrap'

const Login = ({setAuth}) => {
  return (
    <div>
      <Container>
        <h1>Login</h1>
        <button onClick={() => setAuth(true)}>Authenticate</button>
      </Container>
      
    </div>
  )
}

export default Login