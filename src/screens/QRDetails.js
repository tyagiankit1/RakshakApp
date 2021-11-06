import  React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Pressable, Image, ToastAndroid   } from 'react-native';
import { Appbar, Text, IconButton, Caption,  Avatar, Card, TextInput, Headline, Title, Subheading, Divider, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

import { color } from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';
// import type { StackNavigationProp } from '@react-navigation/stack';
import ScreenWrapper from '../ScreenWrapper';


export default function QRDetails({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
    const [qrDetails, setQrDetails] = React.useState(navigation.state.params);
    // const [ownerContact, setOwnerContact] = React.useState(JSON.parse(navigation.state.params['primary_contacts'])['ownerContact']);
    const [otherContacts] = React.useState([]);


    useEffect(() => {
      (async () => {
          const {status} = await MediaLibrary.requestPermissionsAsync();
          setHasPermission(status === 'granted');
      })();
  }, []);

  // useEffect(() => {
  //       const {status} = await MediaLibrary.requestPermissionsAsync();
  //       setHasPermission(status === 'granted');
    
  // }, []);

    const callback = downloadProgress => {
      const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
      this.setState({
        downloadProgress: progress,
      });
    };
   
    // const downloadQR = async() => {
    //   try {
    //     if (hasPermission === false) {
    //         ToastAndroid.show(
    //           "It seems you don't have permission to save the file.",
    //           ToastAndroid.SHORT
    //         );
    //     } else {
    //       const data = qrDetails.qr_img;
    //       const base64Code = data.split("data:image/png;base64,")[1];

    //       const filename = FileSystem.documentDirectory + "RakshaCodeQR-"+qrDetails.rc_number+".png";
    //       await FileSystem.writeAsStringAsync(filename, base64Code, {
    //         encoding: FileSystem.EncodingType.Base64,
    //       });

    //       const mediaResult = await MediaLibrary.saveToLibraryAsync(filename);
    //       ToastAndroid.show(
    //         "QR code downloaded successfully.",
    //         ToastAndroid.SHORT
    //       );
    //       console.log('Finished downloading to ', mediaResult);
    //     }
    //   } catch (e) {
    //     console.error(e);
    //   }
    // }

  return (
  <>
    <Appbar.Header
    style={{ backgroundColor: '#5E93F1', color: '#fff'}}
    theme={{
      mode: 'adaptive',
    }}
  >
    <Appbar.BackAction color='#fff' onPress={() => navigation.goBack()} />
    <Appbar.Content style={{ color: '#fff'}} color="#fff"
      title= 'QR Details'
    />
    <Appbar.Action icon="qrcode-scan" color='#fff' onPress={() => navigation.navigate('QRScanScreen')} />
  </Appbar.Header>
    <ScreenWrapper style={{backgroundColor: '#fff'}} >
    
    <Card style={{backgroundColor: '#fff'}}>
      <Card.Title
        right={(props) => <Caption style={{color: '#fff', padding: 5, paddingBottom: 2, paddingTop: 2, borderRadius: 10, marginRight: 20, backgroundColor:'#0ed145'}} >{qrDetails.qrStatus}</Caption>}
      />
      <Card.Content>
        <View style={styles.row}>
          <Image  style={{width: 200, height: 200, resizeMode: 'contain'}}  source={{uri: qrDetails.image}}/>
          {/* <IconButton style={{position: 'absolute', bottom: 10, right: 100, fontSize: 24, backgroundColor: '#5E93F1'}} color='#fff' icon="download-outline" onPress={downloadQR} /> */}
        </View>
        {/* <View style={styles.row}>
          <Headline>{qrDetails.owner_name}</Headline>
        </View>
        <View style={styles.row}>
          <Subheading>{qrDetails.rc_number}</Subheading>
        </View> */}
        <View style={styles.row}>
          <Subheading>{qrDetails.primaryContact}</Subheading>
        </View>
        <Divider style={{marginTop: 10}} />



        <Title style={{color: '#3f48cc', margin: 10}}>Other Contacts</Title>
       
        {
          Object.keys(otherContacts).map((key, i) => (
              <View key={i} style={styles.contactRow}>
                {key !== "" && key !== "ownerContact" ?
                <>
                  <Subheading style={{marginRight: 50, textAlign: 'left'}}>{key}</Subheading>
                  <Caption>{otherContacts[key]}</Caption>
                </>
                :<Text></Text>}
                
              </View>
              
          ))
        }
        
        
      </Card.Content>
    </Card>


     
    </ScreenWrapper>
    </>
  );
}

const styles = StyleSheet.create({
    vehType: {
      marginTop: 20,
      marginLeft: 30,
      backgroundColor: '#3f48cc', 
      width: '25%', 
      textAlign: 'center', 
      color: '#fff', 
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      fontSize: 16
    },
    registerQR: {
        // marginTop: 20,
        marginLeft: 30,
        backgroundColor: '#3f48cc', 
        width: '85%', 
        textAlign: 'center', 
        color: '#fff', 
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        fontSize: 20,
        padding: 1
    },
    registerQRText: {
        textAlign: 'center', 
        color: '#fff', 
        fontSize: 20,
        marginLeft: 30,
    },
    addVehical: {
      margin: 5,
      borderStyle: 'dashed',
      borderRadius: 1,
      borderWidth: 1,
      borderColor: 'grey',
      height: 100,
      display: 'flex', 
      justifyContent: 'center',
      color: 'grey',
      fontWeight: 'bold',
      textTransform: 'capitalize',
      backgroundColor: '#fff'
    },
    serviceIcon: {
      width: 60,
      margin: 5,
      marginLeft: 20
    },
    serviceBlock: {
      // flexDirection:'row',
      flex: 1,
      flexWrap: 'wrap',
      width: 100,
      // color: '#fff',
      textAlign: 'center'
    },
    caption: {
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      // paddingVertical: 8,
      // paddingHorizontal: 16,
    },
    contactRow:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    button: {
      margin: 4,
    },
    heading: {
      color: '#000',
      textAlign: 'left',
      fontSize: 20,
      fontWeight: 'bold'
    },
    serviceCard: {
      // marginTop: 20,
      marginLeft: 20,
      marginRight: 20,
      backgroundColor: '#fff'
    },
    centerAlign: {
      textAlign: 'center',
    },
    leftAlign: {
      textAlign: 'left',
    },
    rightAlign: {
      textAlign: 'right',
    },
  });