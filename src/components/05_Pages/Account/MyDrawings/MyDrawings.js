import { WebView } from 'react-native-webview';
//import { stripeCheckoutRedirectHTML } from './stripeCheckout';
import React, {useState} from 'react'
import { View, ScrollView, Text, Image, Button, Dimensions, TouchableOpacity, } from 'react-native'
import BottomNav from '../../../02_Molecules/BottomNav/BottomNav'
import {utilities, fonts, colors} from '../../../../settings/all_settings';
import styles from './MyDrawings.styling'
import { set } from 'react-native-reanimated';
import { get_user } from '../../../fake_users/stub-users';
import Construction from '../../../04_Templates/Construction/Construction'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import AssetUtils from 'expo-asset-utils';
import * as Abuffer from 'base64-arraybuffer';
import * as Sharing from 'expo-sharing';

{/* Matt used this page to test image upload feel free to delete everything*/}

export default function MyDrawings({navigation}) {
    const [image, setImage] = useState(null)
    let [selectedImage, setSelectedImage] = React.useState(null);
    const AWS = require('aws-sdk');

    React.useEffect(() => {
        async function getPermissionAsync() {
            if (Constants.platform.ios) {
              const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
              if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
              }
            }
          }
        getPermissionAsync()
    }, [])

    const _pickImage = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.cancelled) {
            setImage(result.uri);
            setSelectedImage({ localUri: result.uri });
          }
          console.log(result);
        } catch (E) {
          console.log(E);
        }
      };

    AWS.config = new AWS.Config({
        accessKeyId: 'da62c56fb48940a7aada0c86062cf9a6',
        secretAccessKey: '34b18fbbeb724fe1e06a8e0d0210cd65f7f690db566eb1d6',
        endpoint: 's3.us-east.cloud-object-storage.appdomain.cloud',
        region: 'us-east-standard'
    });

    const cosClient = new AWS.S3();

    {/* DOES NOT WORK, NEED TO CONVERT IMAGE TO BASE64 AND UPLOAD. */}
    {/* OR WHATEVER BETTER METHOD IS FOUND. */}
    {/* UNCOMMENT THE LINE IN RETURN WHEN SOLVED */}

    const _uploadImage = async () => {

        const asset = await AssetUtils.base64forImageUriAsync(image);
        const arrayBuffer = Abuffer.decode(asset.data);
        let contentType = 'image/jpeg';
        let name = Math.round((new Date()).getTime() / 1000) + '.jpeg';
        console.log(name)

        return cosClient.putObject({
            Bucket: 'oc-mobile-images',
            Key: name,
            Body: arrayBuffer,
            ContentType: contentType
        }).promise()
        .then(() => {
            console.log(`Item: testupload created!`);
        })
        .catch((e) => {
            console.error(`ERROR: ${e.code} - ${e.message}\n`);
        })
    };

    let openShareDialogAsync = async () => {
        if (!(await Sharing.isAvailableAsync())) {
           alert(`Uh oh, sharing isn't available on your platform`);
           return;
        }
        await Sharing.shareAsync(selectedImage.localUri);
    };

    return (
        <View style={utilities.container}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button title="Pick an image from camera roll" onPress={async () => {_pickImage()}} />
                {image && <Button title="Upload image to IBM Cloud" onPress={async () => {_uploadImage()}} /> }
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                {image && <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
                              <Text style={styles.buttonText}>Share this photo</Text>
                          </TouchableOpacity>}
            </View>
            <BottomNav navigation={navigation} active={'Account'}></BottomNav>
        </View>
    )

    }