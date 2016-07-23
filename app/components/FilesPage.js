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
    let files = this.props.files;
    let renderFileItem = this.renderFileItem;
    let clickFile=this.clickFile.bind(this);
    if (files.length === 0) {
      return (<p>No files</p>)
    } else {
      return files.map(file => renderFileItem(file,clickFile))
    }
  }

  renderFileItem(file,clickFile) {
    return (<a key={file} onClick={()=>clickFile(file)}>{file}</a>);
  }

  clickFile(file){
    const clickFile = this.props.actions.clickFile;
clickFile(file);
  }
}

// FilePages.propTypes = {
//   actions: PropTypes.object.isRequired
// }
