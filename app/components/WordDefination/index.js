import React, { PropTypes } from 'react';
import Style from './style.scss';

import uuid from '../../utils/uuid';

const propTypes = {
	word: PropTypes.object.isRequired,
	addWord: PropTypes.func.isRequired,
}

export default class WordDefination extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
  	let locales = [];
  	for(let props in this.props.word) {
		  locales.push(
		  	<div key={uuid()} className="WordGroup">
			  	<label>{props}</label>
			  	<input value={this.props.word[props]} />
		  	</div>
		  );
		}

    return (
      <div>{locales}</div>
    );
  }
}

WordDefination.PropTypes = propTypes;