import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  branch, setPropTypes, withState, withHandlers, withProps, renderNothing, compose
} from 'recompose'
import { selectBcqlConfig } from '../redux/state/config'

import Select, { Creatable } from 'react-select'
import { Textfield, Button, Chip, ChipContact } from 'react-mdl'

const buildQuery = (constraints) => {
  let query = '';
  constraints = constraints.filter(({ field, op, value }) => _.isString(field) && _.isString(op) && _.isArray(value))
  for (let i=0;i<constraints.length;i++) {
    const { field, op, value } = constraints[i];
    if (_.isString(field) && _.isString(op) && _.isArray(value)) {
      if (value.length > 1) {
        query += '(';
      }
      for (let j=0;j<value.length;j++) {
        const val = value[j];
        query += `${field} ${op} '${val}'`
        if (j < (value.length - 1)) {
          query += ' OR ';
        } else if (value.length > 1) {
          query += ')';
        }
      }
      if (i < (constraints.length - 1)) {
        query += ' AND ';
      }
    }
  }
  return query;
}

const SearchQueryPreview = ({ constraints }) => (
  <span className="SearchQueryPreview">
    <Chip style={{ minWidth: '300px' }}>
      <ChipContact className="mdl-color--teal mdl-color-text--white">
        <i className="fa fa-search"></i>
      </ChipContact>
      <pre style={{ margin: 0 }}>{buildQuery(constraints)}</pre>
    </Chip>
  </span>
);

let SimpleSearchFormInput = ({ constraint, config, onChangeField, onChangeOp, onChangeValue, field, index, onRemove }) => {
  return (
    <div className="SimpleSearchFormInput">
      <span style={{ display: 'inline-block', width: '300px', marginRight: '2em' }}>
        <Select
          value={constraint.field}
          onChange={onChangeField}
          options={config.fields.map(({ display}) => ({ label: display, value: display }))}
          simpleValue
          clearable={false}
        />
      </span>
      {_.isNil(field) ? '' : (
        <span>
          <span style={{ display: 'inline-block', width: '80px', marginRight: '2em' }}>
            <Select
              value={constraint.op}
              onChange={onChangeOp}
              options={field.operators.map(op => ({ label: op, value: op }))}
              clearable={false}
              simpleValue
            />
          </span>
          <span style={{ display: 'inline-block', width: '300px', marginRight: '2em' }}>
            <Creatable
              value={_.defaultTo(constraint.value, []).map(value => ({ label: value, value }))}
              onChange={e => onChangeValue(_.defaultTo(e, []).map(item => item.value))}
              options={_.keys(field.valueMapping).map(item => ({ label: item, value: item }))}
              multi
            />
          </span>
        </span>
      )}
      <span style={{ display: 'inline-block' }}>
        <Button
          raised
          onClick={e => onRemove(index)}
          style={{ backgroundColor: 'red', color: 'white', marginTop: '-29px' }}
        >
          <i className="fa fa-times"></i> Remove
        </Button>
      </span>
    </div>
  );
}

SimpleSearchFormInput = compose(
  withProps(props => ({
    field: _.find(props.config.fields, { display: props.constraint.field })
  })),
  withHandlers({
    onChangeField: props => val => {
      const { config, index, onChange, constraint } = props;
      const field = _.find(config.fields, { display: val })
      onChange({ field: val, op: field.operators[0] }, index)
    },
    onChangeOp: props => val => {
      const { index, onChange, constraint } = props;
      onChange({ ...constraint, op: val }, index)
    },
    onChangeValue: props => val => {
      const { index, onChange, constraint } = props;
      console.log("changing value to", val);
      onChange({ ...constraint, value: val }, index)
    }
  })
)(SimpleSearchFormInput);


let SimpleSearchForm = ({ model, match, config, onChange, onAddConstraint, onRemoveConstraint, contextSlug, submitSearch }) => {
  return (
    <div className="SimpleSearchForm">
      {model.constraints.map((con, i) => (
        <div style={{ marginTop: '0.5em' }} key={i}>
          <SimpleSearchFormInput
            config={config}
            constraint={con}
            onChange={onChange}
            onRemove={onRemoveConstraint}
            index={i}
          />
        </div>
      ))}
      <div className="add-one-btn-row" style={{ padding: '1em 0' }}>
        <Button raised onClick={console.log} onClick={onAddConstraint}>
          <i className="fa fa-plus"></i> Add One
        </Button>
        <span style={{ margin: '0 1em' }}>
          <SearchQueryPreview constraints={model.constraints} />
        </span>
        <Button primary raised onClick={() => submitSearch(buildQuery(model.constraints), contextSlug)}>
          SEARCH
        </Button>
      </div>
    </div>
  );
}

const emptyConstraint = {
  field: null,
  op: null,
  value: []
};

SimpleSearchForm = compose(
  branch(
    props => props.config.fields.length === 0,
    renderNothing
  ),
  withState('model', 'setModel', { constraints: [ emptyConstraint ] }),
  withHandlers({
    onChange: props => (constraint, index) => {
      const { model, setModel } = props;
      model.constraints[index] = constraint;
      setModel({ ...model });
    },
    onAddConstraint: props => () => {
      const { model, setModel } = props;
      model.constraints.push(emptyConstraint);
      setModel({ ...model });
    },
    onRemoveConstraint: props => (index) => {
      const { model, setModel } = props;
      model.constraints.splice(index, 1);
      setModel({ ...model });
    }
  })
)(SimpleSearchForm)

SimpleSearchForm = connect(
  (state, props) => {
    const contextSlug = props.match.path.substring(1);
    return {
      contextSlug,
      config: selectBcqlConfig(state, contextSlug)
    }
  },
  dispatch => ({
    submitSearch: (rawQuery, contextSlug) => {
      dispatch({ type: 'SEARCH_FETCH_REQUESTED', rawQuery, contextSlug });
    }
  })
)(SimpleSearchForm);

export default withRouter(SimpleSearchForm);
