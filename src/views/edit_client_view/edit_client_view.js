import React, { Component, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ClientFormComponent } from '../../components/clientForm/client_form.component';
import { ClientsService } from '../../services/clients.service';


export function  EditClientView(props) {

    const clientsService = new ClientsService()

    const [id, setId] = useState(undefined)
    const [message, setMessage] = useState('')

    useEffect(() => {
        console.log("EditClientView Props: ", props.match.match.params.id);

        if(props.match.match.params.id) {
              setId(props.match.match.params.id);
            console.log("EditClientView State: ", id, message);
        }
    })


    const handleSubmit = (event, data) => {
        event.preventDefault();
        
        console.log("Data to submit: ", event, data, `/${id}`);

        clientsService.updateClient(data, id)
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
                                                client_id = { props.match.match.params.id }
                                                match = {props.match}
                                                clearMessage = {clearMessage } />
                    </Col>
                </Row>
            </Container>
    </div>
  )
}

  
    
