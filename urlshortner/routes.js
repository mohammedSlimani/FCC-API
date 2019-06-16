const express = require("express");
const Router  = express.Router();
const dns     = require('dns');
const db = require('./db');
const urlParser = require('url');

const DOMAIN = 'https://smed-url.glitch.me/api/shorturl/'

Router.post('/new',(req,res,next)=>{
  let {body:{url}} = req;
  //treat the url cz the dns doesn't care about the protocol
  url = urlParser.parse(url);
  console.log("processing ",url)
  dns.lookup(url.host,async(err,adress,family)=>{
    try{
        if(err) res.json({"error":"invalid URL"})   
      else{
        let existing = await db.getUrlByUrl(url.href);
        //console.log("existing url fetched :",existing);
        if(existing.length){
          console.log("url exist ...");
          const foundUrl = existing[0];
          res.json({'origina_url':foundUrl.url,
                   'short_url':DOMAIN + foundUrl.num})
        }else{
          console.log("creating a new url ...")
          let newone = await db.createAndSaveUrl(url.href);
          res.json({'origina_url':newone.url,
                   'short_url':DOMAIN + newone.num})
        }
      }
    }catch(err){
      console.log("err ",err);
    }
    
  })
})

Router.get('/:shorturl',(req,res,next)=>{
  let shorturl = req.params.shorturl;
  if(isNaN(shorturl)) res.json({"Not found":"no url found, add it here: https://smed-url.glitch.me "})
  try{
    const existingUrl = db.getUrlByNum(shorturl,(err,founded)=>{
      if(err) next(err)
      else if(founded.length){
        console.log('after the query I find',founded);
        console.log("redirecting to:",founded[0].url);
        res.redirect(founded[0].url);
        res.end();
      }else{
        res.json({"Not found":"no url found, add it here: https://smed-url.glitch.me "})
      }
    });
  }catch(err){
    console.log(err);
    res.json({"error":"Catched Error"});
  } 
})

module.exports = Router;