import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export class NavbarComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            date: new Date()
        };

        // this.setDate = this.setDate.bind(this);
    }

    setDate() {
        this.setState({ date: new Date() });
    }

    componentDidMount() {
        this.intervalId = setInterval(() => this.setDate(), 1000);
    }

    componentWillUnmount() {
        clearInterval( this.intervalId );
    }

    render(){

        return(
            <Navbar expand="lg" bg="dark" variant="dark">

            <Navbar.Brand href="/"><FontAwesomeIcon className="mx-1" icon={ this.props.titleIcon }/>{ this.props.title }</Navbar.Brand>
            
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">

                <Nav className="mr-auto">
                    { this.props.links.map( link => 
                        <Link className="nav-link" key={ link.link } to={ link.link }>
                            { link.icon ?
                                <FontAwesomeIcon className="mx-1" icon={ link.icon }/>
                            : false}
                            { link.title }
                        </Link>
                    ) }
                </Nav>

                <h5 className="text-primary">{this.state.date.toLocaleTimeString()}</h5>

              </Navbar.Collapse>
            </Navbar>
        );
    }
}