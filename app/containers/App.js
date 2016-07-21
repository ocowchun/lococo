import React, {  Component,  PropTypes} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
const {dialog} = require('electron').remote;
const {ipcRenderer} = require('electron');
import * as Actions from '../actions'
import FilesPage from '../components/FilesPage'


class App extends Component {
  componentWillMount() {
    const receiveFiles = this.props.actions.receiveFiles;
    // ipcRenderer.on('asynchronous-reply', (event, arg) => {
    //   console.log(arg); // prints "pong"
    //   pong();
    // });

    ipcRenderer.on('receiveFiles', (event, message) => {
      receiveFiles(message); // Prints "whoooooooh!"
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

  renderPages(){
    let files=this.props.files;

return <FilesPage files={files} />;
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
console.log("====state===")

console.log(state)
  return state;
  // return {
  //   todos: state
  // }
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
