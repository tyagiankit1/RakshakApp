import  React, { useState, useEffect, useContext } from 'react';
import { Appbar, BottomNavigation, Text } from 'react-native-paper';


import {UsersContext } from '../context/UsersContext';
import HomeScreen from './HomeScreen';
import ServiceScreen from './ServiceScreen';
import VehicleScreen from './VehicleScreen';
import QRScreen from './MyQRScreen';
import ViewNotes from './ViewNotes';



function BottomNav({ navigation }) {
  const HomeRoute = () => <HomeScreen navigation={navigation}  /> ;

  const ServicesRoute = () => <ServiceScreen navigation={navigation} />;
  
  const VehicleRoute = () => <VehicleScreen navigation={navigation} />;

  const QRRoute = () => <QRScreen navigation={navigation} />;

  const sqlRoute = () => <ViewNotes navigation={navigation} />;
  
  const usersContext = useContext(UsersContext)
  const { users } = usersContext;
  const [userDetails, setUserDetails] = React.useState(navigation.state.params);
  const [userName] = React.useState(<><Text>Hi</Text> <Text style={{color: '#00a8f3'}}>{userDetails.name}</Text></>);
  const [showMoreIcon, setShowMoreIcon] = React.useState(true);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: 'home', color: '#DBB2FF'  },
    { key: 'services', title: 'Services', icon: 'toolbox-outline', color: '#009688' },
    { key: 'vehicles', title: 'My Vehicles', icon: 'car', color: '#795548' },
    { key: 'qr', title: 'My QR', icon: 'qrcode', color: '#795548' },
    // { key: 'sql', title: 'SqlData', icon: 'database-search', color: '#795548' },
  ]);

  // console.log(navigation.state.params)
  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    services: ServicesRoute,
    vehicles: VehicleRoute,
    qr: QRRoute,
    // sql: sqlRoute,
  });


  return (
    <>
    <Appbar.Header
    style={{ backgroundColor: '#fff' }}
    theme={{
      mode: 'adaptive',
    }}
  >
    <Appbar.Action icon="account" onPress={() => navigation.navigate('ProfileScreen')}  />
    <Appbar.Content style={{ color: '#5E93F1'}}
      title= {userName}
    />
    <Appbar.Action icon="qrcode-scan" onPress={() => navigation.navigate('QRScanScreen')} />
  </Appbar.Header>
      
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      // style={{backgroundColor: '#DBB2FF'}}
    />
    </>
  );
};

export default BottomNav;