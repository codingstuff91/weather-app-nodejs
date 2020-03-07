const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/dac1f3fd216beacdbfc1eb5609dd222d/' + latitude + ',' + longitude +'?lang=fr&units=si'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' Il fait une temperature de ' + body.currently.temperature + ' °C. Il y a ' + body.currently.precipProbability + '% de chance de pluie.')
        }
    })
}

module.exports = forecast