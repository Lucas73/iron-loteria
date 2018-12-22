const express = require('express');
const hbs = require('hbs');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();


app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials')

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));

// Routes go here!

app.post('/', (req, res, next) => {
  axios.get(`http://api.elpais.com/ws/LoteriaNavidadPremiados?n=${req.body.number}`)
    .then(response => {
      const json = JSON.parse(response.data.split('=')[1])

      console.log(`NÚMERO: ${json.numero}`)
      console.log(`PREMIO: ${json.premio}`)
      
      res.render('result', {premio: json.premio})
    })
})



app.get('/', (req, res, next) => {
  res.render('index');
})

app.listen(PORT, () => {
  console.info(`App listen at ${PORT} port`);
});