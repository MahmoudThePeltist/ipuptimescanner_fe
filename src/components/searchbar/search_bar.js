import React, { useState } from "react";
import { Form, FormControl, DropdownButton, Dropdown } from "react-bootstrap";

export default function SearchBar(props) {

  const handleInputChange = (e) => {
    props.handleCallback(e.target.value);
  };

  const handleFilterChange = (e) => {
    props.handleSecondCallback(e.target.value)
  }

  return (
    <div>
      <Form inline>
        <FormControl
          type="text"
          name="search"
          placeholder="Search"
          onChange={handleInputChange}
          className="mr-sm-2"
        />
        <Form.Label className="mr-2" htmlFor="inlineFormCustomSelectPref">
          <p className="Search"> By</p>
        </Form.Label>
        <Form.Control
          as="select"
          className="my-1 mr-sm-2"
          id="inlineFormCustomSelectPref"
          custom
          onChange={handleFilterChange}
        
        >
        
          <option value="name">name</option>
          <option value="address">IP address</option>
       
        </Form.Control>
      </Form>
    </div>
  );
}
