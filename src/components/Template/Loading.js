import React from 'react';
import PropTypes from 'prop-types';

const Loading = ({ fullPage }) => (
  <div className={`loading-container ${fullPage ? 'full-page' : ''}`}>
    <div className="loading-spinner" />
  </div>
);

Loading.propTypes = {
  fullPage: PropTypes.bool,
};

Loading.defaultProps = {
  fullPage: false,
};

export default Loading;
