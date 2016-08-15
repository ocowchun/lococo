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

  handleClick(e) {
    const { readWordGroup, readWord } = this.props;

    readWordGroup(this.props.keyName);
  }

  render() {
    const { keyName } = this.props;
    let displayName = keyName.split('.');
    displayName = displayName[displayName.length - 1];


    return (
      <li>
        <span onClick={this.handleClick.bind(this)}>
          <strong>{displayName}</strong>
        </span>
      </li>
    );
  }
}

MenuItemChildIsDir.PropTypes = propTypes;