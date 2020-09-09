import React, { Component } from 'react';
import { Container, Row, Col, Table, Card, Button, Spinner } from 'react-bootstrap';

import { ClientsService } from '../../services/clients.service';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 
export class WebsitesView extends Component {

    constructor(props) {
        super(props);
        this.clientsService = new ClientsService();
        this.state = {clientData: undefined};
    }

    componentDidMount() {
        this.getClients();
    }
    
    getClients() {
        this.setState({ clientData: undefined });
        this.clientsService.getClients()
            .then(response => {
                console.log("Get clients response: ", response);
                // response['data'] = response['data'].filter( client => client.type === 'website' );
                this.setState({ clientData: response['data'] });
            })
            .catch(error => {
                console.log("Something went wrong: ", error);
            })
    }

    deleteWebsite(id) {
        this.clientsService.deleteClient(id)
            .then(response => {
                console.log("Get clients response: ", response);
                this.getClients();
            })
            .catch(error => {
                console.log("Something went wrong: ", error);
                this.getClients();
            })
    }

    render() {
        return(
            <Container>
                <Row>
                    <Col className="text-center my-5">
                    <Card className="p-3">
                        <div className="display-5 py-3">Websites</div>
                        {this.state.clientData ? 
                        <Table className="py-5" striped hover>
                            <thead>
                                <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Status</th>
                                <th>Description</th>
                                <th>Created At</th>
                                <th>Updated At</th>
                                <th>Tools</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.clientData.map(row => 
                                <tr key={row.id}>
                                    <td>{ row.id }</td>
                                    <td>{ row.name }</td>
                                    <td>{ row.address }</td>
                                    <td>{ row.status }</td>
                                    <td>{ row.description }</td>
                                    <td>{ row.created_at }</td>
                                    <td>{ row.updated_at }</td>
                                    <td><Button className="btn-sm" onClick={() => this.deleteWebsite(row.id)} variant="secondary"><FontAwesomeIcon icon={faTrash} /></Button></td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                        : <div className="mx-auto text-center"><Spinner animation="border" /></div> }
                    </Card>
                    </Col>
                </Row>
            </Container>
        );
    }

}