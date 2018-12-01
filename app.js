const request = require("request");
const yargs = require("yargs");
const argv = yargs.options({
  a: {
    demand: true,
    alias: 'address',
    describe: 'address to fetch weather for',
    string: true 
  }
}).help().alias('help', 'h').argv;

var encodedAddress = encodeURIComponent(argv.address);
request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyAQxkmVE8UXADF7m00SjpiIUARMTinKjbU`,
    json: true
}, (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log(`Address: ${body.results[0].formatted_address}`);
  console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
  console.log(`longitude: ${body.results[0].geometry.location.lng}`)
});