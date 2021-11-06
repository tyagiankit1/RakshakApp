import  React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, View } from 'react-native';
// import { List, Divider, useTheme } from 'react-native-paper';
var axios = require('axios');
import { Button, TextInput, useTheme, Card } from 'react-native-paper';
import { useSafeArea } from 'react-native-safe-area-context';
// import type { StackNavigationProp } from '@react-navigation/stack';

import { useSelector, useDispatch } from 'react-redux'
// import { addUser, updateUser, deleteUser } from '../redux/userApp'

import Background from '../components/Background';
import Logo from '../components/Logo'; 
import Paragraph from '../components/Paragraph';
import { emailValidator } from '../helpers/emailValidator'
import { fieldValidator } from '../helpers/fieldValidator'
import ScreenWrapper from '../ScreenWrapper';
import {UsersContext } from '../context/UsersContext';

import { saveUserData, getUserData } from '../services/UserServices';


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

export default function RegisterScreen({ navigation }) {
  const usersContext = useContext(UsersContext)
  const { users, addNewUser } = usersContext;
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [address, setAddress] = useState({ value: '', error: '' })
  const [city, setCity] = useState({ value: '', error: '' })
  const [state, setState] = useState({ value: '', error: '' })
  const [pincode, setPincode] = useState({ value: '', error: '' })
  const [refByCode, setRefByCode] = useState({ value: '', error: '' })

  const onLoginPressed = () => {

    const emailError = emailValidator(email.value)
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

    if ( !emailError && !nameError &&  !addressError &&  !cityError &&  !stateError &&  !pincodeError ) {
      let payload = {
          name: name.value,
          contactNo: navigation.state.params,
          email: email.value,
          address: address.value,
          city: city.value,
          state: state.value,
          pincode: pincode.value,
          refByCode: refByCode.value,
      }

      saveUserData(payload).then(( data ) => {
        console.log("response: ", data);
        addNewUser(data.userDetails);
        navigation.navigate('BottomNavigation', data.userDetails);
      })
      
    }
  }

  return (
    <TextInputAvoidingView>
      <ScreenWrapper
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps={'always'}
        removeClippedSubviews={false}
      >
    <View>
    <Card style={styles.registerCard} mode='elevated'>
      <Card.Content>
        <View style={styles.row}><Logo /></View>
        <TextInput
            mode="outlined"
            theme={{roundness: 25,}}
            label="Name"
            value={name.value}
            onChangeText={(text) => setName({ value: text, error: '' })}
            error={!!name.error}
            style={{width: '100%', marginBottom: 15}}
        />
        <TextInput
            mode="outlined"
            theme={{roundness: 25,}}
            label="Email"
            value={email.value}
            onChangeText={(text) => setEmail({ value: text, error: '' })}
            error={!!email.error}
            style={{width: '100%', marginBottom: 15}}
        />
        <TextInput
            mode="outlined"
            theme={{roundness: 25,}}
            label="Address"
            value={address.value}
            onChangeText={(text) => setAddress({ value: text, error: '' })}
            error={!!address.error}
            style={{width: '100%', marginBottom: 15}}
        />
        <TextInput
            mode="outlined"
            theme={{roundness: 25,}}
            label="City"
            value={city.value}
            onChangeText={(text) => setCity({ value: text, error: '' })}
            error={!!city.error}
            style={{width: '100%', marginBottom: 15}}
        />
        <TextInput
            mode="outlined"
            theme={{roundness: 25,}}
            label="State"
            value={state.value}
            onChangeText={(text) => setState({ value: text, error: '' })}
            error={!!state.error}
            style={{width: '100%', marginBottom: 15}}
        />
        <TextInput
            mode="outlined"
            theme={{roundness: 25,}}
            label="Pincode"
            keyboardType='numeric'
            value={pincode.value}
            onChangeText={(text) => setPincode({ value: text, error: '' })}
            error={!!pincode.error}
            style={{width: '100%', marginBottom: 15}}
        />
        <TextInput
            mode="outlined"
            theme={{roundness: 25,}}
            label="Referred By"
            value={refByCode.value}
            onChangeText={(text) => setRefByCode({ value: text, error: '' })}
            error={!!refByCode.error}
            style={{width: '100%', marginBottom: 15}}
        />
        <Button icon="account-plus" mode="contained" onPress={onLoginPressed}>
          Save Details
        </Button>
        </Card.Content>
        </Card>
    </View>
    </ScreenWrapper>
    </TextInputAvoidingView>
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
