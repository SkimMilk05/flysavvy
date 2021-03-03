import React, { Component } from 'react';
import Heading from './Heading'
import Background from './Background'

class App extends Component {

   render() { //runs before componentDidMount() method
      return (
         <div className="container">
               <Heading />
               <Background/>
         </div>
      );
   }
};

export default App;
