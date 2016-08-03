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
import DictionaryIndexPage from '../components/DictionaryIndexPage'
import DictionaryPage from '../components/DictionaryPage'
import Menu from '../components/Menu';

require('../../dist/index.css');


class App extends Component {
  componentWillMount() {
    const receiveFiles = this.props.actions.receiveFiles;
    const receiveKeys = this.props.actions.receiveKeys;

    ipcRenderer.on('receiveKeys', (event, data) => {
      console.log('ipc receiveKeys')
      console.log(data);
      receiveKeys(data);
    });

    ipcRenderer.on('receiveFiles', (event, data) => {
      console.log('ipc receiveFiles')
      receiveFiles(data);
    });
  }
  openFile() {
    const ping = this.props.actions.ping;
    ping();
  }
  render() {
    
    return (
      <div className="MainContent">
        <Menu
          {...this.props}
        />
        <div className="container menu-offset">
          hello world!
          <button onClick={this.openFile.bind(this)}>click</button>
          {this.renderPages()}
        </div>
      </div>
    );
  }

  renderPages() {
    let files = this.props.files;
    let dictionary = this.props.dictionary;
    const actions = this.props.actions;
    const currentRoute = this.props.route.currentRoute;
    let pages = {}
    pages['main'] = () => <DictionaryIndexPage dictionary={dictionary} actions={actions} />
    pages['dictionaryShow'] = () => <DictionaryPage dictionary={dictionary} actions={actions} />

    if (pages[currentRoute]) {
      return pages[currentRoute]()
    } else {
      return pages['main']();
    }
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  console.log("====state===")
  console.log(state)
  return state;
// let {dir,files,dictionaries,keys,currentDictionaryDir,currentDictionary}=state.files

// let props={dir,files,dictionaries,keys,currentDictionaryDir,currentDictionary}

//   return props;
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
