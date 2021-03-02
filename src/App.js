import React, { Component } from 'react';

class App extends Component {

   constructor(props) {
      super(props);
      this.state = {
         items: [],
         isLoaded: false,
      }
   }

   /*
   search() {

      fetch("https://partners.api.skyscanner.net/apiservices/pricing/v1.0", {
         "method": "POST",
         "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Forwarded-For": "100.15.73.229",
            "accept": "application/json"
         },
         "body": JSON.stringify({
            country: "US",
            currency: "USD",
            locale: "en-US",
            originplace: "IAD-sky",
            destinationplace: "LAX-sky",
            outboundPartialDate: "2021-03-03",
            apikey: "100.15.73.229"
         })
         })
         .then(response => response.json())
         .then(json => { //then, with the jason format,
            this.setState({
               startedSession: true //session has been started
            })
         })
         .catch(err => {
         console.log(err);
         });
   }
*/
   componentDidMount() { //runs after render() method, then updates render method that outputs results

   
   //search 
   //leave space b/c that works?
   fetch("https://cors-anywhere.herokuapp.com/ https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0", {
         method: "POST",
         mode: "cors",
         headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Forwarded-For": "71.163.15.28",
            "accept": "application/json"
         },
         body: JSON.stringify({
            country: "US",
            currency: "USD",
            locale: "en-US",
            originplace: "IAD-sky",
            destinationplace: "LAX-sky",
            outboundPartialDate: "2021-03-03",
            apikey: "e3baccc270msh832c83181dc8df3p1caccbjsn78ad599506d4"
         })
         })
         .then(response => {
            console.log(response)
          })
         .catch(err => {
         console.log(err);
         });
   
/*
   var unirest = require('unirest');
   unirest.post("https://cors-anywhere.herokuapp.com/ https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0")
      .header("X-RapidAPI-Key", "73c4c7b9e4msh0a2357717fa16ddp1db3bdjsn8cef95e5049c")
      .header("X-RapidAPI-Host", "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com")
      .header("Content-Type", "application/x-www-form-urlencoded")
      .send("inboundDate=2021-03-10")
      .send("cabinClass=business")
      .send("children=0")
      .send("infants=0")
      .send("country=US")
      .send("currency=USD")
      .send("locale=en-US")
      .send("originPlace=SFO-sky")
      .send("destinationPlace=LHR-sky")
      .send("adults=1")
   .end(function (result) {
   console.log(result.status, result.headers, result.body);
   });
*/
      
   fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/EWR-sky/LAX-sky/2021-03-02", {
      method: "GET",
      headers: {
        "x-rapidapi-key": "73c4c7b9e4msh0a2357717fa16ddp1db3bdjsn8cef95e5049c",
        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
      }
    })
        .then(res => res.json()) //convert the string to json format
         .then(json => { //then, with the jason format,
            this.setState({
               isLoaded: true, //data has been loaded
               items: json
            })
         })
         .catch(err => { console.log(err) 
         });

   }

   render() { //runs before componentDidMount() method

      var { isLoaded, startedSession, items} = this.state; //access properties inside state


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
