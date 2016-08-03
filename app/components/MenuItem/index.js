import React, { PropTypes } from 'react';
import Style from './style.scss';

import MenuItemChild from '../MenuItemChild/index.js';

function generateSimpleKey() {
  const base = 36;
  const digit = 10;
  
  return new String(Math.floor(Math.random() * Math.pow(base, digit)).toString(base));
}

const uuid = generateSimpleKey;

const propTypes = {
  
}

export default class MenuItem extends React.Component {
  
  constructor(props) {
    super(props);
  }

  clickDictionary(file) {
    const { clickDictionary } = this.props.actions;
		clickDictionary(file);
  }

  renderChild() {
    const { dictionaries, keys } = this.props.dictionary;
    const isChildEmpty           = keys.length === 0;

    const { clickDictionary } = this.props.actions;

    if(isChildEmpty) { return ''; }

    // 這裡的 key 並非代表 uuid 的 key，而是 i18n 的 key。
    return keys.map((dicKey) => {
    	return (
    		<ul>
		    	<MenuItemChild 
		    	  key={uuid()}
		    	  keyName={dicKey.key}
		    	  isDir={dicKey.isDir}
		    	  clickDictionary={clickDictionary}
		    	/>
		    </ul>
    	);
    });

  }

  render() {
  	
  	const { clickDictionary }            = this.props.actions;
  	const { dictionary, dictionaryName } = this.props;
    return (
			<li key={uuid()}>
			  <span onClick={() => clickDictionary(dictionaryName)}>{dictionaryName}</span>
			  {this.renderChild()}
			</li>
    );
  }
}