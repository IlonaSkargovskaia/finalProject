import React from "react";
import { useLocation } from "react-router-dom";

const SearchResults = ({ events }) => {
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get("q");

    // Use the search query from the URL param to filter events
    const filteredEvents = events.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <h2>Search Results for: {searchQuery}</h2>
            {filteredEvents && filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                    <div key={event.id}>
                        <h2>{event.title}</h2>
                        
                    </div>
                ))
            ) : (
                <p>No events found.</p>
            )}
        </div>
    );
};

export default SearchResults;
