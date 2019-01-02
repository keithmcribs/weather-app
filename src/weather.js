const config = require("./src/config.js");
const request = require('request');

var getWeather = (lat, lng, callback) => {
  request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${config.myKey}`,
      json: true
  }, (error, response, body) => {
    if(error){
      callback('Unable to connect to Google Map server');
    } else if (response.statusCode === 400){
      callback('Unable to fetch weather');
    } else if (response.statusCode === 200){
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    }
  });
}

module.exports.getWeather = getWeather;