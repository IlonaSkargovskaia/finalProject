import React, { useContext, useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { AppContext } from "../../App";
import jwt from "jsonwebtoken";

const ReviewFormPast = ({ selectedEvent }) => {
    const { token } = useContext(AppContext);
    const [reviewData, setReviewData] = useState({
        eventid: selectedEvent.id,
        userid: null,
        rating: "",
        comment: "",
    });

    const [username, setUsername] = useState("");

    useEffect(() => {
        const decodedToken = jwt.decode(token);

        async function fetchUserInfo() {
            try {
                const response = await fetch(`/api/users/${decodedToken.user}`);
                const userData = await response.json();

                setUsername(userData.username);
                setReviewData((prevData) => ({
                    ...prevData,
                    userid: userData.id,
                }));
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        }

        fetchUserInfo();
    }, [token]);

    const ratingChanged = (newRating) => {
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
        try {
            const response = await fetch("/api/reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reviewData),
            });

            console.log("New comment: ", response);
            toast.success("Comment added successfully");
        } catch (error) {
            console.error("Error posting review to the server:", error);
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
                            <input
                                type="text"
                                id="eventid"
                                name="eventid"
                                value={selectedEvent.title} // Display event title
                                readOnly
                                className="form-control"
                            />
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
                                readOnly
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

export default ReviewFormPast;
