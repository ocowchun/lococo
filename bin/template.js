var component = `import React from 'react';
import Style from './style.scss';
export default class {{filename}} extends React.Component {
  
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div></div>
    );
  }
}
`;


module.exports = {
	component: component
}