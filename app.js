const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', function(req, res){
        res.send('Hello');
})

app.listen(port, function(req, res){
    console.log(`Server is up on port ${port}`);
})
