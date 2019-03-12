var express = require('express');
var paypal = require('paypal-rest-sdk');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Data Industries' });
});

//Bill route
router.post('/bill', function(req, res, next){
  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:3080/success",
        "cancel_url": "http://localhost:3080/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "Software Item: 1",
                "sku": "001",
                "price": "500",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "500"
        },
        "description": "Machine Vision Packages"
    }]
};

paypal.payment.create(create_payment_json, function (error, payment) {
  if (error) {
      throw error;
  } else {
      console.log(payment);
      for(let i = 0;i < payment.links.length;i++){
        if(payment.links[i].rel === 'approval_url'){
          res.redirect(payment.links[i].href);
        }
      }
  }
});
});

//Sucess route
router.get('/sucess', function(req, res, next){
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
        "amount": {
            "currency": "USD",
            "total": "500"
        }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
        console.log(error.response);
        throw error;
    } else {
        console.log(JSON.stringify(payment));
        res.send('Success');
    }
});


});



/******************************/

//Bill route
router.post('/bill1', function(req, res, next){
  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:3040/success",
        "cancel_url": "http://localhost:3040/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "Software Item: 2",
                "sku": "001",
                "price": "845.89",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "845.89"
        },
        "description": "Data Mining and Visualization toolkit"
    }]
};

paypal.payment.create(create_payment_json, function (error, payment) {
  if (error) {
      throw error;
  } else {
      console.log(payment);
      for(let i = 0;i < payment.links.length;i++){
        if(payment.links[i].rel === 'approval_url'){
          res.redirect(payment.links[i].href);
        }
      }
  }
});
});

//Sucess route
router.get('/sucess1', function(req, res, next){
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
        "amount": {
            "currency": "USD",
            "total": "845.89"
        }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
        console.log(error.response);
        throw error;
    } else {
        console.log(JSON.stringify(payment));
        res.send('Success');
    }
});


});


router.get('/cancel', function(req, res, next){
  res.send('Cancelled');
});

  


module.exports = router;
