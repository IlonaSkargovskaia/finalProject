import { Container } from "react-bootstrap";
import EventsAll from "../events/EventsAll";

const Home = () => {
   
    return (
        <div>
          <Container>
            <h1>Welcome to TicketPRO</h1>

            {/* event carousel */}
            <EventsAll />
            
            </Container>
        </div>
    );
};

export default Home;
