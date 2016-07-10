import React, {  Component,  PropTypes} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
const {dialog} = require('electron').remote;
const {ipcRenderer} = require('electron');
import * as Actions from '../actions'

class App extends Component {
  componentWillMount() {
    const pong = this.props.actions.pong;
    ipcRenderer.on('asynchronous-reply', (event, arg) => {
      console.log(arg); // prints "pong"
      pong();
    });
  }
  openFile() {
    const ping = this.props.actions.ping;
    ping();
  }
  render() {
    console.log(this.props.todos)
    return (
      <div>
        hello world!
        <button onClick={this.openFile.bind(this)}>click</button>
      </div>
    );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  // return state;
  return {
    todos: state
  }
}

function mapDispatchToProps(dispatch) {
  // return {
  //   actions: [1, 2, 3]
  // };
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
