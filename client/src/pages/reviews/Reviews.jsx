import React  from "react";
import ReviewForm from "./ReviewForm";
import { Col, Container, Row } from "react-bootstrap";
import LastReviews from "./LastReviews";
import RightCategories from "../../components/RightCategories";

const Reviews = () => {
    

    return (
        <div>
            <Container>
                <Row>
                    <Col lg={9} md={12} sm={12}>
                        <LastReviews />

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
