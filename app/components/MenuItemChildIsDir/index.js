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

  handleClick(e) {
    console.log(this);
  }

  render() {
    return (
      <li>
        <span onClick={this.handleClick.bind(this)}><strong>{this.props.keyName}</strong></span>
           			
      </li>
    );
  }
}
