import React from 'react';
import './App.css';

import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeView } from './views/home_view/home.view';
import { MapView } from './views/map_view/map.view';
import { AddItemView } from './views/add_item_view/add_item.view';
import { WebsitesView } from './views/websites_view/websites.view';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { faLightbulb, faHome, faMap, faNetworkWired, faPlus } from '@fortawesome/free-solid-svg-icons';
import { EditClientView } from './views/edit_client_view/edit_client_view';

function App(props) {

  var links_list = [{icon: faHome, link: '/', title: 'Home'},
                    {icon: faNetworkWired, link: '/clients', title: 'Clients'},
                    {icon: faMap, link: '/clients/map', title: 'Client Map'},
                    {icon: faPlus, link: '/clients/add', title: 'Add Client'}];

  return (
    <Router>

      <NavbarComponent titleIcon={faLightbulb} title={"Scanner Darkly"} links={ links_list }/>

      <Switch>
        
        <Route exact path='/clients/map'>
          <MapView/>
        </Route>
        
        <Route exact path='/clients/add'>
          { match => <AddItemView match={match}/> }
        </Route>

        <Route exact path='/clients/:id/history'>
          { match => <AddItemView match={match}/> }
        </Route>

        <Route exact path='/clients/:id/edit'>
          { match => <EditClientView match={match}/> }
        </Route>

        <Route exact path='/clients/:id'>
          { match => <WebsitesView match={match}/> }
        </Route>

        <Route exact path='/clients'>
          { props => <WebsitesView {...props}/> }
        </Route>

        <Route exact path='/'>
          <HomeView/>
        </Route>

      </Switch>
    
    </Router>
  );
}

export default App;
