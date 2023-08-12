import React, { useEffect, useState } from "react";
import ReviewForm from "./ReviewForm";
import { Card, Col, Container, Row } from "react-bootstrap";
import { FaRegComments } from "react-icons/fa";
import { BsPerson } from "react-icons/bs";
import { CiStar } from "react-icons/ci";
import axios from "axios";
import { slice } from "lodash";
import RightCategories from "../../components/RightCategories";

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const [eventInfo, setEventInfo] = useState([]);

    const [isCompleted, setIsCompleted] = useState(false);
    const [index, setIndex] = useState(2);
    const initialPosts = slice(reviews, 0, index);

    const loadMore = () => {
        setIndex(index + 2);
        console.log(index);
        if (index >= reviews.length) {
            setIsCompleted(true);
        } else {
            setIsCompleted(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const reviewsResponse = await axios.get(`/api/reviews/`);
                setReviews(reviewsResponse.data);

                const usersResponse = await axios.get(`/api/users/`);
                setUserInfo(usersResponse.data);

                const eventsResponse = await axios.get(`/api/events/`);
                setEventInfo(eventsResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Container>
                <Row>
                    <Col lg={9} md={12} sm={12}>
                        <h3>Last reviews: </h3>
                        <Row>
                            {initialPosts.map((review, index) => {
                                //find user by his ID and save it to user var
                                const user = userInfo.find(
                                    (user) => user.id === review.userid
                                );
                                const event = eventInfo.find(
                                    (event) => event.id === review.eventid
                                );
                                return (
                                    <Col md={6} key={index}>
                                        <Card className="review my-3">
                                            {event && <h4>{event.title}</h4>}
                                            <hr />
                                            <Row>
                                                <Col>
                                                    {user && (
                                                        <p className="review-user">
                                                            <BsPerson />{" "}
                                                            {user.username}
                                                        </p>
                                                    )}
                                                </Col>
                                                <Col className="text-end">
                                                    <p>
                                                        <CiStar
                                                            style={{
                                                                fontSize:
                                                                    "20px",
                                                                marginBottom:
                                                                    "4px",
                                                            }}
                                                        />
                                                        {review.rating}
                                                    </p>
                                                </Col>
                                            </Row>

                                            <p className="review-comment">
                                                <FaRegComments
                                                    style={{
                                                        margin: "0 10px 10px 0",
                                                        color: "#959595",
                                                        fontSize: "15px",
                                                    }}
                                                />
                                                {review.comment}
                                            </p>
                                        </Card>
                                    </Col>
                                );
                            })}
                        </Row>
                        <div className="d-grid mt-3 mb-5">
                            {isCompleted ? (
                                <button
                                    onClick={loadMore}
                                    type="button"
                                    className="btn btn-danger disabled"
                                    
                                >
                                    That's it
                                </button>
                            ) : (
                                <button
                                    onClick={loadMore}
                                    type="button"
                                    className="btn purple"
                                    style={{
                                        maxWidth: "150px",
                                        margin: "auto",
                                    }}
                                >
                                    Load More ...
                                </button>
                            )}
                        </div>

                        <ReviewForm />
                    </Col>
                    <Col lg={3} md={12} sm={12}>
                        <RightCategories />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Reviews;
