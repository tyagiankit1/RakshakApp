import  React, { useState, useEffect, useContext } from 'react';
const axios = require('axios');
const qs = require('qs');
import { StyleSheet, View, ImageBackground, Image  } from 'react-native';
import call from 'react-native-phone-call';
import { Appbar, Button, RadioButton, Checkbox, Snackbar, Text, ActivityIndicator, IconButton, Caption,  Avatar, Card, TextInput, Headline, Title, Subheading, Divider, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';
import { color } from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';
// import type { StackNavigationProp } from '@react-navigation/stack';
import ScreenWrapper from '../ScreenWrapper';
import {UsersContext } from '../context/UsersContext';
import { fieldValidator } from '../helpers/fieldValidator';
import * as Location from 'expo-location';

import CameraScreen from './CameraScreen';

export default function QRScanResponseScreen({navigation}) {
    const [ownerContact, setOwnerContact] = React.useState('');
    const [otherContacts, setOtherContacts] = React.useState({});
    const [scanedVehical, setScanedVehical] = React.useState({});
    const [detailsFetched, setDetailsFetched] = React.useState(false);

    const [clickOption, setClickOption] = React.useState('');
    const [emergencyCall, setEmergencyCall] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [numberPlate, setNumberPlate] = React.useState({ value: '', error: '' })
    const [visibleMsg, setVisibleMsg] = React.useState(false);
    const [visibleWhatsApp, setVisibleWhatsApp] = React.useState(false);
    const [visibleEmergencyContact, setVisibleEmergencyContact] = React.useState(false);

    const showEmergencyDialog = () => setVisibleEmergencyContact(true);
    const hideEmergencyDialog = () => setVisibleEmergencyContact(false);
    // const showMsgDialog = () =>   
    const hideMsgDialog = () => setVisibleMsg(false);
    const hideWhatsAppDialog = () => setVisibleWhatsApp(false);

    const [visibleSnackBar, setVisibleSnackBar] = React.useState(false);
    const onDismissSnackBar = () => setVisibleSnackBar(false);

    const [whatsAppStatus, setWhatsAppStatus] = React.useState(false);
    const [capturedImage, setCapturedImage] = React.useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [locationStatus, setLocationStatus] = React.useState(false);
    const [locationChecked, setLocationChecked] = React.useState(false);

    const msgSelected = () => {
      setClickOption('message');
      setVisibleMsg(true);
    }

    const callSelected = () => {
      setClickOption('call');
      setVisibleMsg(true);
    }

    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setLocationErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getLastKnownPositionAsync({
          accuracy: 1,
        });
        console.log("location: ", location);
        setCurrentLocation(location.coords);
        
      })();
    }, []);

    useEffect(() => {
      setTimeout(() => { 
      var data = JSON.stringify({
        "qr_code": navigation.state.params
      });
      let devURL = 'http://192.168.1.4:8080/api/getVehicleDetailsByQR';
      let prodURL = 'http://rakshaksvc.cyberimprintsolutions.com/api/getVehicleDetailsByQR';
      var config = {
        method: 'post',
        url: prodURL,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {      
        if(response.data.length !== 0){
          setDetailsFetched(true);
          setScanedVehical(response.data[0]);
          setOwnerContact(JSON.parse(response.data[0]['primary_contacts'])['ownerContact']);
          setOtherContacts(JSON.parse(response.data[0]['primary_contacts']))
          
          
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }, 3000); 
    }, [detailsFetched])

    const callOwner = () => {
      const numberPlateError = fieldValidator(numberPlate.value)
      if(numberPlateError){
        setNumberPlate({ ...numberPlate, error: numberPlateError })
      }
      if(!numberPlateError){
        const args = {
          number: ownerContact,
          prompt: true,
        };
        // Make a call
        call(args).catch(console.error);
      }
    }

    const callEmergency = () => {
        const args = {
          number: emergencyCall,
          prompt: true,
        };
        // Make a call
        call(args).catch(console.error);
      
    }
    
    const sendMessage = () => {
      const numberPlateError = fieldValidator(numberPlate.value)

      if(numberPlateError){
        setNumberPlate({ ...numberPlate, error: numberPlateError })
      }
      console.log('ownerContact: ', ownerContact)
      if(!numberPlateError){
        let messageBody = "Hi, "+scanedVehical.owner_name+ " a user from Rakshak code reported that "+ message +" The plate number of your vehicle is "+ numberPlate.value +" - adsxenium";
        // let contact = 
        var data = qs.stringify({
          'data': '{\n"FORMAT":"1",\n"USERNAME":"xenium",\n"PASSWORD":"dwhx2346DW",\n"SENDERID":"ADSXEN",\n"TEXTTYPE":"TEXT",\n"EntityID":"1701162816759889599",\n"TemplateID":"1707163185943480571",\n"SMSTEXT":"'+messageBody+'",\n"MOBLIST":["'+ownerContact+'"]\n}' 
        });
        
        var config = {
          method: 'post',
          url: 'http://182.18.144.182/Api/smsapi/JsonPost',
          headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data : data
        };
        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          setVisibleSnackBar(!visibleSnackBar);  
          setVisibleMsg(false);

        })
        .catch(function (error) {
          console.log(error);
        });

      }
    }

    const sendWhatAppMessage = () => {
      const numberPlateError = fieldValidator(numberPlate.value)

      if(numberPlateError){
        setNumberPlate({ ...numberPlate, error: numberPlateError })
      }
      console.log('ownerContact: ', ownerContact)
      if(!numberPlateError){
        let payload = {
          "body": "Hi "+scanedVehical.owner_name+ ", A user from Rakshak code reported that "+ message +" The plate number of your vehicle is "+ numberPlate.value +" - Team Rakshak Code ",
          "phone": '91'+ownerContact
        }
        whatsAppTextRequest(payload);
        
        if(capturedImage !== null){
          let payload = {
            "body": capturedImage,
            "filename": "RakshakCode.jpg",
            "phone": '91'+ownerContact
          }
          whatsAppImageRequest(payload);
        }

        if(locationChecked){
          let payload = {
            "phone": '91'+ownerContact,
            "lat": currentLocation.latitude,
            "lng": currentLocation.longitude,
            "address": ""
          }
          console.log('payload: ', payload);
          whatsAppLocationRequest(payload);
        }


        setVisibleSnackBar(!visibleSnackBar);  
        setVisibleWhatsApp(false);
      }

    }

    function whatsAppTextRequest(payload){
      var config = {
        method: 'post',
        url: 'https://api.chat-api.com/instance343707/sendMessage?token=eek7jyalwn6nlvt3',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : payload
      };
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        

      })
      .catch(function (error) {
        console.log(error);
      });
    }
    function whatsAppImageRequest(payload){
      var config = {
        method: 'post',
        url: 'https://api.chat-api.com/instance343707/sendFile?token=eek7jyalwn6nlvt3',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : payload
      };
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setVisibleSnackBar(!visibleSnackBar);  
        setVisibleWhatsApp(false);

      })
      .catch(function (error) {
        console.log(error);
      });
    }
    function whatsAppLocationRequest(payload){
      var config = {
        method: 'post',
        url: 'https://api.chat-api.com/instance343707/sendLocation?token=eek7jyalwn6nlvt3',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : payload
      };
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setVisibleSnackBar(!visibleSnackBar);  
        setVisibleWhatsApp(false);

      })
      .catch(function (error) {
        console.log(error);
      });
    }

    const getPicture = (picture) => { // the callback. Use a better name
      setCapturedImage('data:image/jpeg;base64,'+picture.base64)
      setWhatsAppStatus(false);
    };


  return (
      <>
      {
        !whatsAppStatus ? 
          <Appbar.Header
            style={{ backgroundColor: '#5E93F1', color: '#fff'}}
            theme={{
            mode: 'adaptive',
            }}
          >
            <Appbar.BackAction color='#fff' onPress={() => navigation.navigate('BottomNavigation')} />
            <Appbar.Content style={{ color: '#fff'}} color="#fff"
            title= 'QR Details'
            />
        {/* <Appbar.Action icon="qrcode-scan" color='#fff' onPress={() => navigation.navigate('QRScanScreen')} /> */}
        </Appbar.Header>
        : <></>
      }
      

  {!whatsAppStatus ? 
    <ScreenWrapper
        style={{backgroundColor: '#fff'}}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps={'always'}
        removeClippedSubviews={false}
    >
    {!detailsFetched ?
    <View style={styles.container}>
      <View style={styles.senderRow}>
        <Image source={require('../assets/Hourglass.gif')} style={styles.hourGlass} />
      </View>
      </View>
    // <ActivityIndicator animating={true}  />
    :
    
      <Card style={[styles.serviceCard, {marginTop: 20, backgroundColor: '#fff'}]} mode='elevated'>
        <Card.Content>
          <View style={styles.row}>
            <Avatar.Icon style={{backgroundColor: '#3f48cc'}} icon={scanedVehical.veh_type === "4 wheeler" ? "car" : "motorbike"} />
          </View>
          <View style={styles.row}>
            <Subheading>This vehicle belongs to &nbsp;</Subheading><Subheading style={{color: '#3f48cc', textTransform: 'uppercase'}}>{scanedVehical.owner_name}</Subheading>
          </View>
        <Divider />
        
        <View style={{marginTop: 20}}>
        <Title>Message options to send to vehicle Owner.</Title>
          <RadioButton.Group onValueChange={value => setMessage(value)} value={message}>
            <RadioButton.Item label="1) Vehicle is in No Parking OR Wrong Parking." value="your Vehicle is in No Parking OR Wrong Parking" />
            <RadioButton.Item label="2) Your vehicle is being towed away." value="your vehicle is being towed away." />
            <RadioButton.Item label="3) Your vehicle is Not Locked Parking OR Light in ON." value="your vehicle is Not Locked Parking OR Light in ON." />
            <RadioButton.Item label="4) Something is wrong with your vehicle." value="something is wrong with your vehicle." />
          </RadioButton.Group>
          
        </View>
        <Divider />

        <View style={styles.senderRow}>
          <IconButton size={45} color='#BA1200' icon="message-text" onPress={msgSelected} />
          <IconButton size={45} color='#39A554'  icon="whatsapp" onPress={() => setVisibleWhatsApp(true)} />
          <IconButton size={45} color='#094971'  icon="phone" onPress={callSelected} />
        </View>
        <View style={styles.row}>
          <Button icon='phone' labelStyle={{fontSize: 20}} color='red' mode='outlined' onPress={showEmergencyDialog}>Emergency</Button>
        </View>
        </Card.Content>
        
      </Card>
    }

      <Portal>
        <Dialog visible={visibleEmergencyContact} onDismiss={hideEmergencyDialog}>
          <Dialog.Title> Contact options</Dialog.Title>
          <Dialog.Content>
            <RadioButton.Group onValueChange={value => setEmergencyCall(value)} value={emergencyCall}>

              {Object.keys(otherContacts).map((key, i) => (
              <View key={i} style={styles.contactRow}>
                {key !== "" && key !== "ownerContact" ?
                    <RadioButton.Item label={key} value={otherContacts[key]} />                  
                :<Text></Text>}
                
              </View>
              
              ))}

            </RadioButton.Group>
          </Dialog.Content>
          <Dialog.Actions>
            <Button color="red" onPress={hideEmergencyDialog}>Cancle</Button>
            <Button onPress={callEmergency}>Call</Button>            
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Portal>
        <Dialog visible={visibleMsg} onDismiss={hideMsgDialog}>
          <Dialog.Title>{message === "" ? "Alert" : "Confirmation"}</Dialog.Title>
          <Dialog.Content>
            {(message === ""   && clickOption !== 'call' )? 
            <Paragraph>Please select a message reason first.</Paragraph>
            :
            <View>
              <Subheading>Vehicle Plate No.</Subheading>
              <TextInput
                mode="outlined"
                label="Eg: 'UP15 DD 7321'"
                value={numberPlate.value}
                error={!!numberPlate.error}
                autoCapitalize="characters"
                onChangeText={(text) => setNumberPlate({ value: text, error: '' })}
                style={{backgroundColor: '#fff', width: '90%', marginLeft: 15, textTransform: 'capitalize'}}
              />
              {/* <HelperText type="error" visible={hasErrors()}>
                Vehicle Plate No. does not match with the QR Vehicle plate. 
              </HelperText> */}
            </View>
            }
            
          </Dialog.Content>
          <Dialog.Actions>
            {(message === ""  && clickOption !== 'call') ? 
            <Button onPress={hideMsgDialog}>Done</Button>
            :
            <>
            <Button color="red" onPress={hideMsgDialog}>Cancle</Button>
            {clickOption === 'call' ? <Button onPress={callOwner}>Call</Button> : <Button onPress={sendMessage}>Send</Button> }
            
            </>
          }
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Portal>
        <Dialog visible={visibleWhatsApp} onDismiss={hideWhatsAppDialog}>
          <Dialog.Title>{message === "" ? "Alert" : "Confirmation"}</Dialog.Title>
          <Dialog.Content>
            {(message === "" )? 
            <Paragraph>Please select a message reason first.</Paragraph>
            :
            <>
            <View>
              <Subheading>Vehicle Plate No.</Subheading>
              <TextInput
                mode="outlined"
                label="Eg: 'UP15DD7321'"
                value={numberPlate.value}
                error={!!numberPlate.error}
                autoCapitalize="characters"
                onChangeText={(text) => setNumberPlate({ value: text, error: '' })}
                style={{backgroundColor: '#fff', width: '90%', marginLeft: 15, textTransform: 'capitalize'}}
              />
            </View>
            <Divider />
            <View style={styles.row}>
              <Button icon="camera" mode="text" labelStyle={{textAlign: 'left'}} style={styles.logoutBtn} color='#39A554' onPress={() => setWhatsAppStatus(true)}>
                Add Picture
              </Button>
              {capturedImage !== null ? <Avatar.Image size={24} source={{uri: capturedImage}} />
              : <></>}
            </View>
            <View style={styles.row}>
              <Checkbox.Item 
                label="Add Location"
                status={locationChecked ? 'checked' : 'unchecked'}
                onPress={() => {
                  setLocationChecked(!locationChecked);
                }}
              />
            </View>
            {/* <Button icon="map-marker-radius-outline" labelStyle={{textAlign: 'left'}} style={styles.logoutBtn} color='#E05124' compact='true' mode="text" onPress={addLocation}>
              Add Location
            </Button> */}
            </>   
            }
            
          </Dialog.Content>
          <Dialog.Actions>
            {(message === "") ? 
            <Button onPress={hideWhatsAppDialog}>Okay</Button>
            :
            <>
            <Button color="red" onPress={hideWhatsAppDialog}>Cancle</Button>
            <Button onPress={sendWhatAppMessage}>Send</Button>
            
            </>
          }
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Snackbar
        visible={visibleSnackBar}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Undo',
          onPress: () => {
            // Do something
          },
        }}>
          Message sent Successfully.
      </Snackbar>
    </ScreenWrapper>
    :
        <CameraScreen whatsAppStatus={whatsAppStatus} setWhatsAppStatus={setWhatsAppStatus} getPicture={getPicture}  />
    }
    </>
  );
}

const styles = StyleSheet.create({
  logoutBtn: {
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
    flexDirection: 'row',
    textAlign: 'right',
  },
  hourGlass: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingVertical: 8,
    // paddingHorizontal: 16,
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
  senderRow: {
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
  container: {
    flex: 1,
    width: '100%',
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});