const express = require('express');
const cors = require('cors');
const PORT = 3000;

const app  = express();
app.use(cors({ optionSuccessStatus : 200}));

app.use('/api/whoami',(req,res)=>{
    let {ip,headers:{"accept-language":language,"user-agent":software}} = req;
    console.log(ip, software, language);
    res.json({ip,software,language});
})

app.listen(PORT,()=>console.log(`The server is running on port ${PORT}`));