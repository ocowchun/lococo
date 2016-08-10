import React, { PropTypes } from 'react';
import Style from './style.scss';

import MenuItemChild from '../MenuItemChild/';

const propTypes = {
  readWordGroup: PropTypes.func.isRequired,
  readWord: PropTypes.func.isRequired,
};

export default class MenuItemChildIsDir extends React.Component {
  
  constructor(props) {
    super(props);
  }

  renderMenuItemChild() {
  	
  }

  renderMenuItemIsDir() {

  }

  handleClick(e) {
    const { readWordGroup, readWord } = this.props;

    readWordGroup(this.props.keyName);
  }

  render() {
    return (
      <li>
        <span onClick={this.handleClick.bind(this)}><strong>{this.props.keyName}</strong></span>
      </li>
    );
  }
}

MenuItemChildIsDir.PropTypes = propTypes;