import React, {useState, useEffect, useContext} from "react";
import { Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../../App";
import jwt from "jsonwebtoken";


const UserDashboard = ({setAuth}) => {

    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [purchasedTickets, setPurchasedTickets] = useState([]);
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
            // Check if the toast has been shown before
            const toastShown = localStorage.getItem("toastShown");
            if (!toastShown) {
                toast("Login successfully!");
                localStorage.setItem("toastShown", "true"); // Mark as shown
            }

        } catch (error) {
            console.log(error);
        }
    }

    const getPurchasedTickets = async () => {
        const storageToken = localStorage.getItem("token");
        try {
            const decodedToken = jwt.decode(token || storageToken); 
            console.log("Decoded token in UserDash:", decodedToken);

            const res = await fetch(`/api/tickets/user/${decodedToken.user}`, {
                method: "GET",
                headers: {
                    Authorization: token || storageToken,
                },
            });

            if (!res.ok) {
                throw new Error("Failed to fetch purchased tickets");
            }
    
            const data = await res.json();
            console.log('Data in userDash: ', data);
    
            if (Array.isArray(data)) {
                setPurchasedTickets(data);
            } else {
                console.log("Invalid data format received from server:", data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getName();
        getPurchasedTickets();
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

            <div>
                <h2>Your Purchased Tickets</h2>
                {purchasedTickets.length === 0 ? (
                    <p>You have not purchased any tickets yet.</p>
                ) : (
                    <ul>
                        {purchasedTickets.map((ticket) => (
                            <li key={ticket.id}>
                                {/* Display ticket details */}
                                Event ID: {ticket.eventid}, Total Price: {ticket.total_price}, Quantity: {ticket.quantity}, Row: {ticket.row}, Seat: {ticket.seat_number}
                            </li>
                        ))}
                    </ul>
                )}
            </div>


            <button className="btn purple" onClick={(e) => logout(e)}>Logout</button>
        </Container>
    );
};

export default UserDashboard;
