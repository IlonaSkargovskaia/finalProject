import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import {CiBullhorn, CiLollipop, CiMusicNote1, CiPlay1, CiStar, CiTrophy} from 'react-icons/ci';


const Header = () => {
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <section className="header__categories">
            <div className="bg__black">
                <Container>
                    <h1>Where will you go?</h1>
                    <h3>
                        we are doing our best to find for you the event you are
                        looking for
                    </h3>

                    <div className="home__categories">
                        <div className="category-links d-flex justify-content-center gap-4">
                            <Link to="/category/1">
                                <div className="cat__block"><CiMusicNote1 />Music</div>
                            </Link>
                            <Link to="/category/2">
                                <div className="cat__block"><CiPlay1 />Movies</div>
                            </Link>
                            <Link to="/category/3">
                                <div className="cat__block"><CiBullhorn />Conference</div>
                            </Link>
                            <Link to="/category/4">
                                <div className="cat__block"><CiStar />Festivals</div>
                            </Link>
                            <Link to="/category/5">
                                <div className="cat__block"><CiTrophy />Sports</div>
                            </Link>
                            <Link to="/category/6">
                                <div className="cat__block"><CiLollipop />Kids</div>
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        </section>
    );
};

export default Header;
