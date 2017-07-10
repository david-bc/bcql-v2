import React, { Component } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom'

import {
  Layout, Header, Textfield, Drawer, Navigation, Content
} from 'react-mdl'
import ComingSoon from './components/ComingSoon'
import GridPage from './components/GridPage'

const LeftNavTitle = ({}) => {
  return (
    <div className="LeftNavTitle">
      BcQL<img src="/img/logo.png" alt=""/>
    </div>
  );
}


const App = ({}) => {
  return (
    <div className="App">
      <div style={{ height: '100vh', position: 'relative' }}>
        <Layout fixedHeader fixedDrawer style={{ backgroundColor: '#FFF'}}>
          <Header title="TODO: pull from redux" />
          <Drawer title={(<LeftNavTitle />)}>
            <Navigation>
              <NavLink to="/"><i className="fa fa-home"></i> Home</NavLink>
              <NavLink to="/users"><i className="fa fa-users"> </i> Users</NavLink>
              <NavLink to="/users">Groups</NavLink>
              <NavLink to="/users">Assets</NavLink>
              <NavLink to="/users">Audit Logs</NavLink>
            </Navigation>
          </Drawer>
          <Content>
            <Switch>
              <Route exact path="/" component={ComingSoon} />
              <Route path="/users" component={GridPage} />
              <Route component={ComingSoon} />
            </Switch>
          </Content>
        </Layout>
      </div>
    </div>
  );
}

export default App;
