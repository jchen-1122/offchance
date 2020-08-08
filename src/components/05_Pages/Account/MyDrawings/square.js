import React, {Component} from 'react'
import {View, Button} from 'react-native'
// import Square from 'react-native-square-in-app-payments';

export default class MyDrawings extends Component {

    constructor() {
        super();
        // bind 'this' to the methods' context
        this.onStartCardEntry = this.onStartCardEntry.bind(this);
        this.onCardNonceRequestSuccess = this.onCardNonceRequestSuccess.bind(this);
    }

    onCardEntryComplete() {
        // Update UI to notify user that the payment flow is completed
    }

    /**
     * Callback when successfully get the card nonce details for processig
     * card entry is still open and waiting for processing card nonce details
     * @param {*} cardDetails
     */
    async onCardNonceRequestSuccess(cardDetails) {
        try {
        // take payment with the card details
        // await chargeCard(cardDetails);

        // payment finished successfully
        // you must call this method to close card entry
        await SQIPCardEntry.completeCardEntry(
            this.onCardEntryComplete(),
        );
        } catch (ex) {
        // payment failed to complete due to error
        // notify card entry to show processing error
        await SQIPCardEntry.showCardNonceProcessingError(ex.message);
        }
    }

    
    onCardEntryCancel() {
        // Handle the cancel callback
    }
    
    /**
     * An event listener to start card entry flow
     */
    async onStartCardEntry() {
        const cardEntryConfig = {
        collectPostalCode: false,
        };
        await SQIPCardEntry.startCardEntryFlow(
        cardEntryConfig,
        this.onCardNonceRequestSuccess,
        this.onCardEntryCancel,
        );
    }
    
    async componentDidMount() {
        await SQIPCore.setSquareApplicationId('sandbox-sq0idb-hk5shEdLLlpfXesZxq9y_A');
        if (Platform.OS === 'ios') {
            await SQIPCardEntry.setIOSCardEntryTheme({
            saveButtonFont: {
                size: 25,
            },
            saveButtonTitle: 'Pay 💳 ',
            keyboardAppearance: 'Light',
            saveButtonTextColor: {
                r: 255,
                g: 0,
                b: 125,
                a: 0.5,
            },
            });
        }
    }

    render() {
        return (
          <View>
            <Button
              onPress={this.onStartCardEntry}
              title="Start Card Entry"
            />
          </View>
        );
    }
    
}