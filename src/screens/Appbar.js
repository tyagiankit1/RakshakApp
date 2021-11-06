import  React, { useEffect, useContext } from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { Appbar, FAB, Switch, Paragraph } from 'react-native-paper';
import ScreenWrapper from '../ScreenWrapper';
import HomeScreen from './HomeScreen';
import ServiceScreen from './ServiceScreen';
import {UsersContext } from '../context/UsersContext';


const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
 
function AppbarScreen ({ navigation }) {
  const usersContext = useContext(UsersContext)
  const { users } = usersContext;
  const [userDetails, setUserDetails] = React.useState(users);
 
  const [showHomeHeader, setShowHomeHeader] = React.useState(true);
  const [showServiceHeader, setShowServiceHeader] = React.useState(false);
  const [showLeftIcon, setShowLeftIcon] = React.useState(true);
  const [showSubtitle, setShowSubtitle] = React.useState(true);
  const [showSearchIcon, setShowSearchIcon] = React.useState(true);
  const [showMoreIcon, setShowMoreIcon] = React.useState(true);
  const [showCustomColor, setShowCustomColor] = React.useState(false);
  const [showExactTheme, setShowExactTheme] = React.useState(false);

  const callHomeScreen = () => {
    setShowHomeHeader(true);
    setShowServiceHeader(false);
  }
  const callServiceScreen = () => {
    setShowHomeHeader(false);
    setShowServiceHeader(true);
  }

  return (
    <>
      {
        (!showHomeHeader) ?
          <Appbar.Header
            style={{ backgroundColor: '#5E93F1' }}
            theme={{
              mode: showExactTheme ? 'exact' : 'adaptive',
            }}
          >
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            {/* <Appbar.Action icon="account" color='#fff' onPress={() => navigation.navigate('ProfileScreen')}  /> */}
            { showServiceHeader ? <Appbar.Content title="Services" color='#fff' /> : <Appbar.Content title="Title" />}
            
            {showMoreIcon && (
              <Appbar.Action icon="qrcode-scan" color='#fff' onPress={() => navigation.navigate('QRScanScreen')} />
            )}
          </Appbar.Header> :
          <Appbar.Header
            style={{ backgroundColor: '#fff' }}
            theme={{
              mode: showExactTheme ? 'exact' : 'adaptive',
            }}
          >
            <Appbar.Action icon="account" onPress={() => navigation.navigate('ProfileScreen')}  />
            <Appbar.Content
              title= 'Hi '
            />
            <Appbar.Content  style={{position: 'relative', right: 120, color: '#5E93F1'}}
              title= {userDetails.name}
            />
            <Appbar.Action icon="qrcode-scan" onPress={() => navigation.navigate('QRScanScreen')} />
          </Appbar.Header>
      }
      <ScreenWrapper
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {/* <Background> */}
        {showHomeHeader ? <HomeScreen /> : 
          showServiceHeader ? <ServiceScreen /> :
          <View style={styles.row}>
            <Paragraph>Left icon</Paragraph>
            <Switch value={showLeftIcon} onValueChange={setShowLeftIcon} />
          </View>
        }
        {/* </Background> */}
      </ScreenWrapper>
      <Appbar
        style={styles.bottom}
        // theme={{ mode: showExactTheme ? 'exact' : 'adaptive' }}
      >

        <Appbar.Action icon="car" color='#fff' onPress={() => {}} style={styles.width} />
        {showServiceHeader ? <FAB icon="toolbox-outline" color='#fff' onPress={ callServiceScreen} style={styles.fab} /> : <Appbar.Action icon="toolbox-outline" color='#fff' onPress={callServiceScreen} style={styles.width} />}
        {showHomeHeader ? <FAB icon="home" color='#fff' onPress={ callHomeScreen} style={styles.fab} /> : <Appbar.Action icon="home" color='#fff' onPress={callHomeScreen} style={styles.width} />}
        
        <Appbar.Action icon="compass-outline" color='#fff' onPress={() => {}} style={styles.width} />
        <Appbar.Action icon="qrcode" color='#fff' onPress={() => {}} style={styles.width} />
      </Appbar>
      
    </>
  );
};

AppbarScreen.title = 'Appbar';

export default AppbarScreen;

const styles = StyleSheet.create({
  container: {
    marginBottom: 56,
    color: '#ffffff'
  },
  width: {
    width: '18%',
    color: '#ffffff'
  },
  contentContainer: {
    paddingVertical: 8,
    backgroundColor: '#ffffff'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
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
    bottom: 5,
  },
});
