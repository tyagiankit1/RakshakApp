import  React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button, TextInput, Snackbar, Card, IconButton } from 'react-native-paper';
import { useSafeArea } from 'react-native-safe-area-context';

import Background from '../components/Background';
import Logo from '../components/Logo'; 
import Paragraph from '../components/Paragraph';
import { contactValidator } from '../helpers/contactValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import ScreenWrapper from '../ScreenWrapper';
import {UsersContext } from '../context/UsersContext'

import { sendOtp, getUserData, getUserVehicle, getUserQR } from '../services/UserServices';

var axios = require('axios');
const qs = require('qs');

const TextInputAvoidingView = ({ children }) => {
  return Platform.OS === 'ios' ? (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior="padding"
      keyboardVerticalOffset={80}
    >
      {children}
    </KeyboardAvoidingView>
  ) : (
    <>{children}</>
  );
};

export default function Login({ navigation }) {
  const usersContext = useContext(UsersContext)
  const { users, addNewUser, vehicle, addNewVehicle, addNewQRDetails } = usersContext;
  // const addUser = user => dispatch(addUser(user));

  const [contact, setContact] = useState({ value: '', error: '' })
  const [otpGenerated, setOtpGenerated] = useState(false)
  const [otp, setOTP] = useState({ value: '', error: '' })
  const [generatedOTP, setGeneratedOTP] = useState('');

  const [visibleSnackBar, setVisibleSnackBar] = React.useState(false);
  const onDismissSnackBar = () => setVisibleSnackBar(false);

  function generateOTP() {
    const contactError = contactValidator(contact.value);
    if (contactError) {
      setContact({ ...contact, error: contactError });
    }
    let random = Math.floor(Math.random() * 90000) + 10000;
    
    let messageBody = "Your OTP to Register/Access Raksha Code App is "+random+". -- Team Raksha Code adsxenium";
    var payload = qs.stringify({
      'data': '{\n"FORMAT":"1",\n"USERNAME":"xenium",\n"PASSWORD":"dwhx2346DW",\n"SENDERID":"ADSXEN",\n"TEXTTYPE":"TEXT",\n"EntityID":"1701162816759889599",\n"TemplateID":"1707163211634450387",\n"SMSTEXT":"'+messageBody+'",\n"MOBLIST":["'+contact.value+'"]\n}' 
    });

    sendOtp(payload).then(( data ) => {
      console.log("response: ", data);
      setVisibleSnackBar(!visibleSnackBar); 
      setOtpGenerated(true);
      setGeneratedOTP(random);
    })
  }

  function onLoginPressed() {  
    const otpError = passwordValidator(otp.value)
    if(otpError){
      setOTP({ ...otp, error: otpError })
    }
    if ( !otpError && (otp.value.toString() === generatedOTP.toString())) {
      var payload = {
        "contact": contact.value
      };

      getUserData(payload).then(( data ) => {
        console.log("response: ", data);
        if(data.length === 0){
          navigation.navigate('RegisterScreen', contact.value);
        }else {
          console.log("users: ", data)
          addNewUser(data[0]);
          addVehicleDetails(data[0].userID);
          addQRDetails(data[0].userID);
          navigation.navigate('BottomNavigation', data[0]);
        }
      })
    }
  }


  function addVehicleDetails(userID){
    var payload = {
      "userID": userID
    };
    getUserVehicle(payload).then(( data ) => {
      for(let i=0; i< data.length; i++){
        addNewVehicle(data[i]);
      }        
    })
  }

  function addQRDetails(userID){
    var payload = {
      "userID": userID
    };
    getUserQR(payload).then(( data ) => {
      for(let i=0; i< data.length; i++){
        addNewQRDetails(data[i]);
      }        
    })
  }

  return (
      <ScreenWrapper
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps={'always'}
        removeClippedSubviews={false}
        style={{width: '100%'}}
      >
      <Card style={styles.loginCard} mode='elevated'>
      <Card.Content>
      <View style={styles.row}><Logo /></View>
      <View style={styles.row}>
        <TextInput
            mode="outlined"
            keyboardType='numeric'
            theme={{roundness: 25,}}
            label="Contact Number"
            disabled={otpGenerated}
            value={contact.value}
            onChangeText={(number) => setContact({ value: number, error: '' })}
            error={!!contact.error}
            maxLength={10} 
            style={{width: '100%', marginBottom: 15}}
        />
        {!otpGenerated ? <Paragraph></Paragraph> :
        <IconButton color='grey' icon="pencil" style={{position: 'absolute', right: 10, marginBottom: 10}} onPress={() => setOtpGenerated(false)} />}
      </View>
      {
        !otpGenerated ? <Paragraph></Paragraph> :
        <View style={styles.row}>
        <TextInput
            mode="outlined"
            keyboardType='numeric'
            theme={{roundness: 25,}}
            label="OTP"
            value={otp.value}
            maxLength={5} 
            onChangeText={(text) => setOTP({ value: text, error: '' })}
            error={!!otp.error}
            style={{width: '100%', marginBottom: 15}}
        />
        </View>
      }
      {
        !otpGenerated ? 
        <View style={styles.row}><Button mode="contained" style={styles.buttons} onPress={() => generateOTP()}>
          Generate OTP
        </Button></View>
        :
        <View style={styles.row}><Button mode="contained" style={styles.buttons} onPress={() => onLoginPressed()}>
          Login
        </Button></View>
      }
      </Card.Content>
      </Card>
      <Snackbar
        visible={visibleSnackBar}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Undo',
          onPress: () => {
            // Do something
          },
        }}>
        OTP Sent!
      </Snackbar>
    </ScreenWrapper>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: '#fff',
    height: '100%',
  },
  loginCard: {
    marginTop: 100
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 60,
  },
  wrapper: {
    flex: 1,
  },
  buttons: {
    // width: '50%',
    // marginLeft: 60
  }
});
