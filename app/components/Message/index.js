import React from 'react';
import Style from './style.scss';


export default class Message extends React.Component {
  
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="message-notifier">{this.props.text}</div>
    );
  }
}
