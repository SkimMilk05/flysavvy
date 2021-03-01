import React, { Component } from 'react';

class App extends Component {

   constructor(props) {
      super(props);
      this.state = {
         items: [],
         isLoaded: false,
      }
   }

   componentDidMount() { //runs after render() method, then updates render method that outputs results
      
    fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/EWR-sky/LAX-sky/2021-03-02", {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "e3baccc270msh832c83181dc8df3p1caccbjsn78ad599506d4",
        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
      }
    })
        .then(res => res.json()) //convert the string to json format
         .then(json => { //then, with the jason format,
            this.setState({
               isLoaded: true, //data has been loaded
               items: json, //save data inside the app state
            })
         });

   }

   render() { //runs before componentDidMount() method

      var { isLoaded, items} = this.state; //access properties inside state

      if (!isLoaded) {
         return <div>Loading...</div>;
      }

      else {
         return (
            <div className="App">
              Flight Data loaded
            </div>
         );
      }
   }
}

export default App;
