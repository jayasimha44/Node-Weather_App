const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0a5431b27e1eb84eba6634947f35f0f1&query='+latitude+',%20'+longitude+'&units=f';

    request({ url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to the weather service.!', undefined);
        }
        else if(body.error) {
            callback('Unable to connect to the location! please try with different coordinates!', undefined);
        }
        else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently '+body.current.temperature+' degrees out. It feels like '+body.current.feelslike+' degrees out.');
        }
    });
}
module.exports = forecast;