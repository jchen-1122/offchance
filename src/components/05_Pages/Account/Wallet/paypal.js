import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import WebView from 'react-native-webview'

export default class MyDrawings extends React.Component {
    state = {
        showModal: false,
        status: "Pending"
    };
    handleResponse = data => {
        if (data.title === "success") {
            this.setState({ showModal: false, status: "Complete" });
        } else if (data.title === "cancel") {
            this.setState({ showModal: false, status: "Cancelled" });
        } else {
            return;
        }
    }; 
    render() {
        var ip = require('../../../IP_ADDRESS.json')
        return (
            <View style={{ marginTop: 100 }}>
                <Modal
                    visible={true}                >
                    <WebView
                        source={{ uri: "http://" + ip.ipAddress + "/user/paypal/5/10" }}
                        injectedJavaScript={`document.f1.submit()`}
                    />
                </Modal>
            </View>
        );
    }
}