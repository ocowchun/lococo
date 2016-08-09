import React, { PropTypes } from 'react';
import Style from './style.scss';

import MenuItemChild from '../MenuItemChild/index.js';
import MenuItemChildIsDir from '../MenuItemChildIsDir/index.js';

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

    const {
      clickDictionary,
      readWord,
      readWordGroup,
    } = this.props.actions;

    if(isChildEmpty) { return ''; }

    // 這裡的 key 並非代表 uuid 的 key，而是 i18n 的 key。
    return keys.map((dicKey) => {
      if(dicKey.isDir) {
        return (
          <MenuItemChildIsDir
            key={uuid()}
            keyName={dicKey.key}
            isDir={dicKey.isDir}
            readWord={readWord}
            readWordGroup={readWordGroup}
          />
        );
      }

    	return (
	    	<MenuItemChild 
          key={uuid()}
	    	  keyName={dicKey.key}
	    	  isDir={dicKey.isDir}
	    	  clickDictionary={clickDictionary}
          readWord={readWord}
          readWordGroup={readWordGroup}
	    	/>
    	);
    });

  }

  render() {
  	
  	const { 
      clickDictionary,
    } = this.props.actions;
  	const { dictionary, dictionaryName } = this.props;
    return (
			<li key={uuid()}>
			  <span onClick={() => clickDictionary(dictionaryName)}>{dictionaryName}</span>
        <ul>
  			  {this.renderChild()}
        </ul>
			</li>
    );
  }
}