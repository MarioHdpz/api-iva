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

app.get('/', function (req, res) {
    // Aquí pueden hacer lo que ustedes quieran
    const price = req.query.price;
    if (typeof req.query.price === "undefined") {
        res.status(400).send({"error": "`price` query param required"})
    }
    res.send(getIva(price));
})

app.post('/', function (req, res) {
    // Aquí pueden hacer lo que ustedes quieran
    const prices = req.body.prices;
    const pricesWithIva = prices.map(price => getIva(price));
    res.send(pricesWithIva);
})

// Bootstrap server
const server = app.listen(process.env.PORT || 3000, function () {
    console.log(`Escuchando en el puerto ${server.address().port}`);
});