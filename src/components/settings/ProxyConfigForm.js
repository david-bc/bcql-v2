import React from 'react';
import _ from 'lodash';
import { selectConfig } from '../../redux/state/config'

import { branch, renderNothing, withState, withHandlers, compose } from 'recompose'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import ContentWrapper from '../ContentWrapper'
import { Textfield } from 'react-mdl'
import Select from 'react-select'

const contextSlugMap = {
  BCAsset: 'assets',
  BCAuditLog: 'auditlogs',
}

/*
"{
  "requestType": "QUERY",
  "method": "GET",
  "url": "https://x-holding.devbettercloud.com/assets-api/asset/search?tenantId={tenantId}&limit=100&offset=0&pageSize=100&query={filters}&sort={sort}",
  "defaultSort": "updatedDate%20desc",
  "totalPath": "totalItems",
  "dataPath": "items"
  //  "contextClass": "BCAsset",
}"
*/

const requestTypeOptions = [
  { label: 'Query', value: 'QUERY' },
  { label: 'By Ids', value: 'BY_IDS' },
  { label: 'By Id', value: 'BY_ID' }
]

const methodOptions = [ 'GET', 'POST', 'PUT' ].map(v => ({ label: v, value: v }));

const TF = ({ model, path, label, onChange }) => {
  return (
    <div className="TF">
      <Textfield
        value={model[path]}
        onChange={e => onChange(path, e.target.value)}
        label={label}
        style={{ width: '100%' }}
      />
    </div>
  );
}

const ApiConfigForm = ({ model, onChange }) => {
  console.log({ model });
  return (
    <div className="ApiConfigForm">
      <h3>Api Query Config</h3>
      <div className="form-group">
        <Select
          value={model.requestType}
          onChange={val => onChange('requestType', val)}
          placeholder="Request Type"
          options={requestTypeOptions}
          clearable={false}
          simpleValue
        />
      </div>
      <div className="form-group">
        <Select
          value={model.method}
          onChange={val => onChange('method', val)}
          placeholder="Http Method"
          options={methodOptions}
          clearable={false}
        />
      </div>
      <TF model={model} path="url" label="Url" onChange={onChange} />
      <TF model={model} path="defaultSort" label="Default Sort" onChange={onChange} />
      <TF model={model} path="dataPath" label="Data Path" onChange={onChange} />
      <TF model={model} path="totalPath" label="Total Count Path" onChange={onChange} />
    </div>
  );
}

let ProxyConfigForm = ({ config, model, contextClass, onChangeApi }) => {
  console.log({ config, model });
  return (
    <div className="ProxyConfigForm">
      <ContentWrapper>
        <h1>{contextClass}</h1>
        <ApiConfigForm model={model.api[0]} onChange={onChangeApi} />
      </ContentWrapper>
    </div>
  );
}

const defaultConfig = {
  api: [
    {
      requestType: 'QUERY',
      method: 'GET',
      url: 'http://localhost:8080/api/v1/search?tenantId={tenantId}&query={filters}&sort={sort}',
      defaultSort: 'email%20desc',
      dataPath: 'content',
      totalPath: 'count'
    }
  ]
}

ProxyConfigForm = compose(
  withState('model', 'setModel', props => _.assignIn(defaultConfig, _.defaultTo(props.config, defaultConfig))),
  withHandlers({
    onChangeApi: props => (path, val) => {
      const { model, setModel } = props;
      setModel(_.set({ ...model }, `api.${path}`, val))
    }
  })
)(ProxyConfigForm)

ProxyConfigForm = connect(
  (state, props) => {
    const contextClass = props.match.params.contextClass;
    return {
      contextClass,
      config: selectConfig(state, contextSlugMap[contextClass])
    }
  },
  dispatch => ({

  })
)(ProxyConfigForm)

export default withRouter(ProxyConfigForm);
