const request = require('request');

const forecast = (loc, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=9a1fd71779d18b258d4dc6f879b83a5f&query=${encodeURIComponent(loc)}&units=f`;
    request({url, json: true}, 
        (error, response) =>{
            if (error) {
                callback('unable to connect to weather service');
                return;
            }
    
            if (response.body.error) {
                callback('unable to find location');
                return;
            }
    
            const current = response.body.current;

            //console.log({current});

            callback(null, `${current.weather_descriptions[0]}. It is now ${current.temperature} degrees out. It feels like ${current.feelslike} degrees. Humidity is ${current.humidity}`)
        }
    );
}



module.exports = forecast;