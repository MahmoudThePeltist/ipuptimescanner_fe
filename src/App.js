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

  var links_list = [{icon: faHome, link: 'home', title: 'Home'},
                    {icon: faMap, link: 'cpemap', title: 'CPE Map'},
                    {icon: faNetworkWired, link: 'websites', title: 'Websites'},
                    {icon: faPlus, link: 'add', title: 'Add'}];

  return (
    <Router>
      <NavbarComponent titleIcon={faLightbulb} title={"Scanner Darkly"} links={ links_list }/>
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
