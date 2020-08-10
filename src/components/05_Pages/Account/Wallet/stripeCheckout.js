
import React , {useEffect, useState} from 'react'

export function stripeCheckoutRedirectHTML(name, amount) {

  // TODO: this should come from some service/state store
  const [sessionId, setSessionId] = useState(null)
  const data = require('../../../IP_ADDRESS.json');

  // Called everytime the URL stats to load in the webview
  // useEffect(() => {
  //   async function onLoadStart() {
  //     let response = await fetch('http://' + data.ipAddress + '/user/secret', {
  //       method: "POST",
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({name: name, amount: amount})
  //     })
  //     let json = await response.json()
  //     console.log(json)
  //     setSessionId(json.session_id)
  //   }
  //   onLoadStart()
  // }, [])

    useEffect(() => {
    async function onLoadStart() {
      let response = await fetch('http://' + data.ipAddress + '/user/secrets')
      let json = await response.json()
      console.log(json.payment_intent.client_secret)
      setSessionId(json.payment_intent.client_secret)
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
          console.log("here")
          stripe.confirmCardPayment('${sessionId}', {
            payment_method: 'pm_1HEfY7EO217KAnwYZaMJCZOZ'
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
          console.log('here')
          // stripe.redirectToCheckout({
          //   sessionId: '${sessionId}'
          // }).then(function (result) {
          //   console.log(result)
          // });
        })();
      </script>
    </body>
  </html>
  `;

}