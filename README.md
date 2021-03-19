# FlySavvy - Find cheap flights, fast

FlySavvy is built using React.js and hosted on Vercel. It uses the [SkyScanner API](https://rapidapi.com/skyscanner/api/skyscanner-flight-search) from Rapid API to get the cheapest flight prices for a one-way or round-trip flight between two destinations, taking currency preferences into account.

The live site can be viewed [here](https://flysavvy.vercel.app/) or at: https://flysavvy.vercel.app/

FlySavvy uses these endpoints from SkyScanner API:

- Places > GET List Places: to return a list of acceptable destinations/origins by SkyScanner based on user query
- Localisation > GET Currencies: to return a list of currencies supported by SkyScanner
- Browse Flight Prices > GET Browse Quotes: to return a list of flights with their respective prices based on selected destinations/origins, flight date(s), and currency


Planning Component structure and wireframing was done through Balsamiq Cloud and can be viewed [here](https://balsamiq.cloud/sas1iz4/porvff0): https://balsamiq.cloud/sas1iz4/porvff0

Project resources documented through Google Docs can be found [here](https://docs.google.com/document/d/1sTBR8mBohF8CGccavrWRXZ9orqhhua1zcUIUJUlEhd4/edit?usp=sharing)



I hope you enjoy FlySavvy!



## Instructions for running FlySavvy in local host

Clone this repository to your local machine. In the project directory, you can run:

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.




