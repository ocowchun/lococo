import React from 'react';
import Style from './style.scss';

import MenuItemChild from '../MenuItemChild/';

export default class MenuItemChildIsDir extends React.Component {
  
  constructor(props) {
    super(props);
  }

  renderMenuItemChild() {
  	
  }

  renderMenuItemIsDir() {

  }

  render() {
    return (
      <li>
        <span>{this.props.keyName}</span>
   			
      </li>
    );
  }
}
