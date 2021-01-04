const express = require('express');
const path = require('path');
const { createCustomer, createCard, createSubscription, createProduct, createPrice} = require('./stripe');
const { create } = require('domain');
require('dotenv').config();

//middleware morgan

const app = express();
const router = express.Router()
const port = process.env.PORT || 5000;
app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
  })
  app.use(express.json())
  app.use('/api', router)
  app.use(express.static(path.join(__dirname, '../build')))

router.get('/stripe/createCustomer', createCustomer)
router.get('/stripe/createCard', createCard)
router.get('/stripe/createSubscription', createSubscription)
router.get('/stripe/createProduct', createProduct)
router.get('/stripe/createPrice', createPrice)

router.all('*', (_, res) =>
  res.json({ message: 'please make a POST request' })
)

 /*  app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, '../build/index.html'))
  }) */
  
  app.listen(port, () => console.log(`server running on port ${port}`))