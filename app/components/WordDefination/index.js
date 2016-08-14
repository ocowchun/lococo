import React, { PropTypes } from 'react';
import Style from './style.scss';

import uuid from '../../utils/uuid';

import ActionButton from '../ActionButton/';

const propTypes = {
  currentWord: PropTypes.string.isRequired,
	word: PropTypes.object.isRequired,
	addWord: PropTypes.func.isRequired,
  saveDictionary: PropTypes.func.isRequired,
};

class WordDefination extends React.Component {
  
  constructor(props) {
    super(props);
  }

  onEditButtonClick(e) {
    const currentValue = this.refs[e.target.value].value;
    const locale       = e.target.value;
    const { currentWord, addWord } = this.props;
    
    addWord(currentWord, currentValue, locale);
  }

  onSaveButtonClick(e) {
    const { saveDictionary } = this.props;
    saveDictionary();
  }

  renderLocales() {
    let locales = [];
    for(let props in this.props.word) {
      locales.push(
        <div key={uuid()} className="form-group">
          <label>{props}</label>
          <input type="text" ref={props} defaultValue={this.props.word[props]} />
          <button className="btn" value={props} onClick={this.onEditButtonClick.bind(this)}>修改</button>
        </div>
      );
    }

    return locales;
  }

  render() {
    return (
      <div style={{marginTop: '20px'}}>
        <h2 style={{textAlign: 'center'}}>目前字彙為：{this.props.currentWord}</h2>
        {this.renderLocales()}

        <button className="btn" onClick={this.onSaveButtonClick.bind(this)}>儲存</button>
      </div>
    );
  }
}

WordDefination.PropTypes = propTypes;
export default WordDefination;