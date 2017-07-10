import React from 'react';
import PropTypes from 'prop-types';

const ContentWrapper = ({ children }) => {
  return (
    <div
      className="ContentWrapper"
      style={{ padding: '25px' }}
    >
      {children}
    </div>
  );
}

ContentWrapper.propTypes = {};

export default ContentWrapper;
