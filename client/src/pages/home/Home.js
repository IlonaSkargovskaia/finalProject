import { Container } from "react-bootstrap";
import EventsAll from "../events/EventsAll";
import { LiaHotjar } from "react-icons/lia";

const Home = () => {
    return (
        <div className="home__page">
            <Container>
            
                <h1><LiaHotjar />Top selling on "TicketPRO"</h1>

                <EventsAll />

                
            </Container>
        </div>
    );
};

export default Home;
