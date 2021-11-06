import  React, { useState, useEffect, useContext } from 'react';
import { BackHandler, View, Platform, StyleSheet, Alert, Image, Pressable } from 'react-native';

import { Headline, FAB, Card, Text, Button, Avatar } from 'react-native-paper';
// import { Divider, useTheme, Card, Avatar, Text, Button } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import ScreenWrapper from '../ScreenWrapper';

import {UsersContext } from '../context/UsersContext';
import AppBackground from '../components/AppBackground';

const axios = require('axios');
const logo = require('../assets/logo-trans.png');


export default function LoadingHome({ navigation }) {
  const usersContext = useContext(UsersContext)
  const { users, fuelDetails } = usersContext;
  const [userDetails, setUserDetails] = React.useState(users);


  const [petrolPrice, setPetrolPrice] = useState('N/A');
  const [petrolChange, setPetrolChange] = useState('N/A');
  const [petrolSign, setPetrolSign] = useState('');
  const [dieselPrice, setDieselPrice] = useState('N/A');
  const [dieselChange, setDieselChange] = useState('N/A');
  const [dieselSign, setDieselSign] = useState('');


  useEffect(() => {
    if(users !== undefined && fuelDetails !== undefined && fuelDetails.length !== 0){
      let details = fuelDetails.filter(fuelDetail => fuelDetail.district.toLowerCase() === users.city.toLowerCase() );
      setPetrolPrice(details[0].petrol);
      setDieselPrice(details[0].diesel);
      setPetrolChange(details[0].petrolChange);
      setDieselChange(details[0].dieselChange);
      setPetrolSign(details[0].petrolSign);
      setDieselSign(details[0].dieselSign);

    }
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

  

  return (
    // <AppBackground>
    <>
    <View style={{backgroundColor:'white', flex:1}}>
      <ScreenWrapper
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
      <View style={styles.row}>
        <Card style={styles.cardSubs} mode='elevated'>
          <Card.Content>
            <View style={styles.photoBlock} >
              <Image source={ logo } style={styles.photo} />
            </View>
            {/* <View> <Text>Sample Items</Text></View> */}
            <Text style={styles.subsText}> Subscribe for a new QR.</Text>
              <Pressable onPress={() => navigation.navigate('BuyNewQRScreen')} >
              <Text style={styles.cardButton}  >Subscribe Now <FontAwesome
                name="arrow-right"
                size={25}
                color='#fff'
                style={{ fontSize: 12, textAlign: 'right' }}
              /> </Text>   
              </Pressable>    
            <View style={styles.avatarStyle} >
              <FontAwesome
                name="qrcode"
                size={20}
                color='#fff'
                style={{ fontSize: 65, textAlign: 'center' }}
              />
            </View>
          </Card.Content>
        </Card>
        <Card style={styles.cardVehical} mode='elevated'>
          <Card.Content>
            <View style={styles.photoBlock} >
              <Image source={ logo } style={styles.photo} />
            </View>
            <Text style={styles.subsText}> Search for new Vehicle.</Text> 
            <Text style={styles.cardButton} onPress={() => {}} >Search Vehicle <FontAwesome
                name="arrow-right"
                size={25}
                color='#fff'
                style={{ fontSize: 12, textAlign: 'right' }}
              /></Text> 
            <View style={styles.avatarStyle} >
              <FontAwesome
                name="car"
                size={20}
                color='#fff'
                style={{ fontSize: 65, textAlign: 'center' }}
              />
            </View>
          </Card.Content>
        </Card>
      </View>
      <View style={styles.row}>
        <Text style={styles.heading} >Fuel Price</Text> 
      </View>      
      <View style={styles.row}>
        <Card style={[styles.petrolFuelCard, styles.fuelCard]} mode='elevated'>
          <Card.Title
            // right={(props) =>  <Avatar.Icon {...props} style={{backgroundColor: '#295139'}} icon= "arrow-up-bold" /> }
            // right= {(props) => <Text style={{color: '#fff', marginRight: 10}} >(₹/L)</Text>}
            title="Petrol"
            style={{backgroundColor: '#485470', color: '#fff', borderTopLeftRadius: 10, borderTopRightRadius: 10, margin: 0, padding: 0}}
            titleStyle={{backgroundColor: '#485470', color: '#fff', borderTopLeftRadius: 10, borderTopRightRadius: 10, margin: 0, padding: 0}}
            color= '#fff'
          />
          
          <Card.Content>
            <View style={styles.fuelRow}>
              <Text style={[styles.fuelValue]} > {petrolPrice}</Text>
              <Text style={[styles.fuelValue, {textAlign: 'right'}]} >
                {petrolSign === '+' ? <FontAwesome name="arrow-up" color='#295139' style={{ fontSize: 18  }} /> : <FontAwesome name="arrow-down" color='#D5573B' style={{ fontSize: 18  }} />}
                {petrolChange} </Text> 
            </View>
          {/* <Text style={styles.fuelHeading} > Petrol</Text>  */}
            {/* <Text style={styles.fuelValue} > {petrolPrice}</Text>  */}
          </Card.Content>
        </Card>
        <Card style={[styles.diesalFuelCard, styles.fuelCard]} mode='elevated'>
          <Card.Title
            // right={(props) =>  <Avatar.Icon {...props} style={{backgroundColor: '#D5573B'}} icon= "arrow-down-bold" /> }
            title="Diesel"
            style={{backgroundColor: '#595D88', color: '#fff', borderTopLeftRadius: 10, borderTopRightRadius: 10, margin: 0, padding: 0}}
            titleStyle={{backgroundColor: '#595D88', color: '#fff', borderTopLeftRadius: 10, borderTopRightRadius: 10, margin: 0, padding: 0}}
            color= '#fff'
          />
          <Card.Content>
            <View style={styles.fuelRow}>
              <Text style={[styles.fuelValue, {textAlign: 'left'}]} > {dieselPrice}</Text>
              <Text style={[styles.fuelValue, {textAlign: 'right'}]} >
                {dieselSign === '+' ? <FontAwesome name="arrow-up" color='#295139' style={{ fontSize: 18  }} /> : <FontAwesome name="arrow-down" color='#D5573B' style={{ fontSize: 18  }} />}
                {dieselChange} </Text> 
            </View>
            
          </Card.Content>
        </Card>
        
      </View>

      <View style={styles.row}>
        <Text style={styles.heading} >Services</Text> 
        <Button onPress={() => navigation.navigate('ServiceScreen', {showAppbar: true})} style={styles.button}>
          <Text style={styles.viewAll} >View All...</Text>
        </Button>
      </View> 
      <View style={styles.row}>
        <Card style={styles.serviceCard} mode='elevated'>
          <Card.Content>
          <View style={styles.row}>
          <Pressable onPress={() => navigation.navigate('MapScreen', 'Flat Tyre')} >
            <View onPress={() => navigation.navigate('MapScreen')}>
              <Avatar.Image
                style={[styles.avatarStyle, styles.serviceIcon]}
                onPress={() => navigation.navigate('MapScreen')}
                source={require('../assets/icons/flat-tyre.jpeg')}
              />
              <Text onPress={() => navigation.navigate('MapScreen')} style={styles.serviceBlock}>Flat Tyre</Text>
            </View> 
            </Pressable>
          <Pressable onPress={() => navigation.navigate('MapScreen', 'Car Jumpstart')} >
            <View >
              <Avatar.Image
                style={[styles.avatar, styles.serviceIcon]} 
                onPress={() => navigation.navigate('MapScreen')}
                source={require('../assets/icons/jumpstart.jpeg')}
              />
              <Text style={styles.serviceBlock}>Car Jumpstart</Text>
            </View> 
            </Pressable>
          <Pressable onPress={() => navigation.navigate('MapScreen', 'Engine Scanning')} >
            <View >
                <Avatar.Image
                    style={[styles.avatar, styles.serviceIcon]} 
                    onPress={() => navigation.navigate('MapScreen')}
                    source={require('../assets/icons/scan.jpeg')}
                />
              <Text style={styles.serviceBlock}>Engine Scanning</Text>
            </View> 
            </Pressable>         
          </View>
          </Card.Content>
        </Card>
      </View>
      {/* <View style={styles.row}>
        <Text style={styles.heading} >Trending Now</Text> 
        <Button onPress={() => {}} style={styles.button}>
          <Text style={styles.viewAll} >View All...</Text>
        </Button>
      </View> 
      <View style={styles.row}>
        <Card style={styles.serviceCard} mode='elevated'>
          <Card.Content>
          <View style={styles.row}>
          <Text style={styles.trending} >Most viewed 5 influencer videos in loop</Text>
          </View>
          </Card.Content>
        </Card>
      </View> */}
      {/* <View style={styles.row}>
        <Text style={styles.heading} >Offers</Text> 
        <Button onPress={() => {}} style={styles.button}>
          <Text style={styles.viewAll} >View All...</Text>
        </Button>
      </View> 
      <View style={styles.row}>
        <Card style={styles.serviceCard} mode='elevated'>
          <Card.Content>
          <View style={styles.row}>

          </View>
          </Card.Content>
        </Card>
      </View> */}
      </ScreenWrapper>
      </View>
    </>
    // </AppBackground>
  );
}


const styles = StyleSheet.create({
  container: {
    color: '#ffffff'
  },
  serviceIcon: {
    width: 0,
    margin: 5,
    marginLeft: 5,
  },
  serviceBlock: {
    // flexDirection:'row',
    flex: 1,
    flexWrap: 'wrap',
    width: 90,
    // color: '#fff',
    textAlign: 'center',
    position: 'relative',
    right: 12
  },
  fuelHeading: {
    color: '#fff',
    textAlign: 'left',
    width: 80,
    fontSize: 18,
    fontWeight: 'bold',
    // paddingBottom: 5
  },
  fuelValue: {
    color: '#595D88',
    textAlign: 'left',
    // width: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10
  },
  trending: {
    color: '#8A8686',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 5
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
  viewAll: {
    fontSize: 10,
    color: '#8A8686'
  },
  photoBlock: {
    width: 10,
    height: 50
  },
  photo: {
    width: 100,
    height: 40,
    position: 'relative',
    left: 50,
    bottom: 10
  },
  // container: {
  //   marginBottom: 56,
  // },
  cardButton: {
    width: '80%',
    fontSize: 12,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#5E93F1',
    borderRadius: 10,
    position: 'relative',
    left: 30,
    paddingTop: 2,
    paddingBottom: 2,
    margin: 5
  },
  avatarStyle: {
    textAlign: 'center',
    // width: '80%'
  },
  cardIcon: {
    fontSize: 60,
  },
  subsView: {
    flexDirection:'row',
    flex: 1,
    flexWrap: 'wrap',
    width: '60%',
    color: '#fff'
  },
  subsText: {
    fontSize: 18,
    // width: '80%',
    color: '#fff'
  },
  width: {
    width: '18%',
    color: '#ffffff'
  },
  cardSubs: {
    margin: 4,
    backgroundColor: '#00C4B4',
    width: '50%'
  },
  serviceCard: {
    margin: 4,
    backgroundColor: '#fff',
    width: '100%'
  },
  petrolFuelCard: {
    margin: 4,
    // backgroundColor: '#CF6679'
  },
  diesalFuelCard: {
    margin: 4,
    // backgroundColor: '#3700B3'
  },
  cngFuelCard: {
    margin: 4,
    // backgroundColor: '#F3B60D'
  },
  cardVehical: {
    margin: 4,
    backgroundColor: '#D69DEF',
    width: '50%'
  },
  contentContainer: {
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  fuelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    lineHeight: 2,
    backgroundColor: '#DBB2FF',
    color: '#fff'
  },
  fab: {
    position: 'relative',
    backgroundColor: '#5E93F1',
    color: '#fff',
    bottom: 28,
  },
  fuelCard: {
    width: '50%'
  }
});
