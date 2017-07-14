import React from 'react';
import _ from 'lodash';
import { selectConfigs } from '../../redux/state/config'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom';
import { Button, List, ListItem, ListItemContent } from 'react-mdl'
import ContentWrapper from '../ContentWrapper'

const ProxyConfigRow = ({ config }) => {
  return (
    <ListItem className="ProxyConfigRow">
      <ListItemContent icon="settings">
        <Link to={`/settings/${config.contextClass}`}>{config.contextClass}</Link>
      </ListItemContent>
    </ListItem>
  );
}

const ProxyConfigList = ({ configs }) => {
  configs = configs.filter(config => _.isString(config.contextClass))
  return (
    <div className="ProxyConfigList">
      <ContentWrapper>
        <List>
          {configs.map((config, i) => (<ProxyConfigRow config={config} key={i} />))}
        </List>
      </ContentWrapper>
    </div>
  );
}

export default connect(
  state => ({
    configs: selectConfigs(state)
  })
)(ProxyConfigList);
