import  React, { useState, useEffect, useContext } from 'react';
import { BackHandler, Alert, StyleSheet, View, Pressable } from 'react-native';
import { Appbar, TextInput, Button, Text, FAB, Card, Avatar } from 'react-native-paper';
// import type { StackNavigationProp } from '@react-navigation/stack';
import ScreenWrapper from '../ScreenWrapper';



export default function ServiceScreen({navigation}) {
  
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

// console.log('navigation: ', )
  return (
    <>
    {
      JSON.stringify(navigation.state.params).includes('showAppbar')?
        <Appbar.Header
          style={{ backgroundColor: '#5E93F1', color: '#fff'}}
          theme={{
            mode: 'adaptive',
          }}
        >
        <Appbar.BackAction color='#fff' onPress={() => navigation.goBack()} />
        <Appbar.Content color='#fff' style={{ color: '#fff'}}
          title= 'Services'
        />
        <Appbar.Action color='#fff' icon="qrcode-scan" onPress={() => navigation.navigate('QRScanScreen')} />
      </Appbar.Header>
      : <Text></Text>
    }
    
    <ScreenWrapper>
      <View style={styles.row}>
        <Text style={styles.heading} >Searching for any Vehicle?</Text> 
      </View> 
      <View style={styles.row}>
        <TextInput
          mode="outlined"
          label="Eg: 'UP15DD7321'"
          autoCapitalize="characters"
          style={{backgroundColor: '#fff', width: '60%'}}
        />
        <Button
          mode="contained"
          icon="magnify"
          labelStyle={{fontSize: 16}}
          uppercase = {false}
          onPress={() => {}}
          style={styles.button}
        >
          Search
        </Button>
      </View>
      <View style={styles.row}>
        <Text style={styles.heading} >Emergency Services</Text> 
      </View> 
      <View style={styles.row}>
        <Card style={styles.serviceCard} mode='elevated'>
          <Card.Content>
          <View style={styles.row}>
          <Pressable onPress={() => navigation.navigate('MapScreen', 'Flat Tyre')} >
            <View >
              <Avatar.Image
                style={[styles.avatar, styles.serviceIcon]} 
                source={require('../assets/icons/flat-tyre.jpeg')}
              />
              <Text style={styles.serviceBlock}>Flat Tyre</Text>
            </View> 
            </Pressable>
          <Pressable onPress={() => navigation.navigate('MapScreen', 'Car Jumpstart')} >
            <View >
              <Avatar.Image
                style={[styles.avatar, styles.serviceIcon]} 
                source={require('../assets/icons/jumpstart.jpeg')}
              />
              <Text style={styles.serviceBlock}>Car Jumpstart</Text>
            </View> 
            </Pressable>
          <Pressable onPress={() => navigation.navigate('MapScreen', 'Engine Scanning')} >
            <View >
              <Avatar.Image
                style={[styles.avatar, styles.serviceIcon]} 
                source={require('../assets/icons/scan.jpeg')}
              />
              <Text style={styles.serviceBlock}>Engine Scanning</Text>
            </View> 
            </Pressable>         
          </View>
          <View style={styles.row}>
          <Pressable onPress={() => navigation.navigate('MapScreen', 'Self-Start issue')} >
            <View  >
              <Avatar.Image
                style={[styles.avatar, styles.serviceIcon]} 
                source={require('../assets/icons/selfstart.jpeg')}
              />
              <Text style={styles.serviceBlock}>Self-Start issue</Text>
            </View> 
            </Pressable>
          <Pressable onPress={() => navigation.navigate('MapScreen', 'Fluid leakage')} >
            <View>
              <Avatar.Image
                style={[styles.avatar, styles.serviceIcon]} 
                source={require('../assets/icons/leak.jpeg')}
              />
              <Text style={styles.serviceBlock}>Fluid leakage</Text>
            </View> 
            </Pressable>
          <Pressable onPress={() => navigation.navigate('MapScreen', 'Towing')} >
            <View >
              <Avatar.Image
                style={[styles.avatar, styles.serviceIcon]} 
                source={require('../assets/icons/towing.jpeg')}
              />
              <Text style={styles.serviceBlock}>Towing</Text>
            </View>  
            </Pressable>        
          </View>
          </Card.Content>
        </Card>
      </View>
      <View style={styles.row}>
        <Text style={styles.heading} >Vehicle Services</Text> 
      </View> 
      <View style={styles.row}>
        <Card style={styles.serviceCard} mode='elevated'>
          <Card.Content>
          <View style={styles.row}>
            <View >
              <Avatar.Image
                style={[styles.avatar, styles.serviceIcon]} 
                source={require('../assets/icons/challan.jpeg')}
              />
              <Text style={styles.serviceBlock}>Challan</Text>
            </View> 
            <View >
              <Avatar.Image
                style={[styles.avatar, styles.serviceIcon]} 
                source={require('../assets/icons/rules.jpeg')}
              />
              <Text style={styles.serviceBlock}>Traffic rules & Fines</Text>
            </View> 
            <View >
                <Avatar.Image
                    style={[styles.avatar, styles.serviceIcon]} 
                    source={require('../assets/icons/alert.jpeg')}
                />
              <Text style={styles.serviceBlock}>Alerts</Text>
            </View>          
          </View>
          </Card.Content>
        </Card>
      </View>
    </ScreenWrapper>
    </>
  );
}

const styles = StyleSheet.create({
  serviceIcon: {
    width: 60,
    margin: 5,
    marginLeft: 20,
    backgroundColor: '#fff'
  },
  avatar: {
    margin: 8,
    alignItems: 'center',
    position: 'relative',
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
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  button: {
    margin: 4,
    backgroundColor: '#ff7f27'
  },
  heading: {
    color: '#000',
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold'
  },
  serviceCard: {
    margin: 4,
    backgroundColor: '#fff',
    width: '100%'
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