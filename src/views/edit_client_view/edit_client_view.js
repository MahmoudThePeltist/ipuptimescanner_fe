import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ClientFormComponent } from '../../components/clientForm/client_form.component';
import { ClientsService } from '../../services/clients.service';

export class EditClientView extends Component {
    
    constructor(props) {
        super(props);

        this.clientsService = new ClientsService();

        // messages can be of types: "success" or "error"
        this.state = {
            id: undefined,

            message: {
                text: undefined,
                type: undefined
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.setMessage = this.setMessage.bind(this);
        this.clearMessage = this.clearMessage.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount(){
        console.log("EditClientView Props: ", this.props.match.match.params.id);

        if(this.props.match.match.params.id) {
            this.setState({id: this.props.match.match.params.id});
            console.log("EditClientView State: ", this.state);
        }
    }

    handleSubmit(event, data) {
        event.preventDefault();
        
        console.log("Data to submit: ", event, data, `/${this.state.id}`);

        this.clientsService.updateClient(data, this.state.id)
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
                                                client_id = { this.props.match.match.params.id }
                                                match = {this.props.match}
                                                clearMessage = { this.clearMessage } />
                    </Col>
                </Row>
            </Container>
        );
    }
    
}