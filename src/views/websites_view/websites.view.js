import React, { Component } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { ClientsService } from '../../services/clients.service';

export class WebsitesView extends Component {

    constructor(props) {
        super(props);
        this.clientsService = new ClientsService();
        this.state = {clientData: undefined};
    }

    componentDidMount() {
        console.log("Getting clients... ");
        this.clientsService.getClients()
            .then(response => {
                console.log("Get clients response: ", response);
                this.setState({ clientData: response['data'] })
            })
    }

    render() {
        return(
            <Container>
                <Row>
                    <Col className="text-center my-5">
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Description</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.clientData ? this.state.clientData.map(row => 
                            <tr key={row.id}>
                                <td>{ row.id }</td>
                                <td>{ row.name }</td>
                                <td>{ row.address }</td>
                                <td>{ row.status }</td>
                                <td>{ row.description }</td>
                                <td>{ row.created_at }</td>
                                <td>{ row.updated_at }</td>
                            </tr>
                        ) : 
                        <h1>Loading...</h1>
                         }
                        </tbody>
                    </Table>
                    </Col>
                </Row>
            </Container>
        );
    }

}