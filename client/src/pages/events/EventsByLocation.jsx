import React from "react";
import CardEvent from "../../components/CardEvent";

const EventsByLocation = (props) => {
    const { events } = props;
    return (
        <div>
            {events && events.length > 0 ? (
                events.map((item) => <CardEvent key={item.id} event={item} />)
            ) : (
                <p>No events found.</p>
            )}
        </div>
    );
};

export default EventsByLocation;
