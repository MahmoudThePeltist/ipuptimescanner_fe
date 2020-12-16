import React, {useState} from 'react'
import {Form, FormControl, Button} from "react-bootstrap"

export default function  SearchBar(props) {
    
 
  
    const handleInputChange = (e) => {

      props.handleCallback(e.target.value)

    }

    
  

  return (
    <div>
         <Form inline>
            <FormControl type="text" name="search" placeholder="Search" onChange={handleInputChange} className="mr-sm-2" />
            <Button className="searchButton"  variant="outline-dark"> Search </Button>
          </Form>
    </div>
  )
}
