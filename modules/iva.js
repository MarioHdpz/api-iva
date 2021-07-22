/* Iva calculations**/

function getIva(price) {
    return  {
        "price_with_iva": Math.round(parseFloat(price) * 1.16, 2),
        "iva": price * 0.16,
        "original": parseFloat(price)
    }
}

module.exports = {
    getIva
};