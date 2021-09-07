import { Fragment } from "react";
import { Container } from "react-bootstrap";

import Banner from "../components/Banner";
import Highlights from "../components/Highlights";

export default function Home() {
  return (
    <Fragment>
      <Container fluid className="myContainer">
        
        <Banner />
        <Highlights />
        
      </Container>
    </Fragment>
  );
}