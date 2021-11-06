import  React, { useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Avatar, Text, Paragraph, Headline, Subheading, Card, Button } from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo'; 
import ScreenWrapper from '../ScreenWrapper';
import {UsersContext } from '../context/UsersContext'

export default function ProfileSctreen({ navigation }) {
    const usersContext = useContext(UsersContext)
    const { users, deleteUsers, deleteVehicle } = usersContext;
    const [userDetails, setUserDetails] = React.useState(users);

    const [showExactTheme, setShowExactTheme] = React.useState(false);
  
    console.log('users------> ', users);

  const logout = () => {
    deleteUsers();
    deleteVehicle();
    navigation.navigate('LoginScreen');
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
          <Appbar.Content
            title= 'Profile'
          >
          </Appbar.Content>
          <Appbar.Action icon="qrcode-scan" onPress={() => navigation.navigate('QRScanScreen')} />
        </Appbar.Header>
          <ScreenWrapper
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
          >
            <Card style={styles.profileCard} >
              <Card.Content>
                <View style={styles.row}>
                  <Avatar.Image
                    style={styles.avatar}
                    source={require('../assets/avatar.png')}
                  />
                <View style={styles.row}>
                  <Headline style={{flex: 1, position: 'absolute', color: '#fff' }}>{userDetails.name}</Headline>
                  <Subheading style={{flex: 1, position: 'absolute', top: 10, color: '#fff' }}>{userDetails.contact}</Subheading>
                </View>
              </View>
              </Card.Content>
            </Card>
            
            <Card >
              <Card.Content>
              <Button icon="file-document-edit-outline" mode="outlined" color='#3f48cc' style={styles.logoutBtn} onPress={() => console.log('Pressed')}>
                View/Update Details
              </Button>
              <Button icon="face-agent" mode="outlined" color='#075200' style={{flexDirection: 'row', marginTop: 30, marginBottom: 5}} onPress={() => console.log('Pressed')}>
                Help & support
              </Button>
              <Button icon="star" mode="outlined" color='#075200' style={{flexDirection: 'row', marginTop: 5, marginBottom: 10}} onPress={() => console.log('Pressed')}>
                Rate Us
              </Button>
              {/* <View style={styles.terms}> */}
                <Button icon="logout" mode="outlined" color='#F5B841' style={{flexDirection: 'row', marginTop: 30, marginBottom: 5}} onPress={() => console.log('Pressed')}>
                  Privacy policy
                </Button>
                <Button icon="logout" mode="outlined" color='#F5B841' style={{flexDirection: 'row', marginTop: 5, marginBottom: 10}} onPress={() => console.log('Pressed')}>
                  Terms & conditions
                </Button>
              {/* </View> */}
              
              <Button icon="logout" mode="outlined" color='#FB3640' contentStyle={{flexDirection: 'row-reverse', textAlign: 'right'}} labelStyle={{textAlign: 'left'}} style={styles.logoutBtn} onPress={logout}>
                Logout
              </Button>
              </Card.Content>
            </Card>

        </ScreenWrapper>
    </>
  );
}
const styles = StyleSheet.create({
    logoutBtn: {
      marginTop: 30,
      marginBottom: 10,
      padding: 5,
      flexDirection: 'row',
      textAlign: 'right',
    },
    terms: {
      marginTop: 30,
      marginBottom: 10,
      padding: 5,
      flexDirection: 'row',
      textAlign: 'right',
      width: '100%'
    },
    profileCard: {
      backgroundColor: '#3f48cc',
      color: '#fff',
      padding: 20
    },
    container: {
      backgroundColor: '#ffffff'
      // padding: 8,
    },
    row: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      textAlign: 'center'
      // paddingVertical: 8,
      // paddingHorizontal: 16,
    },
    avatar: {
      margin: 8,
      // alignItems: 'center',
      // position: 'relative',
      // left: '170'
    },
    contentContainer: {
        paddingVertical: 8,
        backgroundColor: '#ffffff'
    },
    heading: {
        color: '#000',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    logout: {
      color: 'red'
    }
});
