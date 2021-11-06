import  React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, KeyboardAvoidingView, View, Platform, SafeAreaView, Pressable } from 'react-native';
// import { List, Divider, useTheme } from 'react-native-paper';
var axios = require('axios');
import { Appbar, Button, Text, Caption,  Avatar, Card, TextInput, Headline, Title, Snackbar, Subheading, Divider, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';

import { useSafeArea } from 'react-native-safe-area-context';
// import type { StackNavigationProp } from '@react-navigation/stack';

import { useSelector, useDispatch } from 'react-redux'
// import { addUser, updateUser, deleteUser } from '../redux/userApp'

import { emailValidator } from '../helpers/emailValidator'
import { fieldValidator } from '../helpers/fieldValidator'
import { contactValidator } from '../helpers/contactValidator'
import ScreenWrapper from '../ScreenWrapper';
import {UsersContext } from '../context/UsersContext'


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

export default function RequestQR({ navigation }) {
  const usersContext = useContext(UsersContext)
  const { users, vehicle, addNewUser, addNewUserOrder, updateVehicle } = usersContext;
  
  const [selectedVehicle] = React.useState(navigation.state.params);
  const [name, setName] = useState({ value: '', error: '' })
  const [contact, setContact] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [address, setAddress] = useState({ value: '', error: '' })
  const [city, setCity] = useState({ value: '', error: '' })
  const [state, setState] = useState({ value: '', error: '' })
  const [pincode, setPincode] = useState({ value: '', error: '' })
  const [refByCode, setRefByCode] = useState({ value: '', error: '' })
  
  const [visible, setVisible] = React.useState(false);
  const [visibleAlert, setVisibleAlert] = React.useState(false);

  const showDialog = () => {
      
    const emailError = emailValidator(email.value)
    const contactError = contactValidator(contact.value)
    const nameError = fieldValidator(name.value)
    const addressError = fieldValidator(address.value)
    const cityError = fieldValidator(city.value)
    const stateError = fieldValidator(state.value)
    const pincodeError = fieldValidator(pincode.value)

    if(emailError){
      setEmail({ ...email, error: emailError })
    }
    if(nameError){
      setName({ ...name, error: nameError })
    }
    if(addressError){
      setAddress({ ...address, error: addressError })
    }
    if(cityError){
      setCity({ ...city, error: cityError })
    }
    if(stateError){
      setState({ ...state, error: stateError })
    }
    if(pincodeError){
      setPincode({ ...pincode, error: pincodeError })
    }
    if(contactError){
        setContact({ ...contact, error: contactError })
    }

    if ( !emailError && !nameError &&  !addressError &&  !cityError &&  !stateError &&  !pincodeError && !contactError ) {
        setVisible(true);
    }
      
  }
  const hideDialog = () => setVisible(false);
  const hideAlertDialog = () => setVisibleAlert(false);

  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const onDismissSnackBar = () => setSnackbarVisible(false);

  const onProceedPressed = () => {

      let payload = {
        userID: users.userID,
        vehicleID: selectedVehicle.vehicleID,
        name: name.value,
        contactNo: contact.value,
        email: email.value,
        address: address.value,
        city: city.value,
        state: state.value,
        pincode: pincode.value,
        orderStatus: "Requested"
      }
      
      let devURL = 'http://192.168.1.4:8080/api/requestQRByVehicle';
      let prodURL = 'http://rakshaksvc.cyberimprintsolutions.com/api/requestQRByVehicle';
      var config = {
        method: 'post',
        url: devURL,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : payload
      };
      
      axios(config)
      .then(function (response) {
        console.log(response.data)
        addNewUserOrder(response.data);
        selectedVehicle.qrStatus = true;
        updateVehicle(selectedVehicle);
        setVisibleAlert(true);
        // addNewUser(response.data.userDetails);
        
      })
      .catch(function (error) {
        console.log('error: ', error);
      });
    
  }

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
      title= 'Request for new QR'
    />
    {/* <Appbar.Action icon="qrcode-scan" color='#fff' onPress={() => navigation.navigate('QRScanScreen')} /> */}
  </Appbar.Header>
  
      <ScreenWrapper
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps={'always'}
          removeClippedSubviews={false}
        >
    <TextInputAvoidingView>
      <ScreenWrapper
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps={'always'}
        removeClippedSubviews={false}
      >
    <View>
    <Card style={[styles.serviceCard, {marginTop: 20}]} mode='elevated'>
      <Card.Title
        title={selectedVehicle.regNumber}
        left={(props) => <Avatar.Icon {...props} style={{backgroundColor: '#3f48cc'}} icon="car" />}
        // right={(props) => <IconButton {...props} color='#0ed145' icon="check" onPress={() => {}} />}
      />
      <Card.Content>
        {/* <View style={styles.row}><Logo /></View> */}
        <Subheading> Name: </Subheading>
            <TextInput
              mode="outlined"
              label="Name"
              value={name.value}
              error={!!name.error}
              onChangeText={(text) => setName({ value: text, error: '' })}
              style={{backgroundColor: '#fff', width: '100%', marginBottom: 15}}
            />
        
        <Subheading> Contact Number: </Subheading>
            <TextInput
              mode="outlined"
              label="Contact"
              keyboardType='numeric'
              value={contact.value}
              onChangeText={(text) => setContact({ value: text, error: '' })}
              error={!!contact.error}
              style={{backgroundColor: '#fff', width: '100%', marginBottom: 15}}
            />
        <Subheading> Email: </Subheading>
        <TextInput
            mode="outlined"
            label="Email"
            value={email.value}
            onChangeText={(text) => setEmail({ value: text, error: '' })}
            error={!!email.error}
            style={{width: '100%', marginBottom: 15}}
        />

        <Subheading> Delivery Address: </Subheading>
            <TextInput
              mode="outlined"
              label="Delivery Address"
              value={address.value}
              error={!!address.error}
              onChangeText={(text) => setAddress({ value: text, error: '' })}
              style={{backgroundColor: '#fff', width: '100%', marginBottom: 15}}
            />
        
        <Subheading> City: </Subheading>
        <TextInput
            mode="outlined"
            label="City"
            value={city.value}
            onChangeText={(text) => setCity({ value: text, error: '' })}
            error={!!city.error}
            style={{width: '100%', marginBottom: 15}}
        />
        <Subheading> State: </Subheading>
        <TextInput
            mode="outlined"
            label="State"
            value={state.value}
            onChangeText={(text) => setState({ value: text, error: '' })}
            error={!!state.error}
            style={{width: '100%', marginBottom: 15}}
        />
        <Subheading> Pincode: </Subheading>
        <TextInput
            mode="outlined"
            label="Pincode"
            keyboardType='numeric'
            value={pincode.value}
            onChangeText={(text) => setPincode({ value: text, error: '' })}
            error={!!pincode.error}
            style={{width: '100%', marginBottom: 15}}
        />
        
        <Button icon="purse-outline" mode="contained" onPress={showDialog}>
          Proceed
        </Button>
        </Card.Content>
        </Card>
    </View>
    </ScreenWrapper>
    </TextInputAvoidingView>
    </ScreenWrapper>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Confirmation</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Currently, the QR is on the trial version, so there will be no charges for it.</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Cancle</Button>
              <Button onPress={onProceedPressed}>Buy</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Portal>
          <Dialog visible={visibleAlert} onDismiss={hideAlertDialog}>
            {/* <Dialog.Title>Confirmation</Dialog.Title> */}
            <Dialog.Content>
              <Paragraph>Request for new QR code is successfully placed.</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => navigation.goBack()}>Okay</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Snackbar
        visible={snackbarVisible}
        onDismiss={onDismissSnackBar}
        action={{
          icon: 'close',
          onPress: () => {
            // Do something
          },
        }}>
        Request for new QR code is successfully placed.
      </Snackbar>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  registerCard: {
    padding: 10,
    marginTop: 10
  },
  button: {
    margin: 4,
  },
  helpersWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapper: {
    flex: 1,
  },
  helper: {
    flexShrink: 1,
  },
  counterHelper: {
    textAlign: 'right',
  },
  inputContainerStyle: {
    margin: 8,
  },
  fontSize: {
    fontSize: 32,
  },
  textArea: {
    height: 80,
  },
});
