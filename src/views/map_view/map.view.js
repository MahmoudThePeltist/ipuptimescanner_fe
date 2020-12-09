import React, { Component } from "react";
import Map from "pigeon-maps";

// import Marker from 'pigeon-marker'
// import Overlay from 'pigeon-overlay'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";

import { Row, Col } from "react-bootstrap";

import { ClientsService } from "../../services/clients.service";

const LitMarker = ({ left, top, style, children }) => (
  <FontAwesomeIcon
    icon={faLightbulb}
    style={{
      position: "absolute",
      left: left - 15,
      top: top - 30,
      width: 30,
      height: 30,
      color: "#386af9",
      ...(style || {}),
    }}
  >
    {children}
  </FontAwesomeIcon>
);

const DeadMarker = ({ left, top, style, children }) => (
  <FontAwesomeIcon
    icon={faLightbulb}
    style={{
      position: "absolute",
      left: left - 15,
      top: top - 30,
      width: 30,
      height: 30,
      ...(style || {}),
    }}
  >
    {children}
  </FontAwesomeIcon>
);

export class MapView extends Component {
  constructor(props) {
    super(props);

    this.clientsService = new ClientsService();
    this.state = { clientData: undefined };
  }

  componentDidMount() {
    console.log("Getting clients... ");
    this.clientsService
      .getClients()
      .then((response) => {
        console.log("Get clients response: ", response);
        response["data"] = response["data"].filter(
          (client) => client.type === "cpe"
        );
        response["data"] = response["data"].map((client) => {
          client.attributes = JSON.parse(client.attributes);
          return client;
        });
        console.log("Get clients response filtered: ", response["data"]);
        this.setState({ clientData: response["data"] });
      })
      .catch((error) => {
        console.log("Something went wrong: ", error);
      });
  }

  render() {
    return (
      <Row className="h-100">
        <Col>
          <Map center={[32.1, 20.07]} zoom={12} height={600}>
            {this.state.clientData
              ? this.state.clientData.map((client) =>
                  client.status === "up" ? (
                    <LitMarker
                      key={client.id}
                      anchor={[
                        1 * client.attributes.coordinates.x,
                        1 * client.attributes.coordinates.y,
                      ]}
                    />
                  ) : (
                    <DeadMarker
                      key={client.id}
                      anchor={[
                        1 * client.attributes.coordinates.x,
                        1 * client.attributes.coordinates.y,
                      ]}
                    />
                  )
                )
              : false}
          </Map>
        </Col>
      </Row>
    );
  }
}
