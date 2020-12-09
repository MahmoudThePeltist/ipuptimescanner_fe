import React, { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NavbarComponent(props) {
 const [date, setDate] = useState(new Date());

 useEffect(() => {
    var intervalId = setInterval(() => setTimer(), 1000);
    return function cleanup(){
        clearInterval(intervalId);
     }
 })


 function setTimer() {
     setDate(new Date())
 };

 
  return (
    <div>
        <Navbar expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">
          <FontAwesomeIcon className="mx-1" icon={props.titleIcon} />
          {props.title}
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {props.links.map((link) => (
              <Link className="nav-link" key={link.link} to={link.link}>
                {link.icon ? (
                  <FontAwesomeIcon className="mx-1" icon={link.icon} />
                ) : (
                  false
                )}
                {link.title}
              </Link>
            ))}
          </Nav>

          <h5 className="text-primary">
            {date.toLocaleTimeString()}
          </h5>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}


