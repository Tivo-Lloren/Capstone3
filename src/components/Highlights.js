import { Container, Card, Row, Col } from "react-bootstrap";
import img1 from "../img/devilworshippers.png"
import img2 from "../img/worldisyourtoilet.png"
import img3 from "../img/hephepboy.png"
import img4 from "../img/cookingwithpoo.png"
import img5 from "../img/maliitperomaluwang.png"
import img6 from "../img/rsrpt.png"
import img7 from "../img/thenextimearound.png"
import img8 from "../img/thedronequeen.png"
import img9 from "../img/thelostartofteaching.png"
import img10 from "../img/acompletelistofallthings.png"
import img11 from "../img/hellohello.png"
import img12 from "../img/11thingswedontknowyet.png"
//import {Link} from "react-router-dom"
//import {useState,useEffect} from "react"

export default function Highlights() {

  //const [productId,setProductId] = useState("")

  /*useEffect(()=>{

      fetch(`http://localhost:8000/products/${productId}`)
      .then(res => res.json())
      .then(data =>{
          console.log(data)
        setProductId(data._id)
      })

    },[])*/

  return (

<Container>
    <Row className="mt-4">
      <Col xs={12} md={4}>
        <Card className="cardHighlight card border-light mb-3" >
        {/*<Link to={`/products/${productId}`}></Link>*/}
        <img src={img1}  className="img-fluid"/>
          <Card.Body>
            <Card.Title style={{ fontSize: ".8rem" }}>The Devil Worshiper's Guide To Apartment Hunting</Card.Title>
            <Card.Text style={{ fontSize: ".8rem" }}>
              Description available after purchase
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={4}>
        <Card className="cardHighlight card border-light mb-3" >
          <img src={img2} className="img-fluid" />
          <Card.Body>
            <Card.Title style={{ fontSize: ".8rem" }}>The World Is Your Toilet</Card.Title>
            <Card.Text style={{ fontSize: ".8rem" }}>
              Description available after purchase
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={4}>
        <Card className="cardHighlight card border-light mb-3">
          <img src={img3} className="img-fluid" />
          <Card.Body>
            <Card.Title style={{ fontSize: ".8rem" }}>The Hep Hep Boy</Card.Title>
            <Card.Text style={{ fontSize: ".8rem" }}>
              Description available after purchase
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      
    </Row>

    
    <Row className="mt-4">
      <Col xs={12} md={4}>
        <Card className="cardHighlight card border-light mb-3" >
        {/*<Link to={`/products/${productId}`}></Link>*/}
        <img src={img4}  className="img-fluid"/>
          <Card.Body>
            <Card.Title style={{ fontSize: ".8rem" }}>Cooking With Poo</Card.Title>
            <Card.Text style={{ fontSize: ".8rem" }}>
              Description available after purchase
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={4}>
        <Card className="cardHighlight card border-light mb-3" >
          <img src={img5} className="img-fluid" />
          <Card.Body>
            <Card.Title style={{ fontSize: ".8rem" }}>Maliit Pero Maluwang</Card.Title>
            <Card.Text style={{ fontSize: ".8rem" }}>
              Description available after purchase
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={4}>
        <Card className="cardHighlight card border-light mb-3">
          <img src={img6} className="img-fluid" />
          <Card.Body>
            <Card.Title style={{ fontSize: ".8rem" }}>RSRPT</Card.Title>
            <Card.Text style={{ fontSize: ".8rem" }}>
              Description available after purchase
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      
    </Row>


    <Row className="mt-4">
      <Col xs={12} md={4}>
        <Card className="cardHighlight card border-light mb-3" >
        {/*<Link to={`/products/${productId}`}></Link>*/}
        <img src={img7}  className="img-fluid"/>
          <Card.Body>
            <Card.Title style={{ fontSize: ".8rem" }}>The Next Time Around</Card.Title>
            <Card.Text style={{ fontSize: ".8rem" }}>
              Description available after purchase
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={4}>
        <Card className="cardHighlight card border-light mb-3" >
          <img src={img8} className="img-fluid" />
          <Card.Body>
            <Card.Title style={{ fontSize: ".8rem" }}>The Drone Queen</Card.Title>
            <Card.Text style={{ fontSize: ".8rem" }}>
              Description available after purchase
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={4}>
        <Card className="cardHighlight card border-light mb-3">
          <img src={img9} className="img-fluid" />
          <Card.Body>
            <Card.Title style={{ fontSize: ".8rem" }}>The Lost Art Of Teaching</Card.Title>
            <Card.Text style={{ fontSize: ".8rem" }}>
              Description available after purchase
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      
    </Row>


    <Row className="mt-4">
      <Col xs={12} md={4}>
        <Card className="cardHighlight card border-light mb-3" >
        {/*<Link to={`/products/${productId}`}></Link>*/}
        <img src={img10}  className="img-fluid"/>
          <Card.Body>
            <Card.Title style={{ fontSize: ".8rem" }}>A Complete List Of All Things That Are Still Pending</Card.Title>
            <Card.Text style={{ fontSize: ".8rem" }}>
              Description available after purchase
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={4}>
        <Card className="cardHighlight card border-light mb-3" >
          <img src={img11} className="img-fluid" />
          <Card.Body>
            <Card.Title style={{ fontSize: ".8rem" }}>Hello Hello</Card.Title>
            <Card.Text style={{ fontSize: ".8rem" }}>
              Description available after purchase
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={4}>
        <Card className="cardHighlight card border-light mb-3">
          <img src={img12} className="img-fluid" />
          <Card.Body>
            <Card.Title style={{ fontSize: ".8rem" }}>11 Things We Don't Know Yet</Card.Title>
            <Card.Text style={{ fontSize: ".8rem" }}>
              Description available after purchase
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      
    </Row>
    </Container>
    
  );
}