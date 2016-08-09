import React, { PropTypes } from 'react';
import Style from './style.scss';

import MenuItem from '../MenuItem/index.js';

const propTypes = {
  keyName:  PropTypes.string.isRequired,
  isDir: PropTypes.bool.isRequired,
  readWord: PropTypes.func.isRequired,
};

export default class MenuItemChild extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
    	isDir: false,
    	hasExpanded: false,
    };
  }

  componentWillMount() {
  	const curState = this.state;
  	this.setState(
      Object.assign({}, curState, {
      	isDir: this.props.isDir,
      })
  	);
  }

  handleClick(e) {
    const { readWord, keyName } = this.props;
    readWord(keyName);
  }

  render() {

    return (
      <li onClick={this.handleClick.bind(this)}>
       {this.props.keyName}
      </li>
    );
  }
}

MenuItemChild.propTypes = propTypes;