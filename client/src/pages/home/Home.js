import { Container } from "react-bootstrap";
import EventsAll from "../events/EventsAll";

const Home = () => {
    return (
        <div className="home__page">
            <Container>
                <h1>Top Selling on TicketPRO</h1>

                <EventsAll />
            </Container>
        </div>
    );
};

export default Home;
