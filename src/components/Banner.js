import { Jumbotron, Button, Row, Col,Container } from "react-bootstrap";
import bgimage from "../img/black_leather.jpg"

export default function Banner() {
  return (
    
    <div class="jumbotron text-white" style={{ backgroundImage: `url(${bgimage})`, backgroundSize: 'cover' }}>
      <div class="container">
        <h1 class="display-4">Furst Editions</h1>
        <p class="lead">First Editions from across the Multiverse</p>
      </div>
    </div>
    

    /*<Row>
      <Col>
        <Jumbotron className="jumbo">
          <h1>Furst Editions</h1>
          <p>Only the First Editions</p>
          <Button>Collection</Button>
        </Jumbotron>
      </Col>
    </Row>*/
  );
}