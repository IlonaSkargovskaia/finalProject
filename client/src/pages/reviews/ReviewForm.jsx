import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

const ReviewForm = () => {
    const [reviewData, setReviewData] = useState({
        eventid: "",
        userid: "",
        rating: "",
        comment: "",
    });

    const [eventList, setEventList] = useState([]);

    useEffect(() => {
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
    }, []);

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
        <div className="card mt-5 add-review">
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
                                User ID:
                            </label>
                            <input
                                type="text"
                                id="userid"
                                name="userid"
                                className="form-control"
                                value={reviewData.userid}
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
