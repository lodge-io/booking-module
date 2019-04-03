
import React from 'react';
import ReactDOM from 'react-dom';


class Asdf extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div>
        rendered properly
        <div>asdf</div>
      </div>
    )
  }
}

// ReactDOM.render(<Asdf/>, 
//   document.querySelector('#app'));

export default Asdf;