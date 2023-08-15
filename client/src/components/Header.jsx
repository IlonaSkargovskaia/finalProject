import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    CiBullhorn,
    CiLollipop,
    CiMusicNote1,
    CiPlay1,
    CiStar,
    CiTrophy,
} from "react-icons/ci";
import { Form, Container, InputGroup, FormControl, Button } from "react-bootstrap";
import { CiSearch } from "react-icons/ci";

const Header = () => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearchInput = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();

        navigate(`/search?q=${searchQuery}`);
    };

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
                                <div className="cat__block">
                                    <CiMusicNote1 />
                                    Music
                                </div>
                            </Link>
                            <Link to="/category/2">
                                <div className="cat__block">
                                    <CiPlay1 />
                                    Movies
                                </div>
                            </Link>
                            <Link to="/category/3">
                                <div className="cat__block">
                                    <CiBullhorn />
                                    Conference
                                </div>
                            </Link>
                            <Link to="/category/4">
                                <div className="cat__block">
                                    <CiStar />
                                    Festivals
                                </div>
                            </Link>
                            <Link to="/category/5">
                                <div className="cat__block">
                                    <CiTrophy />
                                    Sports
                                </div>
                            </Link>
                            <Link to="/category/6">
                                <div className="cat__block">
                                    <CiLollipop />
                                    Kids
                                </div>
                            </Link>
                        </div>
                    </div>
                </Container>
            

            <Form
                className="d-flex"
                onSubmit={handleSearchSubmit}
                style={{ maxWidth: "500px", margin: "65px auto 50px" }}
            >
                <InputGroup className="search__top">
                    <InputGroup.Text>
                        <CiSearch />
                    </InputGroup.Text>
                    <FormControl
                        type="search"
                        className="me-2 search-top"
                        style={{ background: "transparent", color: "#fff" }}
                        placeholder="Search events by title..."
                        value={searchQuery}
                        onChange={handleSearchInput}
                    />
                    <Button className="purple" onClick={handleSearchSubmit}> Search </Button>
                </InputGroup>
            </Form>
            </div>
        </section>
    );
};

export default Header;
