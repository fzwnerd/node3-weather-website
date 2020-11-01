const path = require('path');

const express = require('express');
const hbs = require('hbs');

const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// set up handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather',
        name: 'andrew mead'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me',
        name: 'andrew me'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'SOS!!',
        title: 'help',
        name: 'andrew mead'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'must specify address'
        });
    }

    const address = req.query.address;
    //console.log({address});
    forecast(address, (error, response) => {
        if (error) {
            return res.send({error}); 
        }
        res.send({
            forecast: response,
            location: address
        });
    });
    // res.send({
    //     forecast: '50 degrees outside',
    //     location: 'philedelphia',
    //     address: req.query.address
    // });
})

// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'must provide search term'
//         });
//     }
//     console.log(req.query.search);
//     res.send(
//         {
//             products: []
//         }
//     );
// });

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404 error',
        name: 'andrew mead', 
        message: 'Help article not found'
    });
    //res.send('help article not found');
});

app.get('*', (req, res) => {
    res.render('error', {
        title: '404 error',
        name: 'andrew mead', 
        message: 'Page not found'
    });
});

app.listen(port, () => {
    //console.log('server is up on port 3000');
})