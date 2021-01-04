const stripe = require('stripe')('sk_test_51HE50nG2xqbzZFHUCvvpWez8yRRxdxUzKd6Nxl5oZrY6tJBGxsPRsTPZw6efeJRyAYPjsPEszbg2WRKO1AJIAats007VSZVbNY');


async function createCustomer (req, res) {
    console.log('create customer function');
    const customer = await stripe.customers.create({
        name: req.body.name,
        email: req.body.email,
        tax_exempt: 'exempt'
      })
      .then(user =>{ 
          console.log(user);
          return user;
        })
      .catch(error => console.log('error', error))
}

async function createCard(req, res){
    const card = await stripe.customers.createSource(
        req.body.customer_id,
        {source: {
            number: req.body.number,
            exp_month: req.body.exp_month,
            exp_year: req.body.exp_year,
            cvc: req.body.cvc,
            currency: 'usd',
            name: req.body.name
        }}
      );
}

async function createSubscription (req, res) {
    console.log('create subscription function');
    const customer = await stripe.subscriptions.create({
        customer: req.body.customer_id,
        items: [{price: req.body.price_id}],
      })
      .then(subscription => res.json(subscription))
      .catch(error => res.json(error))
}

async function createProduct (req, res) {
    const price = await stripe.products.create({
        name: req.body.name,
      });
}

async function createPrice (req, res) {
    const price = await stripe.prices.create({
        unit_amount: req.body.price,
        nickname: req.body.description,
        currency: 'usd',
        recurring: {interval: req.body.recurring}, //month for plans, unit for others
        product: req.body.product_id
      });
}
module.exports = {createCustomer, createCard, createSubscription, createProduct, createPrice}
//module.exports = createCustomer;
