import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

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

        var links_list = this.props.links.map(link => {
            return <Nav.Link href="#">{ link }</Nav.Link>
        })

        return(
            <Navbar bg="light" expand="lg">

            <Navbar.Brand href="/">{ this.props.title }</Navbar.Brand>
            
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">

                <Nav className="mr-auto">
                    { links_list }
                </Nav>

                <h5 className="text-primary">{this.state.date.toLocaleTimeString()}</h5>

              </Navbar.Collapse>
            </Navbar>
        );
    }
}