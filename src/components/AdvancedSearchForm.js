import React from 'react';
import PropTypes from 'prop-types';

import { Textfield } from 'react-mdl';

const AdvancedSearchForm = ({}) => {
  return (
    <div className="AdvancedSearchForm">
      <Textfield
        onChange={() => {}}
        label="Advanced Search e.g. SELECT FROM Users WHERE Firstname = 'David*'"
        // pattern="(?:\\w+\\s*=\\s*'[^\\n']*'\\s*)*"
        // expandable
        // expandableIcon="search"
        rows={2}
        style={{ width: '100%' }}
      />
    </div>
  );
}

AdvancedSearchForm.propTypes = {};

export default AdvancedSearchForm;
