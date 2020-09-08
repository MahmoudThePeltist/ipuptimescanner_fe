import React from 'react';
import './App.css';
import { NavbarComponent } from './components/navbar/navbar.component';


function App() {

  var links_list = ['Home','CPE Map','Websites','Add'];

  return (
    <NavbarComponent title={"Outage Scanner"} links={ links_list }/>
  );
}

export default App;
