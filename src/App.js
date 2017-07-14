import React, { Component } from 'react';
import { Switch, Route, NavLink, Link } from 'react-router-dom'

import {
  Layout, Header, Textfield, Drawer, Navigation, Content
} from 'react-mdl'
import ComingSoon from './components/ComingSoon'
import GridPage from './components/GridPage'
import ProxyConfigList from './components/settings/ProxyConfigList'
import ProxyConfigForm from './components/settings/ProxyConfigForm'

const LeftNavTitle = ({}) => {
  return (
    <div className="LeftNavTitle">
      <Link to="/"><img src="/img/header-logo.png" alt=""/></Link>
    </div>
  );
}


const App = ({}) => {
  return (
    <div className="App">
      <div style={{ height: '100vh', position: 'relative' }}>
        <Layout fixedHeader fixedDrawer style={{ backgroundColor: '#FFF'}}>
          <Header title="bettercloud query language" />
          <Drawer title={(<LeftNavTitle />)} style={{ width:'250px'}}>
            <Navigation>
              <NavLink to="/users" className="myNavLink">Users</NavLink>
              <NavLink to="/groups" className="myNavLink">Groups</NavLink>
              <NavLink to="/assets" className="myNavLink">Assets</NavLink>
              <NavLink to="/auditlogs" className="myNavLink">Audit Logs</NavLink>
              <hr/>
              <NavLink to="/settings" className="myNavLink">Settings</NavLink>
            </Navigation>
          </Drawer>
          <Content>
            <Switch>
              <Route exact path="/" component={ComingSoon} />
              <Route path="/users" component={GridPage} />
              <Route path="/groups" component={GridPage} />
              <Route path="/assets" component={GridPage} />
              <Route path="/auditlogs" component={GridPage} />
              <Route exact path="/settings" component={ProxyConfigList} />
              <Route exact path="/settings/:contextClass" component={ProxyConfigForm} />
              <Route component={ComingSoon} />
            </Switch>
          </Content>
        </Layout>
      </div>
    </div>
  );
}

export default App;
