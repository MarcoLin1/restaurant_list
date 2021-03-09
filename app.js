const express = require('express')
const port = 3000
const app = express()
const exhbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

// setting handlebars
app.engine('handlebars', exhbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static file
app.use(express.static('public'))

// home page and list restaurants via each function
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

// restaurant detailed information 
app.get('/restaurants/:id', (req, res) => {
  const restaurantDetail = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.id)
  res.render('show', { restaurant: restaurantDetail })
})

// search function
app.get('/search', (req, res) => {
  const restaurantSearchName = restaurantList.results.filter(restaurant => restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase()))
  res.render('index', { restaurants: restaurantSearchName, keyword: req.query.keyword })
})

// listening this server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})