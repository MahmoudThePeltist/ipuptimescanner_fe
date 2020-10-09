import React from 'react';
import './App.css';

import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeView } from './views/home_view/home.view';
import { MapView } from './views/map_view/map.view';
import { AddItemView } from './views/add_item_view/add_item.view';
import { WebsitesView } from './views/websites_view/websites.view';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { faLightbulb, faHome, faMap, faNetworkWired, faPlus } from '@fortawesome/free-solid-svg-icons';

function App() {

  var links_list = [{icon: faHome, link: '/', title: 'Home'},
                    {icon: faNetworkWired, link: '/clients', title: 'Clients'},
                    {icon: faMap, link: '/clients/map', title: 'Client Map'},
                    {icon: faPlus, link: '/clients/add', title: 'Add Client'}];

  return (
    <Router>

      <NavbarComponent titleIcon={faLightbulb} title={"Scanner Darkly"} links={ links_list }/>

      <Switch>
        
        <Route path='/clients/map'>
          <MapView/>
        </Route>
        
        <Route path='/clients/add'>
          <AddItemView/>
        </Route>

        <Route path='/clients/:id/history'>
          <AddItemView/>
        </Route>

        <Route path='/clients/:id/edit'>
          <AddItemView/>
        </Route>

        <Route path='/clients/:id'>
          <AddItemView/>
        </Route>

        <Route path='/clients'>
          <WebsitesView/>
        </Route>

        <Route path='/'>
          <HomeView/>
        </Route>

      </Switch>
    
    </Router>
  );
}

export default App;
