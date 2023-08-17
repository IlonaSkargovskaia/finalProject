import React, { useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import { Button } from "./Styles";

const ScrollButton = () => {
    const [visible, setVisible] = useState(false);

    // toggle the visibility of the button based on scroll position
    const toggleVisible = () => {
        // Get the current scroll position
        const scrolled = document.documentElement.scrollTop;
        // If scroll position is greater than 300, show the button
        if (scrolled > 300) {
            setVisible(true);
        } else if (scrolled <= 300) {
            setVisible(false);
        }
    };

    // Function to scroll to the top of the page
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // Add a scroll event listener to toggle the button visibility
    window.addEventListener("scroll", toggleVisible);

    return (
        <Button>
            <FaArrowCircleUp
                onClick={scrollToTop}
                style={{ display: visible ? "inline" : "none" }}
            />
        </Button>
    );
};

export default ScrollButton;
