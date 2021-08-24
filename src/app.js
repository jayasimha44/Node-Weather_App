const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')


const app = express();

const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App!',
        name: 'Jayasimha Reddy'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me!',
        name: 'jayasimha Reddy'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help!',
        name: 'Jayasimha Reddy'
    })
})

app.get('/weather', (req, res)=> {
    if(!req.query.address) {
        return res.send({
            Error: 'Please Provide the correct location in search field!'
        })
    }
    geocode(req.query.address, (error ,{latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        error: 'Help Article not found!',
        name: 'Jayasimha Reddy'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        error: 'Page Not Found!',
        name: 'Jayasimha Reddy'
    })
})


app.listen(3000, () => {
    console.log("server running at 3000...");
});