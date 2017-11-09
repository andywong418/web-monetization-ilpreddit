import React from 'react';
import PropTypes from 'prop-types';

const Title = ( { name } ) => {
    return (
      <div>
        <h1> Title </h1>
        <h1>{name}</h1>
      </div>
    );
};

Title.propTypes = {
    name: PropTypes.string,
};


export default Title;
