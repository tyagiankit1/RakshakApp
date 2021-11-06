import  React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, KeyboardAvoidingView, View, FlatList, SafeAreaView, Pressable } from 'react-native';
import { CheckBox } from 'react-native-elements'
import { Appbar, Button, Text, Caption,  Avatar, Card, TextInput, Headline, Title, Snackbar, Subheading, Divider, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';
import { color } from 'react-native-reanimated';
// import type { StackNavigationProp } from '@react-navigation/stack';
import ScreenWrapper from '../ScreenWrapper';
import {UsersContext } from '../context/UsersContext';
var axios = require('axios');

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

export default function BuyNewQR({navigation}) {
  const usersContext = useContext(UsersContext)
  const { users, vehicle, updateVehicle } = usersContext;
  const [selected, setSelected] = React.useState(false);
  const [selectedVehicle, setSelectedVehicle] = React.useState({});
  const [timesPressed, setTimesPressed] = useState(0);

  const [ownerContact, setOwnerContact] = useState('');
  const [relation1, setRelation1] = useState('');
  const [relation2, setRelation2] = useState('');
  const [relation3, setRelation3] = useState('');
  const [contact1, setContact1] = useState('');
  const [contact2, setContact2] = useState('');
  const [contact3, setContact3] = useState('');



  const [vehicleAvailable, setVehicleAvailable] = React.useState(false);

  let textLog = '';
  if (timesPressed > 1) {
    textLog = timesPressed + 'x onPress';
  } else if (timesPressed > 0) {
    textLog = 'onPress';
  }

  useEffect(() => {
      if(vehicle.length !== 0){
        for(let i=0; i< vehicle.length; i++){
          if(vehicle[i].qrStatus){
            console.log('vehicle[i].qr_status ----------------> ', vehicle[i].qrStatus);
            setVehicleAvailable(false);
            break;
          } else{
            setVehicleAvailable(true);
          }
        }
      } else{
        setVehicleAvailable(false);
      }
  }, [vehicleAvailable] )

  useEffect(() => {
    if(navigation.state.params !== undefined){
      setSelected(true);
      setSelectedVehicle(navigation.state.params);
     
    }
  }, [selectedVehicle] )

  function selectVehical(item){
    setSelected(true);
    setSelectedVehicle(item)
    console.log('itrem: ',item);
  }

  const requestQR = () => {
    let contact = {
      'ownerContact': ownerContact,
      [relation1]: contact1,
      [relation2]: contact2,
      [relation3]: contact3
    }
    let payload = selectedVehicle;
    // payload['primary_contacts'] = JSON.stringify(contact);
    // payload['qr_purchase_date'] = new Date();
    // payload['qr_status'] = 'Request';
    var data = JSON.stringify({
      "rc_number": selectedVehicle['rc_number'],
      "update_data": payload
    });
    let devURL = 'http://192.168.1.4:8080/api/requestQRByVehicle';
    let prodURL = 'http://rakshaksvc.cyberimprintsolutions.com/api/requestQRByVehicle';
    
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
      console.log("vehicleDetails: ", response.data);
      let data = response.data.vehicleDetails;
      data['qr_img'] = response.data.data;
      updateVehicle(data);
      setSnackbarVisible(true);
      // setSelected(false);
      setVisible(false);
      setTimeout(() => {
        navigation.goBack()
      }, 3000);

    })
    .catch(function (error) {
      console.log(error);
    });
    // console.log('contact: ', payload);

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
      title= 'Buy New QR'
    />
    <Appbar.Action icon="qrcode-scan" color='#fff' onPress={() => navigation.navigate('QRScanScreen')} />
  </Appbar.Header>
  
      <ScreenWrapper
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps={'always'}
          removeClippedSubviews={false}
        >
      {
        !selected 
        ?
      <>
      <Button
            color='grey'
            icon="plus"
            onPress={() => navigation.navigate('AddVehical')}
            style={styles.addVehical}
          >
            Add new vehicle
      </Button>
      <Headline style={{margin: 20}}>Select vehical for QR</Headline> 

      <View style={styles.container}>
        {!vehicleAvailable ? (
          <Card style={styles.serviceCard} mode='elevated'>
            <Card.Content>
              <Title style={{textAlign: 'center', height: 80,  color: 'grey', textAlignVertical: 'center' }}>No vehical available for new QR Purchase</Title>
            </Card.Content>
          </Card>
        ) : (
          <SafeAreaView style={{flex: 0}}>
          <FlatList
            data={vehicle}
            // style={{maxHeight: '95%'}}
            renderItem={({ item }) => (
              <>
              {
                item.qrStatus === 0 ? 
              <>
              <Text style={styles.vehType}>{item.vehType}</Text>
              
              <Card style={styles.serviceCard} mode='elevated'>
              <Pressable
                onPress={() => navigation.navigate('RequestQR', item)}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                      ? '#CFD1F2'
                      : 'white'
                  },
                  styles.wrapperCustom
                ]}>
                <>
                <Card.Title
                  title={item.regNumber}
                  subtitle={item.owner}
                  titleStyle={{color: '#3f48cc'}}
                  color='#3f48cc'
                  style={{color: '#3f48cc'}}
                  left={(props) => <Avatar.Icon {...props} style={{backgroundColor: '#3f48cc'}} icon={item.vehType === "4 wheeler" ? "car" : "motorbike"} />}
                  // right={(props) => <IconButton {...props} color='#0ed145' icon="check" onPress={() => {}} />}
                />
                <Card.Content>
                  <View style={styles.row}>
                    <View style={styles.row}>
                      <Subheading> Model:  </Subheading> 
                      <Caption style={{textAlign: 'left'}}>{item.model}</Caption>
                    </View>
                    <View style={styles.row}>
                      <Subheading> Brand.:  </Subheading> 
                      <Caption style={{textAlign: 'left'}}>{item.brand}</Caption>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.row}>
                      <Subheading> Fuel Type:  </Subheading> 
                      <Caption style={{textAlign: 'left'}}>{item.fuelType}</Caption>
                    </View>
                    <View style={styles.row}>
                      <Subheading> Transmission:  </Subheading> 
                      <Caption style={{textAlign: 'left'}}>{item.transmissionType}</Caption>
                    </View>
                  </View>
                {/* <Title style={{textAlign: 'center', height: 80,  color: 'grey', textAlignVertical: 'center' }}>vehical available</Title> */}
                </Card.Content>
                </>
                </Pressable>
              </Card>
              </>
              :
              <Text> </Text>
            }
              </>
            )}
            keyExtractor={item => item.vehicleID}
          />
          </SafeAreaView>
        )}
      </View>
      </>
      :
      <>
        
        {/* <Button
              color='red'
              labelStyle={{fontSize: 10}}
              uppercase = {false}
              icon="arrow-left"
              mode="outlined"
              onPress={() => setSelected(false)}
              style={{flexDirection:'row', fontSize: 10, backgroundColor: '#fff'}}
              // style={styles.addVehical}
            >
              Back to Vehicle selection

        </Button> */}

        {/* <TextInputAvoidingView>
        <ScreenWrapper
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps={'always'}
          removeClippedSubviews={false}
        >
        <Card style={[styles.serviceCard, {marginTop: 20}]} mode='elevated'>
          <Card.Title
            title={selectedVehicle.rc_number}
            subtitle={selectedVehicle.owner_name}
            left={(props) => <Avatar.Icon {...props} style={{backgroundColor: '#3f48cc'}} icon="car" />}
            // right={(props) => <IconButton {...props} color='#0ed145' icon="check" onPress={() => {}} />}
          />
          <Card.Content>
          <Divider />
          <Subheading style={{margin: 20, textAlign: 'center', color: '#5E93F1'}}>Contact details for QR</Subheading> 
          <Divider />
          <Subheading style={{marginTop: 20, textAlign: 'center'}}> Primary Contacts </Subheading>
            <Subheading> Name: </Subheading>
            <TextInput
              mode="outlined"
              label="Name"
              value={name.value}
              error={!!name.error}
              onChangeText={(text) => setRegNo({ value: text, error: '' })}
              style={{backgroundColor: '#fff', width: '100%', marginBottom: 15}}
            />
            <Subheading> Name: </Subheading>
            <TextInput
              mode="outlined"
              keyboardType='numeric'
              selectionColor='#5E93F1'
              // theme={{roundness: 25,}}
              label="Contact Number"
              value={ownerContact}
              onChangeText={(number) => setOwnerContact( number)}
              maxLength={10} 
              color='#5E93F1'
              style={{width: '100%', marginBottom: 15, backgroundColor: '#fff'}}
            />

            <Divider />

            <Subheading style={{marginTop: 20, textAlign: 'center'}}> Secondary Contacts </Subheading>
            <TextInput
              mode="outlined"
              selectionColor='#5E93F1'
              // theme={{roundness: 25,}}
              label="Relationship"
              value={relation1}
              onChangeText={(text) => setRelation1( text)}
              color='#5E93F1'
              style={{width: '100%', marginBottom: 15, backgroundColor: '#fff'}}
            />
            <TextInput
              mode="outlined"
              keyboardType='numeric'
              selectionColor='#5E93F1'
              // theme={{roundness: 25,}}
              label="Contact Number"
              value={contact1}
              onChangeText={(number) => setContact1( number)}
              maxLength={10} 
              color='#5E93F1'
              style={{width: '100%', marginBottom: 15, backgroundColor: '#fff'}}
            />
            <Divider />
            <TextInput
              mode="outlined"
              selectionColor='#5E93F1'
              // theme={{roundness: 25,}}
              label="Relationship"
              value={relation2}
              onChangeText={(text) => setRelation2( text)}
              color='#5E93F1'
              style={{width: '100%', marginBottom: 15, backgroundColor: '#fff'}}
            />
            <TextInput
              mode="outlined"
              keyboardType='numeric'
              selectionColor='#5E93F1'
              // theme={{roundness: 25,}}
              label="Contact Number"
              value={contact2}
              onChangeText={(number) => setContact2( number)}
              maxLength={10} 
              color='#5E93F1'
              style={{width: '100%', marginBottom: 15, backgroundColor: '#fff'}}
            />
            <Divider />
            <TextInput
              mode="outlined"
              selectionColor='#5E93F1'
              // theme={{roundness: 25,}}
              label="Relationship"
              value={relation3}
              onChangeText={(text) => setRelation3( text)}
              color='#5E93F1'
              style={{width: '100%', marginBottom: 15, backgroundColor: '#fff'}}
            />
            <TextInput
              mode="outlined"
              keyboardType='numeric'
              selectionColor='#5E93F1'
              // theme={{roundness: 25,}}
              label="Contact Number"
              value={contact3}
              onChangeText={(number) => setContact3( number)}
              maxLength={10} 
              color='#5E93F1'
              style={{width: '100%', marginBottom: 15, backgroundColor: '#fff'}}
            />
            
            <Button icon="cart-outline" mode="contained" style={{marginLeft: 50, marginRight: 50}} onPress={showDialog}>
              Buy Now
            </Button>
           </Card.Content>
        </Card>
        </ScreenWrapper>
        </TextInputAvoidingView> */}

     </>
      }
    </ScreenWrapper>
    
        
      {/* </View>
    </Provider> */}
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
    justifyContent: 'space-between',
    // paddingVertical: 8,
    // paddingHorizontal: 16,
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