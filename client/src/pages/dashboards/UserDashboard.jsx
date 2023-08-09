import React, {useState, useEffect, useContext} from "react";
import { Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../../App";


const UserDashboard = ({setAuth}) => {

    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const {token} = useContext(AppContext);

    const getName = async() => {

        const storageToken = localStorage.getItem('token');

        try {
            const res = await fetch(`/dashboard/`, {
                method: "GET",
                headers: {
                    Authorization: token || storageToken,
                },
            })

            const data = await res.json();
            // data: {id: 12, username: 'newuser', email: 'new@gmail.com', password: '$2b$10$cO4StuB/ZRJPWXOSz9StnepNtqnbJeWrzhvvcCnQap0kpBuF49kNm', role: 'user', …}
            //console.log(data.username); //only username

            setUsername(data.username);
            setRole(data.role);
            toast("Login successfully!");

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getName();
    }, [])

    const logout = (e) => {
        e.preventDefault();

        toast.success('Logged out successfully');
        localStorage.removeItem('token');
        localStorage.removeItem("toastShown");
        setAuth(false);
        
    }

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
            <h1>Hello, {username}</h1>
            <p>You authorized as "{role}"</p>
            <button className="btn purple" onClick={(e) => logout(e)}>Logout</button>
        </Container>
    );
};

export default UserDashboard;
