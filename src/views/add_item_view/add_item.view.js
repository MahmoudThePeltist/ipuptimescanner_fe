import React, { Component, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ClientFormComponent } from '../../components/clientForm/client_form.component';
import { ClientsService } from '../../services/clients.service';



export function AddItemView(props) {
    const [message, setMessage] = useState('');

    const clientsService = new ClientsService() 

    const handleSubmit = (event, data) => {
        event.preventDefault();
        
        console.log("Data to submit: ", event, data);

         clientsService.postClient(data)
            .then(response => {
                console.log("Submit response: ", response );

                document.getElementById("add-client-form").reset();

                setMessage("Success");
            })
            .catch(error => {
                console.log("Submit error: ", error);

                setMessage("Something went wrong...");
            })
    }

    
    const clearMessage = () => {
        setMessage(undefined);
    }
    

  return (
    <div>
         <Container>
                <Row>
                    <Col className="text-center my-5">
                        <ClientFormComponent    handleSubmit = { handleSubmit }
                                                message = { message }
                                                match = {props.match}
                                                clearMessage = { clearMessage } />
                    </Col>
                </Row>
            </Container>
    </div>
  )
}


   

  

