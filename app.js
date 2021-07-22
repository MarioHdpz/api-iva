/*
API IVA
*/

const express = require('express');
const cors = require('cors');
const { getIva } = require('./modules/iva');

// Global app object
const app = express();

// Middlware config
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

function celsiusToFahrenheit(value) {
    return Math.round(value * 1.8 + 32, 2);
}

function fahrenheitToCelsius(value) {
    return Math.round((value - 32) / 1.8, 2);
}

app.get('/celsius-to-fahrenheit', function (req, res) {
    // Aquí pueden hacer lo que ustedes quieran
    const temperature = parseFloat(req.query.value);
    res.send({"value": celsiusToFahrenheit(temperature)});
})

app.get('/fahrenheit-to-celsius', function (req, res) {
    // Aquí pueden hacer lo que ustedes quieran
    const temperature = parseFloat(req.query.value);
    res.send({"value": fahrenheitToCelsius(temperature)});
})

app.post('/bulk-convertion', function(req, res) {
    const type = req.query.type;
    const data = req.body;
    switch (type) {
        case 'f':
            res.send(data.map(value => fahrenheitToCelsius(value)))
            break;
        case 'c':
            res.send(data.map(value => celsiusToFahrenheit(value)))
            break;
        default:
            res.status(400).send({"message": "Error"})
            break;
    }
});

// Bootstrap server
const server = app.listen(process.env.PORT || 3000, function () {
    console.log(`Escuchando en el puerto ${server.address().port}`);
});