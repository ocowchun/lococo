import React, { PropTypes } from 'react';
import { dialog } from 'electron';

import MenuItem from '../MenuItem/index.js';

require('./style.scss');




const propTypes = {
  actions: PropTypes.object.isRequired,
  dictionary: PropTypes.shape({
    current: PropTypes.string.isRequired,
    currentDir: PropTypes.string.isRequired,
    dictionaries: PropTypes.array.isRequired,
    keys: PropTypes.array.isRequired,
  }),
  files: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired
};

function generateSimpleKey() {
  const base = 36;
  const digit = 10;
  
  return new String(Math.floor(Math.random() * Math.pow(base, digit)).toString(base));
}

export default class Navbar extends React.Component {
  
  constructor(props) {
    super(props);
    
  }

  componentDidMount() {
  }

  handleClick() {

  }

  renderEmpty() {
    const empty = (<li>尚未選擇檔案</li>);
    return empty;
  }

  renderMenuItems() {
    const { dictionary, actions } = this.props;
    const isDictionaryEmpty = dictionary.dictionaries.length === 0;
    const uuid = generateSimpleKey;

    if(isDictionaryEmpty) { return this.renderEmpty() }

    return dictionary.dictionaries.map(dic => {
      return (
        <MenuItem
          key={uuid()}
          dictionaryName={dic}
          {...this.props}
        />
      );
    });
  }

  render() {
    return (
      <nav className="menu">
        <h3>Locoo</h3>
    		<ul>
          {this.renderMenuItems()}
        </ul>
      </nav>
    );
  }
}

Navbar.propTypes = propTypes;