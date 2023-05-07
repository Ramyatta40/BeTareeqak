const express = require('express')
const app = express()


app.get('/api/login', function(request, response) {
    var url = uber.getAuthorizeUrl(['history','profile', 'request', 'places']);
    response.redirect(url);
  });


app.listen(5000, () => { console.log("Server Started at port 5000") })