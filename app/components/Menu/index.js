import React from 'react';

import MenuItem from '../MenuItem/index.js';

const propTypes = {

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
    		<ul>
          {this.renderMenuItems()}
        </ul>
      </nav>
    );
  }
}
