
import React , {useEffect, useState} from 'react'

/**
 * Create the Stripe Checkout redirect html code for a given user
 * @param {String} userID
 * @returns {String}
 */
export function stripeCheckoutRedirectHTML(name, amount) {

  // TODO: this should come from some service/state store
  const [sessionId, setSessionId] = useState(null)

  // Called everytime the URL stats to load in the webview
  useEffect(() => {
    onLoadStart = async () => {
      let response = await fetch('http://192.168.0.27:3000/user/secret', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: name, amount: amount})
      })
      let json = await response.json()
      console.log(json)
      setSessionId(json.session_id)
    };
    onLoadStart()
  }, [])


  return `
  <html>
    <body>
      <script src="https://js.stripe.com/v3"></script>
      <script>
        (function () {
          var stripe = Stripe('pk_test_51HCrjPEO217KAnwYZO41o5PPaB821HBne0B2G3y0qH3anU0YWDWcDlaAobQeBlYo49MTOGa8TLGcnK0G3tWsp3Xa00oGSO0iqF');
          stripe.redirectToCheckout({
            sessionId: '${sessionId}',
          }).then(function (result) {
            console.log(result)
          });
        })();
      </script>
    </body>
  </html>
  `;
}