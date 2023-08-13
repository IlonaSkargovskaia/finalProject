import React from "react";

const InterractiveHall = ({ totalPlaces, renderSeats }) => {
    return (
        <div className="card__right interactive">
            <h4 style={{ textAlign: "center" }}>Interactive hall</h4>
            <div className="card__interactive-total">
                <h3>choose available places:</h3>
                <p>{totalPlaces} places in total</p>
            </div>
            <div className="hall">{renderSeats()}</div>
        </div>
    );
};

export default InterractiveHall;
