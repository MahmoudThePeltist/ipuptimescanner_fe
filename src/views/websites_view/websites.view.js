import React, { Component } from 'react';
import { Container, Row, Col, Table, Card, Button, Spinner } from 'react-bootstrap';

import { ClientsService } from '../../services/clients.service';

import { faTrash, faCog, faClock } from '@fortawesome/free-solid-svg-icons';
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

    editWebsite(id) {
        
    }

    goToHistory(id) {
        
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
                                <th>Creation</th>
                                <th>Last Change</th>
                                <th>Tools</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.clientData.map(row => 
                                <tr key={row.id}>
                                    <td>{ row.id }</td>
                                    <td>{ row.name }</td>
                                    <td>{ row.address }</td>
                                    <td><span className="badge badge-info">{ row.status }</span></td>
                                    <td>{ row.description }</td>
                                    <td>{ (new Date(row.created_at)).toLocaleDateString() }</td>
                                    <td>{ (new Date(row.updated_at)).toLocaleDateString() }</td>
                                    <td>
                                        <div className="row mx-1">
                                            <div className="col-4">
                                            <Button className="btn-sm px-3" 
                                                    onClick={() => this.goToHistory(row.id)} 
                                                    variant="primary"><FontAwesomeIcon icon={faClock} /></Button>
                                            </div>
                                            <div className="col-4">
                                            <Button className="btn-sm px-3" 
                                                    onClick={() => this.editWebsite(row.id)} 
                                                    variant="info"><FontAwesomeIcon icon={faCog} /></Button>
                                            </div>
                                            <div className="col-4">
                                            <Button className="btn-sm px-3" 
                                                    onClick={() => this.deleteWebsite(row.id)} 
                                                    variant="danger"><FontAwesomeIcon icon={faTrash} /></Button>
                                            </div>
                                        </div>
                                    </td>
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