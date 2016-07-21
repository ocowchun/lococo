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

  renderFiles(){
    let files=this.props.files;
    if(files.length===0){
      return (<p>No files</p>)
    }
    else{
      return files.map(file=><p key={file}>{file}</p>)
    }
  }
}

// FilePages.propTypes = {
//   actions: PropTypes.object.isRequired
// }
