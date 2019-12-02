'use strict';
const express = require('express');
const passport = require('./utils/pass.js');
const fs = require('fs');
const https = require('https');
const app = express();
const port = 8000;
const httpsPort = 3000;

const cors = require('cors');
const catRoute = require('./routes/catRoute');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute.js');
const sslkey  = fs.readFileSync('/etc/pki/tls/private/ca.key');
const sslcert = fs.readFileSync('/etc/pki/tls/certs/ca.crt');
const options = {
  key: sslkey,
  cert: sslcert
};


app.use(cors());

//force https
/*app.use((req,res,next) =>{
  if(!req.secure){
    res.status(403).send('use https')
  }else{
    next();
  }
});

 */
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
app.use('/thumbnails', express.static('thumbnails'));
app.use(express.static('uploads'));
app.use('/auth',authRoute);
app.use('/cat',passport.authenticate('jwt', {session: false}),catRoute );

app.use('/user',passport.authenticate('jwt', {session: false}) ,userRoute );

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
https.createServer(options, app).listen(httpsPort); //https traffic