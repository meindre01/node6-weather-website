const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=00590988b6ba95c4a4ca3ce0c22b863b&query='+ latitude +','+longitude
request({url,json:true},(error,{body} = {})=>{
    if(error){
        callback('Unable to connect to server connection',undefined)
    }else if(body.error){
        callback('Unable to find your location. Try another search !',undefined)
    }else{
        callback(undefined,'It is currently ' + body.current.weather_descriptions + ' and the temperature is ' + body.current.temperature + ' degrees out. And feels like ' + body.current.feelslike + ' degrees out and the humidity is ' + body.current.humidity)
    }
})


}

module.exports = forecast