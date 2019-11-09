import React from 'react';
import Navbar from './Navbar';
import DemoForm from './DemoComponent';

class DemoPage extends React.Component {
    render() {
      return (
        <div>
          <Navbar></Navbar>
          <DemoForm></DemoForm>
        </div>
      );
    }
}

export default DemoPage;
