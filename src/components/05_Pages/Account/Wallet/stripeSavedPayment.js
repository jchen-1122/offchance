
import React , {useEffect, useState, useContext} from 'react'
import GlobalState from '../../../globalState';

export function stripeSavedPayment(amount) {

  const {user, setUser} = useContext(GlobalState)
  const [intent, setIntent] = useState(null)
  const [card, setCard] = useState(null)
  const data = require('../../../IP_ADDRESS.json');

  useEffect(() => {
    async function onLoadStart() {
        //console.log('here')
        let response = await fetch('https://8f5d9a32.us-south.apigw.appdomain.cloud/users/autopay', {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({amount: amount, customer: user.paymentInfo})
          })
      let json = await response.json()
      setIntent(json.payment_intent.client_secret)
      setCard(json.payment_id)
      //console.log(json.payment_intent.client_secret)
      //console.log(json.payment_id)
    }
    onLoadStart()
  }, [])


  return `
  <html>
    <body>
      <script src="https://js.stripe.com/v3"></script>
      <script>
        (function () {
          var stripe = Stripe('pk_test_51HCrjPEO217KAnwYZO41o5PPaB821HBne0B2G3y0qH3anU0YWDWcDlaAobQeBlYo49MTOGa8TLGcnK0G3tWsp3Xa00oGSO0iqF');
          stripe.confirmCardPayment('${intent}', {
            payment_method: '${card}'
          }).then(function(result) {
            if (result.error) {
              // Show error to your customer
              console.log(result.error.message);
            } else {
              if (result.paymentIntent.status === 'succeeded') {
                // Show a success message to your customer
                // There's a risk of the customer closing the window before callback execution
                // Set up a webhook or plugin to listen for the payment_intent.succeeded event
                // to save the card to a Customer
          
                // The PaymentMethod ID can be found on result.paymentIntent.payment_method
              }
            }
          });
        })();
      </script>
    </body>
  </html>
  `;

}