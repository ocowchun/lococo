import React, { PropTypes } from 'react';
import Style from './style.scss';

import uuid from '../../utils/uuid';

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

  renderLocales() {
    let locales = [];
    for(let props in this.props.word) {
      locales.push(
        <div key={uuid()} className="WordGroup">
          <label>{props}</label>
          <input ref={props} defaultValue={this.props.word[props]} />
          <button value={props} onClick={this.onEditButtonClick.bind(this)}>修改</button>
        </div>
      );
    }

    return locales;
  }

  render() {
    return (
      <div>
        <h2>{this.props.currentWord}</h2>
        {this.renderLocales()}

        <button className="SaveDictionary">儲存</button>
      </div>
    );
  }
}

WordDefination.PropTypes = propTypes;
export default WordDefination;