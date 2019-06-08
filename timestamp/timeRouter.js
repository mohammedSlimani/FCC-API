const express = require("express");
const timeRouter = express.Router();
const moment = require('moment');

timeRouter.get('/', (req, res) => {
    res.json({
        "unix": new Date().getTime(),
        "utc": new Date().toUTCString()
    });
})

timeRouter.get('/:date_string', (req, res) => {
    let date = req.params.date_string;
    let utc = null;
    let unix = null;
    if (moment(date, 'X', true).isValid()) {
        utc = moment.unix(date).utc().format('YYYY-MM-DD');
        unix = moment(date, 'X', true).unix();
    } else if (moment(date, 'Y-M-D', true).isValid()) {
        utc = moment(date, 'Y-M-D', true).utc();
        unix = moment(date, 'Y-M-D', true).unix();
    } else if (moment(date, 'YYYY-M', true).isValid()) {
        utc = moment(date, 'YYYY-M', true).utc();
        unix = moment(date, 'YYYY-M', true).unix();
    } else if (moment(date, 'M-D', true).isValid()) {
        utc = moment(date, 'M-D', true).utc();
        unix = moment(date, 'M-D', true).unix();
    }
    if (utc == null)
        res.json({ "error": "Invalid Date" });
    else
        res.json(
            {
                unix,
                utc: new Date(utc).toUTCString()
            });
})
module.exports = timeRouter;