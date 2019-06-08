const express = require('express');
const cors = require('cors');
const PORT = 3000;

const app  = express();
app.use(cors({ optionSuccessStatus : 200}));

app.listen(PORT,()=>console.log(`The server is running on port ${PORT}`));