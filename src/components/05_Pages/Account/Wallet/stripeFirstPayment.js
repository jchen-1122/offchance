
import React , {useEffect, useState, useContext} from 'react'
import GlobalState from '../../../globalState';

export function stripeFirstPayment(name, amount) {
    const {user, setUser} = useContext(GlobalState)
    const [sessionId, setSessionId] = useState(null)
    const data = require('../../../IP_ADDRESS.json');
    console.log('SAVING PAY')

    // Called everytime the URL starts to load in the webview
    useEffect(() => {
        async function onLoadStart() {
            let response = await fetch('http://' + data.ipAddress + '/user/oneTimeSave', {
                method: "POST",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: name, amount: amount})
            })
            let json = await response.json()
            setSessionId(json.session_id)
            // save user payment information
            let userResponse = await fetch('http://' + data.ipAddress + '/user/edit/' + user._id, {
                method: "PATCH",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({paymentInfo: json.customer})
            })
            // console.log(json.last4)
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
            stripe.redirectToCheckout({
                sessionId: '${sessionId}'
            }).then(function (result) {
                console.log(result)
            });
            })();
        </script>
        </body>
    </html>
    `;

}