import React, { useContext, useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { AppContext } from "../../App";
import jwt from "jsonwebtoken";

const ReviewForm = () => {
    const { token } = useContext(AppContext);
    const [reviewData, setReviewData] = useState({
        eventid: "",
        userid: null,
        rating: "",
        comment: "",
    });

    const [eventList, setEventList] = useState([]);
    const [username, setUsername] = useState("");

    useEffect(() => {
         // Decode the token to get the user information
         const decodedToken = jwt.decode(token);

        // Fetch user information using the decoded user ID
        async function fetchUserInfo() {
            try {
                const response = await fetch(`/api/users/${decodedToken.user}`);
                const userData = await response.json();

                setUsername(userData.username); // Set the username in state
                setReviewData((prevData) => ({
                    ...prevData,
                    userid: userData.id, // Set the userid from userData
                }));
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        }

        fetchUserInfo(); 

        // Fetch the list of events from the server and populate eventList state
        async function fetchEvents() {
            try {
                const response = await fetch("/api/events");
                const eventData = await response.json();
                setEventList(eventData);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        }
        fetchEvents();
    }, [token]);

    const ratingChanged = (newRating) => {
        // Set the selected rating in the reviewData state
        console.log(newRating);
        setReviewData((prevData) => ({
            ...prevData,
            rating: newRating.toString(),
        }));
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setReviewData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Send reviewData to API endpoint using fetch or Axios
        try {
            const response = await fetch("/api/reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reviewData),
            });

            
            console.log("New comment: ", response);
            toast.success('Comment added successfully');
        } catch (error) {
            console.error("Error post review to the server:", error);
        }
    };

    return (
        <div className="card add-review">
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

            <h2>Add a Review</h2>

            <form onSubmit={handleSubmit} className="">
                <Row>
                    <Col>
                        <div className="mb-3">
                            <label htmlFor="eventid" className="form-label">
                                Event:
                            </label>
                            <select
                                id="eventid"
                                name="eventid"
                                className="form-control"
                                value={reviewData.eventid}
                                onChange={handleInputChange}
                            >
                                <option value="">Select an event</option>
                                {eventList.map((event) => (
                                    <option key={event.id} value={event.id}>
                                        {event.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </Col>
                    <Col>
                        <div className="mb-3">
                            <label htmlFor="userid" className="form-label">
                                Username:
                            </label>
                            <input
                                type="text"
                                id="userid"
                                name="userid"
                                value={username} 
                                className="form-control"
                                onChange={handleInputChange}
                            />
                        </div>
                    </Col>
                    <Col>
                        <div className="mb-3">
                            <label className="form-label">Rating:</label>

                            <ReactStars
                                count={5}
                                onChange={ratingChanged}
                                size={24}
                                isHalf={true}
                                emptyIcon={<i className="far fa-star"></i>}
                                halfIcon={
                                    <i className="fa fa-star-half-alt"></i>
                                }
                                fullIcon={<i className="fa fa-star"></i>}
                                activeColor="#ffd700"
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="mb-3">
                            <label htmlFor="comment" className="form-label">
                                Comment:
                            </label>
                            <textarea
                                id="comment"
                                name="comment"
                                className="form-control"
                                value={reviewData.comment}
                                onChange={handleInputChange}
                            />
                        </div>
                    </Col>
                </Row>

                <button type="submit" className="btn purple">
                    Submit review
                </button>
            </form>
        </div>
    );
};

export default ReviewForm;
