import  React, { useState, useEffect, useContext } from 'react';
import { BackHandler, Alert, StyleSheet, View, FlatList, SafeAreaView, Pressable } from 'react-native';
import { TextInput, Button, Text, Caption,  Avatar, Card, IconButton, Headline, Title, Subheading } from 'react-native-paper';
import { color } from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';
// import type { StackNavigationProp } from '@react-navigation/stack';
import ScreenWrapper from '../ScreenWrapper';
import {UsersContext } from '../context/UsersContext';

export default function MyQRScreen({navigation}) {
  const usersContext = useContext(UsersContext)
  const { users, vehicle, userQR } = usersContext;
  const [qrList, setQRList] = React.useState([]);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'YES', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  console.log("userQR: ", userQR);

  useEffect(() => {
    if(qrList.length === 0){
      // let data = 
      console.log("qrList: ", qrList)
      setQRList(userQR);
    }
    
  }, [userQR] )

  return (

    <ScreenWrapper
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
      <Button
            color='grey'
            icon="plus"
            onPress={() => navigation.navigate('BuyNewQRScreen')}
            style={styles.addVehical}
          >
            Buy new QR  
            &nbsp;<FontAwesome
                name="qrcode"
                // size={20}
              />
      </Button>
      <Headline style={{margin: 20}}>My QR</Headline> 

      {/* <Card style={styles.serviceCard} mode='elevated'>
        <Card.Content>
        <Title style={{textAlign: 'center', height: 80,  color: 'grey', textAlignVertical: 'center' }}>No active QR</Title>
        </Card.Content>
      </Card> */}

      <View style={styles.container}>
        {qrList.length === 0 ? (
          <Card style={styles.serviceCard} mode='elevated'>
            <Card.Content>
              <Title style={{textAlign: 'center', height: 80,  color: 'grey', textAlignVertical: 'center' }}>No active QR</Title>
            </Card.Content>
          </Card>
        ) : (
          <SafeAreaView style={{flex: 1}}>
          <FlatList
            data={qrList}
            // style={{maxHeight: '85%'}}
            renderItem={({ item }) => (
              <>
              <Text style={styles.vehType}>{item.qrStatus}</Text>
              <Card style={styles.serviceCard} mode='elevated'>
              <Pressable
                onPress={() => navigation.navigate('QRDetails', item)}
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
                  title={item.qrCode}
                  subtitle={item.primaryContact}
                  left={(props) =>  <Avatar.Icon {...props} style={{backgroundColor: '#3f48cc'}} icon={item.vehType === "4 wheeler" ? "car" : "motorbike"} /> }
                  right={(props) => <IconButton {...props} color='#0ed145' icon="pencil" onPress={() => {}} />}
                />
                {/* <Card.Content>
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
                  </View> */}
                {/* <Title style={{textAlign: 'center', height: 80,  color: 'grey', textAlignVertical: 'center' }}>vehical available</Title> */}
                {/* </Card.Content> */}
                </>
                </Pressable>
              </Card>
              </>
            )}
            keyExtractor={item => item.qrCode}
          />
          </SafeAreaView>
        )}
      </View>
      
      </ScreenWrapper>
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
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#fff',
    borderRadius: 50
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