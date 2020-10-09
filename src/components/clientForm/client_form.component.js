import React, { Component } from 'react';
import { Card, Form, Row, Col, Button, Alert } from 'react-bootstrap';


export class ClientFormComponent extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            name: undefined,
            address: undefined,
            type: 'website',
            attributes: undefined,
            description: undefined,
            coordinates: {
                x: undefined,
                y: undefined
            }
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    handleInputChange(event) {
        // If it's a coordinate store it in the attributes
        if(event.target.name === 'x' || event.target.name === 'y')
        {
            var coordinates = {...this.state.coordinates};
            coordinates[event.target.name] = event.target.value;

            this.setState({coordinates: coordinates, attributes: {coordinates: coordinates}});
            console.log(this.state.attributes);
        } 
        else 
        {
            // if the type changes, reset the properties
            if(event.target.name === 'type')
            {
                this.setState({ attributes : undefined});
            }
            this.setState({ [event.target.name] : event.target.value})
        }
    }

    render(){
        return(
            <Card className="p-3">
                <div className="display-5 py-3">Add</div>
                
                <Form className="mx-5" onSubmit={(e) => this.props.handleSubmit(e, this.state) }  id="add-client-form">

                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control   type="text" 
                                        name="name" required
                                        placeholder="A name to describe the specific client."
                                        onChange={this.handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="formAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control   type="text" 
                                        name="address" required
                                        placeholder="The client's IP address"
                                        onChange={this.handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="formType">
                        <Form.Label>Type</Form.Label>
                        <Form.Control   name="type" 
                                        as="select" required
                                        onChange={this.handleInputChange}>
                        <option value="website">Website</option>
                        <option value="cpe">Device</option>
                        </Form.Control>
                    </Form.Group>

                    {this.state.type === 'cpe' ? 
                    <Form.Group controlId="formCoordinates">
                        <Form.Label>Coordinates</Form.Label>
                        <Row>
                            <Col>
                                <Form.Control   type="number" max="180.0000" min="-180.0000" step="0.00000001"
                                                name="x" 
                                                placeholder="x coordinate" required
                                                onChange={this.handleInputChange} />
                            </Col>
                            <Col>
                                <Form.Control   type="number"  max="180.0000" min="-180.0000" step="0.00000001"
                                                name="y" 
                                                placeholder="y coordinate" required
                                                onChange={this.handleInputChange} />
                            </Col>
                        </Row>
                        <Form.Text className="text-muted">
                        The coordinates of the device
                        </Form.Text>
                    </Form.Group> : false }

                    <Form.Group controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control   type="text" 
                                        name="description" 
                                        placeholder="The client's description"
                                        onChange={ this.handleInputChange }  />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Add Client to System
                    </Button>
                    
                    {(this.props.message.text && this.props.message.type) ? 
                        <Alert  className="m-3" 
                                variant={ this.props.message.type === 'error' ? 'danger' : 'info' } 
                                onClose={ this.props.clearMessage } 
                                dismissible>
                            <p>{this.props.message.text}</p>
                        </Alert> 
                    : false}
                </Form>
            </Card>
        );
    }
}