import  React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { Appbar, Button, TextInput, Caption, Card, Subheading, Snackbar, Surface } from 'react-native-paper';
var axios = require('axios');
import { color } from 'react-native-reanimated';
import DropDown from "react-native-paper-dropdown";
import DateTimePicker from '@react-native-community/datetimepicker';
import { fieldValidator } from '../helpers/fieldValidator'
// import type { StackNavigationProp } from '@react-navigation/stack';
import ScreenWrapper from '../ScreenWrapper';
import {UsersContext } from '../context/UsersContext';
import { saveUserVehicle, getStateFuelPrice, getUserData, getMechanicDetails, getUserVehicle, getUserQR } from '../services/UserServices';

const vehicleTypeList = [
  { label: "4 wheeler", value: "4 wheeler" },
  { label: "2 wheeler", value: "2 wheeler" },
];
const transmissionList = [
  { label: "Manual", value: "Manual" },
  { label: "Automatic", value: "Automatic" },
];
const fuelTypeList = [
  { label: "Petrol", value: "Petrol" },
  { label: "Diesel", value: "Diesel" },
  { label: "CNG", value: "CNG" },
];


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

export default function AddVehical({navigation}) {
    const usersContext = useContext(UsersContext)
    const { users, addNewVehicle } = usersContext;
    const [userDetails, setUserDetails] = React.useState(users);
    const [searchResult, setSearchResult] = React.useState(false);
    const [showVehicleTypeDropDown, setVehicleTypeShowDropDown] = useState(false);
    const [vehicleType, setVehicleType] = useState({ value: '', error: '' });

    const [showTransmissionDropDown, setShowTransmissionDropDown] = useState(false);
    const [transmission, setTransmission] = useState({ value: '', error: '' });

    const [showFuelTypeDropDown, setShowFuelTypeDropDown] = useState(false);
    const [fuelType, setFuelType] = useState({ value: '', error: '' });

    const [regNo, setRegNo] = useState({ value: '', error: '' })
    const [owner, setOwner] = useState({ value: '', error: '' })
    const [brand, setBrand] = useState({ value: '', error: '' })
    const [model, setModel] = useState({ value: '', error: '' })

    const [visible, setVisible] = React.useState(false);

  // const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const searchVehical = () => {
    // setVisible(!visible)
    if(regNo.value !== ''){
      setSearchResult(true);
    }      
  }

  const addVehical = () => {
    const vehicleTypeError = fieldValidator(vehicleType.value);
    const transmissionError = fieldValidator(transmission.value);
    const fuelTypeError = fieldValidator(fuelType.value);
    const regNoError = fieldValidator(regNo.value);
    const ownerError = fieldValidator(owner.value);
    const brandError = fieldValidator(brand.value)
    const modelError = fieldValidator(model.value)

    if(vehicleTypeError){
      setVehicleType({ ...vehicleType, error: vehicleTypeError })
    }
    if(transmissionError){
      setTransmission({ ...transmission, error: transmissionError })
    }
    if(fuelTypeError){
      setFuelType({ ...fuelType, error: fuelTypeError })
    }
    if(regNoError){
      setRegNo({ ...regNo, error: regNoError })
    }
    if(ownerError){
      setOwner({ ...owner, error: ownerError })
    }
    if(brandError){
      setBrand({ ...brand, error: brandError })
    }
    if(modelError){
      setModel({ ...model, error: modelError })
    }

    if (!regNoError && !ownerError && !brandError && !modelError && !vehicleTypeError && !transmissionError && !fuelTypeError) {
    const payload = {
      userID: userDetails.userID,
      owner: owner.value,
      brand: brand.value,
      model: model.value,
      fuelType: fuelType.value,
      vehType: vehicleType.value,
      regNumber: regNo.value,
      transmissionType: transmission.value
    }

    saveUserVehicle(payload).then(( data ) => {
      addNewVehicle(data[0]);
      setVisible(!visible)
      setTimeout(() => {
        navigation.goBack();
      }, 3000);
    })

  }
  }

  return (
    <>
    <Appbar.Header
    style={{ backgroundColor: '#fff' }}
    theme={{
      mode: 'adaptive',
    }}
  >
    <Appbar.BackAction onPress={() => navigation.goBack()} />
    <Appbar.Content style={{ color: '#5E93F1'}}
      title= 'Add new vehicle'
    />
    <Appbar.Action icon="qrcode-scan" onPress={() => navigation.navigate('QRScanScreen')} />
  </Appbar.Header>
  <TextInputAvoidingView>
      <ScreenWrapper
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps={'always'}
        removeClippedSubviews={false}
      >
      <Subheading style={{margin: 20, marginTop: 10}}>Find your vehicle</Subheading> 
      
        <TextInput
          mode="outlined"
          label="Eg: 'UP15 DD 7321'"
          value={regNo.value}
          error={!!regNo.error}
          autoCapitalize="characters"
          onChangeText={(text) => setRegNo({ value: text, error: '' })}
          style={{backgroundColor: '#fff', width: '90%', marginLeft: 15, textTransform: 'capitalize'}}
        />
        <View style={styles.row}>
        <Button
          mode="contained"
          icon="magnify"
          labelStyle={{fontSize: 16}}
          uppercase = {false}
          onPress={searchVehical}
          style={[styles.searchButton]}
        >
          Search
        </Button>
      </View>
      {!searchResult ? <Caption style={{textAlign: 'center', width: '100%'}}></Caption> : 
      <>
      <Caption style={{textAlign: 'center', width: '100%'}}>  We didn't find your vehicle in our Database, but no worries you can still add your vehicle by manually adding the Vehicle details below. </Caption> 
      
      <Card style={styles.serviceCard} mode='elevated'>
        <Card.Content>
        <Subheading style={styles.addVehicleHeading}>Add vehicles Manually</Subheading> 
        <View style={styles.vehicleType}>
            <DropDown
              label={"Vehicle Type"}
              mode={"outlined"}
              // dropDownContainerMaxHeight= {10}
              // dropDownContainerHeight= {10}
              visible={showVehicleTypeDropDown}
              showDropDown={() => setVehicleTypeShowDropDown(true)}
              onDismiss={() => setVehicleTypeShowDropDown(false)}
              value={vehicleType.value}
              error={!!vehicleType.error}
              setValue={(text) => setVehicleType({ value: text, error: '' })}
              // setValue={setVehicleType}
              list={vehicleTypeList}
            />
        </View>
        <View style={styles.vehicleRow}>
            <TextInput
                mode="outlined"
                label="Reg. No"
                value={regNo.value}
                error={!!regNo.error}
                autoCapitalize="characters"
                onChangeText={(text) => setRegNo({ value: text, error: '' })}
                style={{backgroundColor: '#fff', width: '40%', marginLeft: 15, textTransform: 'uppercase'}}
            />
            <TextInput
                mode="outlined"
                label="Owner Name"
                value={owner.value}
                error={!!owner.error}
                onChangeText={(text) => setOwner({ value: text, error: '' })}
                style={{backgroundColor: '#fff', width: '50%', marginLeft: 15, textTransform: 'uppercase'}}
            />
        </View>
        <View style={styles.vehicleRow}>
            <TextInput
                mode="outlined"
                label="Brand"
                value={brand.value}
                error={!!brand.error}
                onChangeText={(text) => setBrand({ value: text, error: '' })}
                style={{backgroundColor: '#fff', width: '40%', marginLeft: 15, textTransform: 'uppercase'}}
            />
            <TextInput
                mode="outlined"
                label="Model"
                value={model.value}
                error={!!model.error}
                onChangeText={(text) => setModel({ value: text, error: '' })}
                style={{backgroundColor: '#fff', width: '50%', marginLeft: 15, textTransform: 'uppercase'}}
            />
        </View>
        <View style={styles.vehicleRow}>
        <View style={styles.type}>
            <DropDown
              label={"Fuel Type"}
              mode={"outlined"}
              visible={showFuelTypeDropDown}
              showDropDown={() => setShowFuelTypeDropDown(true)}
              onDismiss={() => setShowFuelTypeDropDown(false)}
              value={fuelType.value}
              setValue={(text) => setFuelType({ value: text, error: '' })}
              // setValue={setFuelType}
              list={fuelTypeList}
            />
            </View>
            <View style={styles.type}>
            <DropDown
              label={"Transmission"}
              mode={"outlined"}
              visible={showTransmissionDropDown}
              showDropDown={() => setShowTransmissionDropDown(true)}
              onDismiss={() => setShowTransmissionDropDown(false)}
              value={transmission.value}
              setValue={(text) => setTransmission({ value: text, error: '' })}
              // setValue={setTransmission}
              list={transmissionList}
            />
            </View>
            {/* <TextInput
                mode="outlined"
                label="Transmission"
                style={{backgroundColor: '#fff', width: '50%',height: 50, marginLeft: 15, textTransform: 'uppercase'}}
            /> */}
        </View>
        
        <Button
          mode="contained"
          icon="plus"
          onPress={addVehical}
          style={styles.addVehical}
        >
          Add Vehicle
        </Button>
        </Card.Content>
      </Card>
      </>
      }  
      <Snackbar
        visible={visible}
        style={{backgroundColor: '#4B793E', color: '#fff'}}
        onDismiss={onDismissSnackBar}
        action={{
          icon: 'close',
          onPress: () => {
            // Do something
          },
        }}>
        Vehical added successfully
      </Snackbar>
      </ScreenWrapper>
    </TextInputAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  addVehicleHeading: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    textDecorationColor: '#000'
  },
  containerStyle: {
    flex: 1,
  },
  spacerStyle: {
    marginBottom: 15,
  },
  safeContainerStyle: {
    flex: 1,
    margin: 20,
    justifyContent: "center",
  },
  type: {
    height: 70,
    width: '45%',
    margin: 10,
    padding: 0,
    lineHeight: 0,
    backgroundColor: '#fff'

  },
  vehicleType: {
    height: 70,
    width: 170,
    display: 'flex', 
    position: 'relative',
    left: '40%',
    padding: 0,
    lineHeight: 0,

  },
  addVehical: {
    margin: 5,
    justifyContent: 'center',
    color: 'grey',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginLeft: 50,
    marginRight: 50,
    backgroundColor: '#7ac5cd'
  },
  searchButton: {
    // marginLeft: 80,
    // marginRight: 80,
    margin: 20,
    // width: '50%',
    display: 'flex', 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff7f27'
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
    textAlign: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 60,
  },
  vehicleRow: {
    flexDirection: 'row',
    width: '100%'
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
});