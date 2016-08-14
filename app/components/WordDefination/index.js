import React, { PropTypes } from 'react';
import Style from './style.scss';

import uuid from '../../utils/uuid';

import ActionButton from '../ActionButton/';

const propTypes = {
  currentWord: PropTypes.string.isRequired,
	word: PropTypes.object.isRequired,
	addWord: PropTypes.func.isRequired,
  saveDictionary: PropTypes.func.isRequired,
  readWord: PropTypes.func.isRequired,
  readWordGroup: PropTypes.func.isRequired,
};

class WordDefination extends React.Component {
  
  constructor(props) {
    super(props);
  }

  clearInputValue() {
    this.refs.wordKey.value = '';
    this.refs.wordValue.value = '';
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

  onAddValueButtonClick(e) {
    const { addWord, readWord, readWordGroup } = this.props;
    const curWordArr = this.props.currentWord.split('.');
    const lastWord = curWordArr[curWordArr.length - 1];

    const wordKey = this.refs.wordKey.value;
    const wordValue = this.refs.wordValue.value;

    const currentDir = curWordArr.slice(0, curWordArr.length - 1).join('.');
    const defaultLocale = 'zh-TW';
    
    addWord(`${currentDir}.${wordKey}`, wordValue, defaultLocale);
    readWordGroup(currentDir);
    readWord(`${currentDir}.${wordKey}`);
    

    this.clearInputValue();
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
        <p style={{textAlign: 'center'}}>預設值為：<strong style={{textDecoration: 'underline'}}>{this.props.word['zh-TW'] || ''}</strong></p>

        {this.renderLocales()}

        <div style={{marginBottom: '10px'}} className="action-group">
          <button className="btn" onClick={this.onSaveButtonClick.bind(this)}>儲存</button>
        </div>

        <div style={{marginBottom: '10px'}} className="action-group">
          <div className="form-group">
            <label>新增字彙</label>
            <input ref="wordKey" type="text" placeholder="在此新增key..." />：
            <input ref="wordValue" type="text" placeholder="在此新增value..." />
            <button className="btn" onClick={this.onAddValueButtonClick.bind(this)}>新增字彙</button>
            <small> <strong>(將在本目錄下新增此字彙)</strong></small>
          </div>
        </div>
      </div>
    );
  }
}

WordDefination.PropTypes = propTypes;
export default WordDefination;