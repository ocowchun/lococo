import React from 'react';
import Style from './style.scss';
export default class ActionButton extends React.Component {
  
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <button onClick={this.props.onClickFn} className="btn">{this.props.text}</button>
    );
  }
}
