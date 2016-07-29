import React, {
  Component,
  PropTypes
} from 'react';
import {
  bindActionCreators
} from 'redux'
import {
  connect
} from 'react-redux'
const {
  dialog
} = require('electron').remote;
const {
  ipcRenderer
} = require('electron');
import * as Actions from '../actions'
import FilesPage from '../components/FilesPage'


class App extends Component {
  componentWillMount() {
    const receiveFiles = this.props.actions.receiveFiles;
    const receiveKeys = this.props.actions.receiveKeys;

    // ipcRenderer.on('asynchronous-reply', (event, arg) => {
    //   console.log(arg); // prints "pong"
    //   pong();
    // });
    ipcRenderer.on('receiveKeys', (event, data) => {
      console.log('ipc receiveKeys')
      console.log(data);
      receiveKeys(data); // Prints "whoooooooh!"
    });

    ipcRenderer.on('receiveFiles', (event, data) => {
      console.log('ipc receiveFiles')
      receiveFiles(data); // Prints "whoooooooh!"
    });
  }
  openFile() {
    const ping = this.props.actions.ping;
    ping();
  }
  render() {
    return (
      <div>
        hello world!
        <button onClick={this.openFile.bind(this)}>click</button>
        {this.renderPages()}
      </div>
    );
  }

  renderPages() {
    let files = this.props.files;
    const actions = this.props.actions;
    console.log(actions)
    return <FilesPage files={files} actions={actions} />;
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  console.log("====state===") {
    keys: state.file.keys,
    dictionaries: state.file.dictionaries,
    dir: state.file.dir
  }
  console.log(state)
  return state;
  // return {
  //   todos: state
  // }
}

function mapDispatchToProps(dispatch) {
  console.log("Actions")

  console.log(Actions)
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
