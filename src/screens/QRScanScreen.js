import React, {useEffect, useState} from 'react';
import {Alert, Dimensions, StyleSheet, ToastAndroid, View} from 'react-native';
import {FAB, Text, Button} from 'react-native-paper';
import { Camera } from 'expo-camera';
import {BarCodeScanner, BarCodeScannerResult} from 'expo-barcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';

const finderWidth = 280;
const finderHeight = 230;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const viewMinX = (width - finderWidth) / 2;
const viewMinY = (height - finderHeight) / 2;


export default function QRScanScreen( { navigation } ) {
    const isFocused = navigation.isFocused();
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(BarCodeScanner.Constants.Type.back);
    const [scanned, setScanned] = useState(false);
    const [flash, setFlash] = useState(false);
    const [isTorchOn, setIsTorchOn] = useState(false);
    async function handleTorchPress() {
        console.log("function called: ")
        try {
            Camera.Constants.FlashMode = "On";
            // await Torch.switchState(!isTorchOn);
            setIsTorchOn(!isTorchOn);
        } catch (e) {
            ToastAndroid.show(
                'We seem to have an issue accessing your torch',
                ToastAndroid.SHORT
            );
        }
      };

    useEffect(() => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
            // setIsFocused(navigation.isFocused());
            setScanned(false);
        })();
    }, []);

    const handleBarCodeScanned = (scanningResult= BarCodeScannerResult) => {
        console.log('scanned: ', scanned)
        if (!scanned) {
            const {type, data, bounds: {origin} = {}} = scanningResult;
            // @ts-ignore
            const {x, y} = origin;
            if (x >= viewMinX && y >= viewMinY && x <= (viewMinX + finderWidth / 2) && y <= (viewMinY + finderHeight / 2)) {
                setScanned(true);
                console.log('data:', data.split('http://qrweb.cyberimprintsolutions.com/QRData/')[1])
                if(data.includes('http://qrweb.cyberimprintsolutions.com/QRData/')){
                    navigation.navigate('QRScanResponseScreen', data.split('http://qrweb.cyberimprintsolutions.com/QRData/')[1])
                }else{
                    Alert.alert(` ${data}`);
                }
                
            }
        }
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        isFocused && (
        <>
         <View style={{flex: 1}}>
            <BarCodeScanner onBarCodeScanned={handleBarCodeScanned}
                type={type}
                barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                style={[StyleSheet.absoluteFillObject, styles.container]}>
                    <View><Text style={styles.heading}> Scan QR for Raksha Code </Text></View>
                <BarcodeMask edgeColor="#62B1F6" showAnimatedLine/>
                <View style={styles.row}>
                    {isTorchOn ? 
                    <FAB
                        icon="flash"
                        style={styles.qrIcon}   
                        color='#fff' 
                        fontSize='20'
                        fontWeight='bold'                    
                        onPress={() => handleTorchPress()}
                        uppercase={false}
                    />:
                    <FAB
                        icon="flash-off"
                        style={styles.qrIcon}   
                        color='#fff' 
                        fontSize='20'
                        fontWeight='bold'                    
                        onPress={() => handleTorchPress()}
                        uppercase={false}
                    />
                    }
                    <FAB
                        icon="close"
                        style={[styles.qrIcon, styles.red]}   
                        color='#fff' 
                        fontSize='20'
                        fontWeight='bold'                    
                        onPress={() => navigation.goBack()}
                        uppercase={false}
                    />
                </View>
                {scanned && <Button title="Scan Again" onPress={() => setScanned(false)}/>}
            </BarCodeScanner>
        </View>
        </>
        )
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: '#3983BE50'
    },
    red: {
        backgroundColor: '#e76f51'
    },
    qrIcon: {
        // flex: 1,
        color:'#fff',
        fontSize: 20,
        fontWeight: 'bold',
        position: 'relative',
        top: 150,
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: "#3983DF99",
        marginRight: 70,
        marginLeft: 70
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    heading: {
        fontSize: 25,
        position: 'relative',
        bottom: 200,
        color: 'white',
        flexWrap: 'wrap',
        margin: '20%',
        borderRadius: 20,
        textAlign: 'center',
        backgroundColor: '#3983BE50'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 16,
      },
});