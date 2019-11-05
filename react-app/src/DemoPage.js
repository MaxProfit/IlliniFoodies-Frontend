import React from 'react';
import { Navbar } from './BarComponent';
import { DemoForm } from './DemoComponent';

class DemoPage extends React.Component {
    render() {
      return (
        <div>
          <Navbar active={["", "", "", "", "", " active", ""]}></Navbar>
  
          <DemoForm></DemoForm>
        </div>
      );
    }
}

export default DemoPage;
