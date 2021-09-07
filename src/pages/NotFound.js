import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col, Jumbotron} from 'react-bootstrap';



export default function NotFound(){
	return(
    	<>
        	<Row>
            	<Col>
               	<Jumbotron>
                   <h1>Peej Nat Paund</h1>
                   <h2>Error 404</h2>
                   <p>Youlostbabygirl? <Link to="/">Home Page</Link></p>
                </Jumbotron>
            	</Col>
        	</Row>
   		</>

        )
}