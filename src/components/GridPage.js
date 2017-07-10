import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import Configurations from '../config/index'
import Service from '../service'

import { Table, TableHeader } from 'react-mdl';
import ContentWrapper from './ContentWrapper';
import AdvancedSearchForm from './AdvancedSearchForm'

const GridPage = ({ match }) => {
  const collection = match.path.substring(1);
  const config = Configurations[collection];
  const columns = config.grid.columns;
  const rows = Service[collection].fetchAll().data;
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
          {columns.map((col, i) => (
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

GridPage.propTypes = {};

export default withRouter(GridPage);
