import React, { PropTypes } from 'react';
import Style from './style.scss';

import uuid from '../../utils/uuid';

const propTypes = {
	word: PropTypes.object.isRequired,
	addWord: PropTypes.func.isRequired,
  saveDictionary: PropTypes.func.isRequired,
};

export default class WordDefination extends React.Component {
  
  constructor(props) {
    super(props);
  }

  handleChange(e) {
    console.log(this.refs);
    console.log(e);
  }

  handleButtonClick(e) {
    const currentValue = this.refs[e.target.value].value;
    const { addWord } = this.props;
    
    addWord(currentValue);
  }

  handleSaveButton(e) {

  }

  render() {
  	let locales = [];
  	for(let props in this.props.word) {
		  locales.push(
		  	<div key={uuid()} className="WordGroup">
			  	<label>{props}</label>
			  	<input ref={props} onChange={this.handleChange.bind(this)} defaultValue={this.props.word[props]} />
          <button value={props} onClick={this.handleButtonClick.bind(this)}>修改</button>
		  	</div>
		  );
		}

    return (
      <div>
        {locales}

        <button onClick={this.handleSaveButton.bind(this)} className="SaveDictionary">儲存</button>
      </div>
    );
  }
}

WordDefination.PropTypes = propTypes;