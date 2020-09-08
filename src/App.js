import React from 'react';
import './App.css';

import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeView } from './views/home_view/home.view';
import { MapView } from './views/map_view/map.view';
import { AddItemView } from './views/add_item_view/add_item.view';
import { WebsitesView } from './views/websites_view/websites.view';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {

  var links_list = [{link: 'home',title: 'Home'},
                    {link: 'cpemap',title: 'CPE Map'},
                    {link: 'websites',title: 'Websites'},
                    {link: 'add',title: 'Add'}];

  return (
    <Router>
      <NavbarComponent title={"Outage Scanner"} links={ links_list }/>
      <Switch>
      
        <Route path='/home'>
          <HomeView/>
        </Route>
        
        <Route path='/cpemap'>
          <MapView/>
        </Route>
        
        <Route path='/websites'>
          <WebsitesView/>
        </Route>
        
        <Route path='/add'>
          <AddItemView/>
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
