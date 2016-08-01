import React, {  Component,  PropTypes} from 'react';

export default class FilesPage extends Component {
  render() {
    // console.log(this.props.todos)
    return (
      <div>
{this.renderFiles()}
      </div>
    );
  }

  renderFiles() {
    let dir=this.props.files.dir;
    let dictionaries = this.props.files.dictionaries;
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
