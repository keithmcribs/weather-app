const config = require("./src/config.js");
const yargs = require("yargs");
const axios = require("axios");

const argv = yargs.options({
  a: {
    demand: true,
    alias: 'address',
    describe: 'address to fetch weather for',
    string: true 
  }
}).help().alias('help', 'h').argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${config.myKey}`;

axios.get(geocodeUrl).then((response) => {
  if(response.data.status === 'ZERO_RESULTS'){
    throw new Error('Unable to find that address');
  }
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.forecast.io/forecast/12a965d94960f0df3652f501e45ceacd/${lat},${lng}?si`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature} degree, but it feels like ${apparentTemperature} degree.`);
}).catch((err) => {
  if(err.code === 'ENOTFOUND'){
    console.log('Unable to connect to Google Map server');
  } else {
    console.log(err.message);
  }
  console.log(err);
});

