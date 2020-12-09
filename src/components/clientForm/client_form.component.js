import React, { Component } from "react";
import { Card, Form, Row, Col, Button, Alert } from "react-bootstrap";
import { ClientsService } from "../../services/clients.service";

export class ClientFormComponent extends Component {
  constructor(props) {
    super(props);

    this.clientsService = new ClientsService();

    this.state = {
      form_title: undefined,

      form_data: {
        id: undefined,
        name: "",
        address: "",
        type: "website",
        attributes: {
          coordinates: {
            x: "",
            y: "",
          },
        },
        description: "",
      },

      message: {
        text: undefined,
        type: undefined,
      },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    console.log("ClientFormComponent Props: ", this.props);
    if (this.props.client_id) {
      this.setState({ form_title: "Editing" });

      this.clientsService
        .getSpecificClient(this.props.client_id)
        .then((response) => {
          if (response["data"][0]) {
            const form_data = response["data"][0];
            this.setState({
              form_data: {
                id: form_data.id,
                name: form_data.name,
                address: form_data.address,
                type: form_data.type,
                attributes: {
                  coordinates: form_data.attributes
                    ? JSON.parse(form_data.attributes).coordinates
                    : undefined,
                },
                description: form_data.description,
              },
            });
          } else {
            this.setState({
              message: { text: "No such user", type: "total_error" },
            });
          }
          console.log(
            "Get Specific client response: ",
            response,
            " State: ",
            this.state
          );
        })
        .catch((error) => {
          console.log("Get Specific Client error:", error);
        });
    } else {
      this.setState({ form_title: "Adding" });
    }
  }

  handleInputChange(event) {
    console.log(
      `Event target \nName: ${event.target.name} \nValue: ${event.target.value}`
    );
    // If it's a coordinate store it in the attributes
    if (event.target.name === "x" || event.target.name === "y") {
      var coordinates = { ...this.state.form_data.attributes.coordinates };
      console.log(coordinates, "checking default value");
      coordinates[event.target.name] = event.target.value;

      this.setState({
        form_data: { ...this.state.form_data, attributes: { ...this.state.attributes, coordinates: coordinates } },
      });
      console.log(this.state.form_data.attributes, "after setting state");
    } else {
      let new_form_data = this.state.form_data;
      new_form_data[event.target.name] = event.target.value;
      this.setState({ form_data: this.state.form_data, new_form_data });
      console.log(this.state.form_data, "updated form data");
    }
  }

  render() {
    const {
      name,
      address,
      type,
      attributes,
      description,
    } = this.state.form_data;
    console.log(type);
    return (
      <Card className="p-3">
        <div className="display-5 py-3">{this.state.form_title}</div>

        {this.state.message.type !== "total_error" ? (
          <Form
            className="mx-5"
            onSubmit={(e) => this.props.handleSubmit(e, this.state.form_data)}
            id="add-client-form"
          >
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="A name to describe the specific client."
                name="name"
                value={name}
                onChange={this.handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="The client's IP address"
                name="address"
                value={address}
                onChange={this.handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formType">
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                required
                name="type"
                value={type}
                onChange={this.handleInputChange}
              >
                <option value="website">Website</option>
                <option value="cpe">Device</option>
              </Form.Control>
            </Form.Group>

            {type === "cpe" ? (
              <Form.Group controlId="formCoordinates">
                <Form.Label>Coordinates</Form.Label>
                <Row>
                  <Col>
                    <Form.Control
                      type="number"
                      max="180.0000"
                      min="-180.0000"
                      step="0.00000001"
                      placeholder="x coordinate"
                      required
                      name="x"
                      value={attributes.coordinates.x}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="number"
                      max="180.0000"
                      min="-180.0000"
                      step="0.00000001"
                      placeholder="y coordinate"
                      required
                      name="y"
                      value={attributes.coordinates.y}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </Row>
                <Form.Text className="text-muted">
                  The coordinates of the device
                </Form.Text>
              </Form.Group>
            ) : (
              false
            )}

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="The client's description"
                name="description"
                value={description}
                onChange={this.handleInputChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {this.state.form_title === "Editing"
                ? "Edit Client in System"
                : "Add Client to System"}
            </Button>

            {this.props.message.text && this.props.message.type ? (
              <Alert
                className="m-3"
                variant={
                  this.props.message.type === "error" ? "danger" : "info"
                }
                onClose={this.props.clearMessage}
                dismissible
              >
                <p>{this.props.message.text}</p>
              </Alert>
            ) : (
              false
            )}
          </Form>
        ) : (
          <div class="display-4 text-center">{this.state.message.text}</div>
        )}
      </Card>
    );
  }
}
