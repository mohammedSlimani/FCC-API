const express = require("express");
const Router = express.Router();
const dns = require('dns');
const db = require('./db')

const DOMAIN = 'https://smed-url.glitch.me/'

Router.post('/new', (req, res, next) => {
    let { body: { url } } = req;
    //treat the url cz the dns doesn't care about the protocol
    url = url.split('//').pop();
    console.log("processing ", url)
    dns.lookup(url, async (err, adress, family) => {
        try {
            if (err) res.json({ "error": "invalid URL" })
            else {
                let existing = await db.getUrlByUrl(url);
                //console.log("existing url fetched :",existing);
                if (existing.length) {
                    console.log("url exist ...");
                    const foundUrl = existing[0];
                    res.json({
                        'origina_url': foundUrl.url,
                        'short_url': DOMAIN + foundUrl.num
                    })
                } else {
                    console.log("creating a new url ...")
                    let newone = await db.createAndSaveUrl(url);
                    res.json({
                        'origina_url': newone.url,
                        'short_url': DOMAIN + newone.num
                    })
                }
            }
        } catch (err) {
            console.log("err ", err);
        }

    })
})



module.exports = Router;