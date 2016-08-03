import React, { PropTypes } from 'react';
import Style from './style.scss';

const propTypes = {
  keyName:  PropTypes.string.isRequired,
  isDir: PropTypes.bool.isRequired,
  clickDictionary: PropTypes.func.isRequired,
};

export default class MenuItemChild extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      <li>
       {this.props.keyName}      	
      </li>
    );
  }
}

MenuItemChild.propTypes = propTypes;