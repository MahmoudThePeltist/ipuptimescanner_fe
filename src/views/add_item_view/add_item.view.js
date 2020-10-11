import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ClientFormComponent } from '../../components/clientForm/client_form.component';
import { ClientsService } from '../../services/clients.service';

export class AddItemView extends Component {
    
    constructor(props) {
        super(props);

        this.clientsService = new ClientsService();

        // messages can be of types: "success" or "error"
        this.state = {
            message: {
                text: undefined,
                type: undefined
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.setMessage = this.setMessage.bind(this);
        this.clearMessage = this.clearMessage.bind(this);
    }

    handleSubmit(event, data) {
        event.preventDefault();
        
        console.log("Data to submit: ", event, data);

        this.clientsService.postClient(data)
            .then(response => {
                console.log("Submit response: ", response );

                document.getElementById("add-client-form").reset();

                this.setMessage("Success", "success");
            })
            .catch(error => {
                console.log("Submit error: ", error);

                this.setMessage("Something went wrong...", "error");
            })
    }

    setMessage(message, type) {
        this.setState( {message: { text: message, type: type } } );
    }

    clearMessage() {
        this.setState( {message: { text: undefined, type: undefined } } );
    }
    
    render() {
        return (
            <Container>
                <Row>
                    <Col className="text-center my-5">
                        <ClientFormComponent    handleSubmit = { this.handleSubmit }
                                                message = { this.state.message }
                                                match = {this.props.match}
                                                clearMessage = { this.clearMessage } />
                    </Col>
                </Row>
            </Container>
        );
    }
    
}