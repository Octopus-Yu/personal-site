import React from 'react';
import PropTypes from 'prop-types';

const FilterBar = ({ categories, handleChildClick }) => (
  <div className="link-to" id="filter">
    <div className="skill-button-container">
      {categories.map((cat) => (
        <button
          className={`skillbutton ${cat.active ? 'active' : ''}`}
          type="button"
          key={cat.name}
          onClick={() => handleChildClick(cat.name)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  </div>
);

FilterBar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    active: PropTypes.bool,
  })).isRequired,
  handleChildClick: PropTypes.func.isRequired,
};

export default FilterBar;
