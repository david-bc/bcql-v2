import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { withRouter } from 'react-router-dom'
import { withProps, branch, renderComponent, compose } from 'recompose'
import { connect } from 'react-redux'
import Configurations from '../config/index'
import Service from '../service'
import { selectData } from '../redux/state/data'
import { selectGridColumns } from '../redux/state/config'

import { Table, TableHeader } from 'react-mdl';
import ContentWrapper from './ContentWrapper';
import AdvancedSearchForm from './AdvancedSearchForm'
import SomethingWentWrong from './SomethingWentWrong'

let GridPage = ({ columns, rows, cols }) => {
  console.log({ rows, cols });
  return (
    <div className="GridPage">
      <ContentWrapper>
        <div style={{ marginBottom: '1em' }}>
          <AdvancedSearchForm />
        </div>

        <Table
          // sortable
          shadow={0}
          rows={rows}
          style={{ width: "100%" }}
        >
          {cols.map((col, i) => (
            <TableHeader
              name={col.key}
              tooltip={col.tooltip}
              key={i}
            >
              {col.label}
            </TableHeader>
          ))}
        </Table>
      </ContentWrapper>
    </div>
  );
}

GridPage = connect(
  (state, props) => {
    return {
      rows: selectData(state, props.collection).data,
      cols: selectGridColumns(state, props.collection),
    }
  }
)(GridPage)

GridPage = compose(
  withProps(props => {
    const match = props.match;
    const collection = match.path.substring(1);
    const config = Configurations[collection];
    let columns = null;
    if (!_.isNil(config)) {
      columns = config.grid.columns;
    }
    return { collection, columns };
  }),
  branch(
    ({ columns }) => _.isNil(columns),
    renderComponent(SomethingWentWrong)
  )
)(GridPage)

export default withRouter(GridPage);
