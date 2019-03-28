import React from 'react';
import ReactDOM from 'react-dom';

class Asdf extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return <div>asdf</div>
  }
}

ReactDOM.render(<Asdf/>, 
  document.querySelector('#app'));