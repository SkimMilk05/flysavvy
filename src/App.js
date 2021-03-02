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
         })
         .catch(err => { console.log(err) 
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
            {/* loop through data to display */ }
               <ul> {/* use javascript map function. It loops through each item */}
                  {items.Quotes.map(quote => (
                        <li key={quote.QuoteId}>
                           Price: {quote.MinPrice} | 
                           Date/Time: {quote.QuoteDateTime}
                        </li>
                  ))}
               </ul>
            </div>
         );
      }
   }
}

/*
{4 items
"Quotes":[
0:{5 items
"QuoteId":1
"MinPrice":120
"Direct":true
"OutboundLeg":{...}4 items
"QuoteDateTime":"2021-03-01T14:05:00"
}
]
"Carriers":[1 item
0:{...}2 items
]
"Places":[2 items
0:{...}8 items
1:{...}8 items
]
"Currencies":[1 item
0:{...}8 items
]
*/

export default App;
