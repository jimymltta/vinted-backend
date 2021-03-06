// Express call and routers initialization
const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const router = express.Router();
// Stripe call and config
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/payment", async (req, res) => {
  console.log("Hello");
  try {
    // Receiving the token created in the front end by Stripe's API
    const stripeToken = req.fields.source;
    const price = req.fields.amount;
    const description = req.fields.description;
    const title = req.fields.title;
    const userToken = req.fields.userToken;
    // Create the transaction
    const response = await stripe.charges.create({
      amount: price * 100,
      currency: "eur",
      description: description,

      // Sending the token to Stripe
      source: stripeToken,
    });
    console.log("La réponse de Stripe ===>", response);
    if (response.status === "succeeded") {
      res.status(200).json({ message: "Paiement validé" });
      // TODO
      // Save the transaction in a MongoDB DB
    } else {
      res.status(400).json({ message: error.message });
    }

    res.json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Routers export
module.exports = router;
