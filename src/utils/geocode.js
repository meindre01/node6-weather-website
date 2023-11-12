const request = require('request')

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibWVpbmRyZSIsImEiOiJjazRvMDc0eW4yY3BzM2tsYjIwYzc0Ymt0In0.-bLyeMeBvnxnCuJ-WwufJA&limit=1'
request({url, json:true},(error,{body} = {})=>{
    if(error){
        callback('Unable to connect server connection', undefined)
    }else if(body.features.length === 0){
        callback('Unable to find your location. Try another search !',undefined)
    }else{
        callback(undefined,{
            latitude : body.features[0].center[1],
            longitude : body.features[0].center[0],
            location : body.features[0].place_name
        })
    }
})

}

module.exports = geocode