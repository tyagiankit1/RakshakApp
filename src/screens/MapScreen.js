import  React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, StyleSheet, View, Alert, Platform, Linking,  } from 'react-native';
// Import Map and Marker
import MapView from 'react-native-map-clustering';
import {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import { Appbar, Chip, Caption, Text, Card, Subheading, Divider, useTheme, Avatar, IconButton } from 'react-native-paper';
import { color } from 'react-native-reanimated';
import ScrollBottomSheet from "react-native-scroll-bottom-sheet";
import {getDistance, getPreciseDistance} from 'geolib';
import call from 'react-native-phone-call';
// import type { StackNavigationProp } from '@react-navigation/stack';
import ScreenWrapper from '../ScreenWrapper';

import {UsersContext } from '../context/UsersContext';
import BottomDrawer from 'react-native-bottom-drawer-view';

const TAB_BAR_HEIGHT = 1;

export default function MapScreen({navigation}) {
  const theme = useTheme();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [errorLocationMsg, setLocationErrorMsg] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const usersContext = useContext(UsersContext)
  const { users, vehicle, mechanic, refreshMechanic } = usersContext;
  const [mechanicType, setMechanicType] = useState(navigation.state.params);
  const [vehicleType, setVehicleType] = useState('Both');
  const [mechanicDetails, setMechanicDetails] = useState([]);
  const [markerPoints, setMarkerPoints] = useState([]);
  const [selectedMechanic, setSelectedMechanic] = useState(null);

  const renderHandle = () => {
    let details = mechanic.find(obj => {
      return obj.mechanicID === selectedMechanic.title
    })
    let diff = getPreciseDistance(
      {latitude: selectedMechanic.latitude, longitude: selectedMechanic.longitude},
      {latitude: initialRegion['latitude'], longitude: initialRegion['longitude']}
    );
    console.log("mechanic: ", mechanic);
    return (
      <Card style={[styles.serviceCard]} mode='elevated'>
        <Card.Title
            left={(props) =>  <Avatar.Icon {...props} style={{backgroundColor: '#3f48cc', padding: 10}} icon= "file-document-outline" /> }
            title={details.name}
            style={{backgroundColor: '#3f48cc', color: '#fff', borderTopLeftRadius: 10, borderTopRightRadius: 10, margin: 0, padding: 0}}
            titleStyle={{backgroundColor: '#3f48cc', color: '#fff', borderTopLeftRadius: 10, borderTopRightRadius: 10, margin: 0, padding: 0}}
            color= '#fff'
        />
        <Card.Content>
            <View >
                <Subheading>Address: </Subheading><Caption>{details.address}</Caption>
                <Subheading>Distance: </Subheading><Caption>{diff/1000} Km</Caption>
            </View>
            <View style={styles.row}>
              <IconButton size={34} color='#094971'  icon="phone" onPress={() => callMechanic(details.contact)} />
              <IconButton size={34} color='#094971'  icon="directions-fork" onPress={() => redirectMap(details)} />
            </View>
        </Card.Content>
      </Card>
    )
}

  function redirectMap(details){
      let location = JSON.parse(details.location);
      const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
      const latLng = `${location['lat']},${location['long']}`;
      const label = details.name;

      const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
      });
      Linking.openURL(url);
  }
  

  function callMechanic(contact){
    console.log('contact: ', contact)
    const args = {
      number: "+91"+contact,
      prompt: true,
    };
    // Make a call
    call(args).catch(console.error);
  }
  
  function dafaultMarkers(currentLocation) {
    console.log('currentLocation: ', currentLocation)
    setVehicleType("Both");
      // if(mechanicDetails.length === 0){
        let tempList = [];
        let markerList = [
          {
            id: 'current',
            title: 'Your location',
            coordinates: {
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude
            },
          }
        ];
        for(let i=0; i < mechanic.length; i++){
          let temp = mechanic[i];
          tempList.push(temp);
          if(validateDistance(mechanic[i].location, currentLocation)){
            markerList.push({
              id: i,
              title: mechanic[i].mechanicID,
              coordinates: {
                latitude: parseFloat(JSON.parse(mechanic[i].location).lat),
                longitude: parseFloat(JSON.parse(mechanic[i].location).long)
              },
            })
          }
          
        }
        setMechanicDetails(tempList);
        setMarkerPoints(markerList)
      // }
    }

    function motorBikeMarkers(currentLocation) {
      console.log('currentLocation: ', currentLocation);
      setVehicleType("2 Wheeler");
        let tempList = [];
        let markerList = [
          {
            id: 'current',
            title: 'Your location',
            coordinates: {
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude
            },
          }
        ];
        for(let i=0; i < mechanic.length; i++){
          if(mechanic[i].type === '2 Wheeler'){
            let temp = mechanic[i];
            tempList.push(temp);
            if(validateDistance(mechanic[i].location, currentLocation)){
              markerList.push({
                id: i,
                title: mechanic[i].mechanicID,
                coordinates: {
                  latitude: parseFloat(JSON.parse(mechanic[i].location).lat),
                  longitude: parseFloat(JSON.parse(mechanic[i].location).long)
                },
              })
            }
          }
        }
        setMechanicDetails(tempList);
        setMarkerPoints(markerList)
      // }
    }

    function carMarkers(currentLocation) {
      console.log('currentLocation: ', currentLocation);
      setVehicleType("4 Wheeler");
        let tempList = [];
        let markerList = [
          {
            id: 'current',
            title: 'Your location',
            coordinates: {
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude
            },
          }
        ];
        for(let i=0; i < mechanic.length; i++){
          if(mechanic[i].type === '4 Wheeler'){
            let temp = mechanic[i];
            tempList.push(temp);
            if(validateDistance(mechanic[i].location, currentLocation)){
              markerList.push({
                id: i,
                title: mechanic[i].mechanicID,
                coordinates: {
                  latitude: parseFloat(JSON.parse(mechanic[i].location).lat),
                  longitude: parseFloat(JSON.parse(mechanic[i].location).long)
                },
              })
            }
          }
        }
        setMechanicDetails(tempList);
        setMarkerPoints(markerList)
      // }
    }

    function mapMarkers() {
      return markerPoints.map((report) => <Marker
        key={report.id}
        coordinate={report.coordinates}
        // title={report.title}
        onPress={() => setSelectedMechanic(report)}
      >
      </Marker >)
    }

  useEffect(() => {
    (async () => {
      // await refreshMechanic();
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getLastKnownPositionAsync({
        accuracy: 1,
      });
      setCurrentLocation(location.coords);
      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      })
      
      dafaultMarkers(location.coords);
    })();
  }, []);

  function validateDistance(location, initialRegion){
    let show = false;
    let diff = getPreciseDistance(
      {latitude: JSON.parse(location).lat, longitude: JSON.parse(location).long},
      {latitude: initialRegion['latitude'], longitude: initialRegion['longitude']}
    );
      if((diff / 1000) < 200){
        show = true;
        console.log('diff: ', diff / 1000);
      }
    return show;
  }

  // const renderHandle = () => (
  //   <View style={[styles.header, { backgroundColor: '#fff' }]}>
  //     <View style={styles.panelHandle} />
  //     <Divider style={{ alignSelf: "stretch", marginTop: 10 }} />
  //   </View>
  // );

  return (
    <>
      <Appbar.Header
            style={{ backgroundColor: '#5E93F1', color: '#fff'}}
            theme={{
              mode: 'adaptive',
            }}
          >
            <Appbar.BackAction color='#fff' onPress={() => navigation.goBack()} />
            <Appbar.Content
              color='#fff'
              title= {mechanicType}
              subtitle='Mechanic'
            >
                
            </Appbar.Content>
            <Appbar.Action color='#fff' icon="qrcode-scan" onPress={() => navigation.navigate('QRScanScreen')} />
            
        </Appbar.Header>
        
          <Text style={styles.paragraph}>{errorLocationMsg}</Text>
        {markerPoints.length !== 0 && markerPoints !== undefined && initialRegion !== null ? 
        <SafeAreaView style={{flex: 1}}>
        <View style={[ styles.chipContainer]}>

          {
            vehicleType === 'Both' ?
            <>
              <Chip mode='outlined' style={{marginLeft: 5, marginRight: 5}} icon="car" onPress={() => carMarkers(currentLocation)}>4 Wheeler</Chip>
              <Chip mode='outlined' style={{marginLeft: 5, marginRight: 5}} icon="motorbike" onPress={() => motorBikeMarkers(currentLocation)}>2 Wheeler</Chip>
              <Chip mode='outlined' style={{marginLeft: 5, marginRight: 5}} style={{backgroundColor: '#fff'}} selected={false} selectedColor='#3f48cc' icon="information" onPress={() => dafaultMarkers(currentLocation)}>Both</Chip>
            </>
            :  vehicleType === '2 Wheeler' ?
            <>
              <Chip mode='outlined' style={{marginLeft: 5, marginRight: 5}} icon="car" onPress={() => carMarkers(currentLocation)}>4 Wheeler</Chip>
              <Chip mode='outlined' style={{marginLeft: 5, marginRight: 5}} style={{backgroundColor: '#fff'}} selected={false} selectedColor='#3f48cc' icon="motorbike" onPress={() => motorBikeMarkers(currentLocation)}>2 Wheeler</Chip>
              <Chip mode='outlined' style={{marginLeft: 5, marginRight: 5}} icon="information" onPress={() => dafaultMarkers(currentLocation)}>Both</Chip>
            </>
            :  
            <>
              <Chip mode='outlined' style={{marginLeft: 5, marginRight: 5}} style={{backgroundColor: '#fff'}} selected={false} selectedColor='#3f48cc' icon="car" onPress={() => carMarkers(currentLocation)}>4 Wheeler</Chip>
              <Chip mode='outlined' style={{marginLeft: 5, marginRight: 5}} icon="motorbike" onPress={() => motorBikeMarkers(currentLocation)}>2 Wheeler</Chip>
              <Chip mode='outlined' style={{marginLeft: 5, marginRight: 5}} icon="information" onPress={() => dafaultMarkers(currentLocation)}>Both</Chip>
            </>
          }

          
        </View>
        <View style={styles.container}>
        
          <MapView
            style={styles.mapStyle}
            initialRegion={initialRegion}
            >
              {mapMarkers()}
          </MapView>
          {
            selectedMechanic !== null && selectedMechanic.id !== 'current' ?
              // <BottomDrawer
              //     containerHeight={300}
              //     offset={TAB_BAR_HEIGHT}
              //     style={{border: '1px solid red'}}
              // >
              //     {this.renderContent()}
              // </BottomDrawer>
              <ScrollBottomSheet
                  componentType="FlatList"
                  snapPoints={['65%', "65%", "90%"]}
                  initialSnapIndex={2}
                  renderHandle={renderHandle}
                  // data={Array.from({ length: 200 }).map((_, i) => String(i))}
                  keyExtractor={(i) => i}            
                >
              </ScrollBottomSheet>
            : <></>

          }
          
          
        </View>
      </SafeAreaView>
      : <Text style={styles.paragraph}>{errorLocationMsg}</Text>
        }
        
    </>
    
  );
}

const styles = StyleSheet.create({
    chipContainer: {
      zIndex: 999,
      position: 'absolute',
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginLeft: 20,
    },
    container: {
        position: 'absolute',
        top: -25,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1,
        backgroundColor: "#FFF",
      },
      mapStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      paragraph: {
        fontSize: 18,
        textAlign: 'center',
      },
      header: {
        alignItems: "center",
        backgroundColor: "#fff",
        paddingVertical: 10,
      },
      panelHandle: {
        width: 30,
        height: 7,
        backgroundColor: "#fff",
        borderRadius: 4,
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // paddingVertical: 8,
        // paddingHorizontal: 16,
      },
});