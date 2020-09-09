import React, { Component } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import mapImage from '../../assets/map.png';
import webImage from '../../assets/web.jpg';
import { ClientsService } from '../../services/clients.service';

export class HomeView extends Component {
    
    constructor(props) {
        super(props);

        this.clientsService = new ClientsService();
        this.state = {};
    }

    componentDidMount(){
        console.log("Getting clients... ");
        this.clientsService.getClients()
            .then(response => {
                console.log("Get clients response: ", response);
            })
            .catch(error => {
                console.log("Something went wrong: ", error);
            })
    }

    render() {


        return (
            <Container>
                <Row className="pt-3">
                    <Col className="pt-3">
                        
                        <Card className="mx-auto" style={{ width: '20rem' }}>
                            <Card.Img variant="top" src={ mapImage } />
                            <Card.Body>
                            <Card.Title>CPE Map</Card.Title>
                            <Card.Text>
                                See a map of all the currently active and inactive CPEs.
                            </Card.Text>
                            <Link to="/cpemap">
                                <Button variant="primary">Go to Map</Button>
                            </Link>
                            </Card.Body>
                        </Card>

                    </Col>
                    <Col className="pt-3">

                        <Card className="mx-auto" style={{ width: '20rem' }}>
                            <Card.Img variant="top" src={ webImage } />
                            <Card.Body>
                            <Card.Title>Websites</Card.Title>
                            <Card.Text>
                                See a list of all the active and disabled websites.
                            </Card.Text>
                            <Link to="/websites">
                                <Button variant="primary">Go to websites</Button>
                            </Link>
                            </Card.Body>
                        </Card>

                    </Col>
                </Row>
            </Container>
        );
    }
    
}