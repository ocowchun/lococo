import React from 'react';

export default class DictionaryIndexPage extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2> 歡迎來到 Locco </h2>
        <p> 開始進行翻譯，請選單列表選擇檔案 </p>
      </div>
    );
  }
}
