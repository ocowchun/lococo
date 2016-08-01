import React, {  Component,  PropTypes} from 'react';

export default class DictionaryIndexPage extends Component {
  render() {
    // console.log(this.props.todos)
    return (
      <div>
<h2>DictionaryIndexPage</h2>
{this.renderFiles()}
      </div>
    );
  }

  renderFiles() {
    let dictionaries=this.props.dictionary.dictionaries;
    // let dictionaries = this.props.files.dictionaries;
    let renderFileItem = this.renderFileItem;
    let clickDictionary=this.clickDictionary.bind(this);
    if (dictionaries.length === 0) {
      return (<p>No files</p>)
    } else {
      return dictionaries.map(dic => renderFileItem(dic,clickDictionary))
    }
  }

  renderFileItem(file,clickDictionary) {
    return (<a key={file} onClick={()=>clickDictionary(file)}>{file}</a>);
  }

  clickDictionary(file){
    const clickDictionary = this.props.actions.clickDictionary;
clickDictionary(file);
  }
}

// FilePages.propTypes = {
//   actions: PropTypes.object.isRequired
// }
