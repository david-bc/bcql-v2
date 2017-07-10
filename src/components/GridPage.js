import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'

import { Table, TableHeader, Button } from 'react-mdl';
import ContentWrapper from './ContentWrapper';
import AdvancedSearchForm from './AdvancedSearchForm'

const GridPage = ({ match }) => {
  const rows = [
      {material: 'Acrylic (Transparent)', quantity: 25, price: 2.90},
      {material: 'Plywood (Birch)', quantity: 50, price: 1.25},
      {material: 'Laminate (Gold on Blue)', quantity: 10, price: 2.35}
  ];
  const collection = match.path.substring(1);
  console.log({collection});
  return (
    <div className="GridPage">
      <ContentWrapper>
        <AdvancedSearchForm />
        <Button primary raised disabled={false}>Seach</Button>
        <Table
          // sortable
          shadow={0}
          rows={rows}
          style={{ width: "100%" }}
        >
          <TableHeader
            name="material"
            sortFn={(a, b, isAsc) => (isAsc ? a : b).match(/\((.*)\)/)[1].localeCompare((isAsc ? b : a).match(/\((.*)\)/)[1])}
            tooltip="The amazing material name"
          >
            Material
          </TableHeader>
          <TableHeader
            numeric
            name="quantity"
            tooltip="Number of materials"
          >
            Quantity
          </TableHeader>
          <TableHeader
            numeric
            name="price"
            cellFormatter={(price) => `\$${price.toFixed(2)}`}
            tooltip="Price pet unit"
          >
            Price
          </TableHeader>
        </Table>
      </ContentWrapper>
    </div>
  );
}

GridPage.propTypes = {};

export default withRouter(GridPage);
