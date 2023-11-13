const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000

console.log(path.join(__dirname,'../public'))
console.log(__filename)

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)


// app.get('',(req,res)=>{
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help',(req,res)=>{
//     res.send('Help page')
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>About Me</h1>')
// })
app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather App',
        name : 'Indra Permana'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'Help',
        name : 'Indra Permana',
        helpText : 'This is some help page'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title : 404,
        message : 'help article not found',
        name : 'Indra Permana'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About Me',
        name : 'Indra Permana'
    })
})

app.get('/weather',(req,res)=>{
    
    if(!req.query.address){
        return res.send({
            errorMessage : 'You must to provide the address'
        })
    }
    const address = req.query.address
   geocode(address,(error,{latitude,longitude,location}= {})=>{
    if(error){
        return res.send({
            error : error
        })
    }

     forecast(latitude,longitude,(error,data)=>{
         if(error){
            return res.send({
                error : error
              })
         }
         res.send({
            location : location,
            forecast : data,
            address : req.query.address
        })

         })
        
   })

  
})

app.get('/products',(req,res)=>{
   if(!req.query.search){
    return res.send({
        errorMessage : 'You must provide search term'
    })
   }
    console.log(req.query)
    res.send({
       product:[]
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title : 404,
        message : 'page not found',
        name : 'Indra Permana'
    })
})
app.listen(port,()=>{
    console.log('Server is up on port' + port)
})