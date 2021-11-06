import * as React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { Appbar, Text, IconButton, Caption,  Avatar, Card, TextInput, Headline, Title, Subheading, Divider, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';
import { color } from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';
// import type { StackNavigationProp } from '@react-navigation/stack';
import ScreenWrapper from '../ScreenWrapper';


export default function VehicleDetails({navigation}) {
    const [vehicleDetails] = React.useState(navigation.state.params);

    // console.log("vehicleDetails -----> ", vehicleDetails);

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
      title= 'Vehicle Details'
    />
    <Appbar.Action icon="qrcode-scan" color='#fff' onPress={() => navigation.navigate('QRScanScreen')} />
  </Appbar.Header>
    <ScreenWrapper>
      
    <Text style={styles.vehType}>{vehicleDetails.vehType}</Text>
      <Card style={styles.serviceCard} mode='elevated'>
            <Card.Title
                title={vehicleDetails.regNumber}
                subtitle={vehicleDetails.owner}
                titleStyle={{color: '#3f48cc'}}
                color='#3f48cc'
                style={{color: '#3f48cc'}}
                left={(props) =>  <Avatar.Icon {...props} style={{backgroundColor: '#3f48cc'}} icon={vehicleDetails.vehType === "4 wheeler" ? "car" : "motorbike"} /> }
                // right={(props) => <IconButton {...props} color='#0ed145' icon="qrcode-plus" onPress={() => {}} />}
            />
            <Card.Content>
                <View style={styles.row}>
                <View style={styles.row}>
                    <Subheading> Model:  </Subheading> 
                    <Caption style={{textAlign: 'left'}}>{vehicleDetails.model}</Caption>
                </View>
                <View style={styles.row}>
                    <Subheading> Brand.:  </Subheading> 
                    <Caption style={{textAlign: 'left'}}>{vehicleDetails.brand}</Caption>
                </View>
                </View>
                <View style={styles.row}>
                <View style={styles.row}>
                    <Subheading> Fuel Type:  </Subheading> 
                    <Caption style={{textAlign: 'left'}}>{vehicleDetails.fuelType}</Caption>
                </View>
                <View style={styles.row}>
                    <Subheading> Transmission:  </Subheading> 
                    <Caption style={{textAlign: 'left'}}>{vehicleDetails.transmissionType}</Caption>
                </View>
                </View>
            {/* <Title style={{textAlign: 'center', height: 80,  color: 'grey', textAlignVertical: 'center' }}>vehical available</Title> */}
            </Card.Content>
            </Card>
            <View style={[styles.row, styles.registerQR]}>
                <Pressable
                    onPress={() => navigation.navigate('RequestQR', vehicleDetails)}
                    // onPress={() => navigation.navigate('BuyNewQRScreen', vehicleDetails)}
                    style={({ pressed }) => [styles.row, styles.registerQR,
                    {
                        width: '100%',
                        marginLeft: 0,
                        backgroundColor: pressed
                        ? '#7E84DD'
                        : '#3f48cc'
                    },
                    styles.wrapperCustom
                    ]}>
                    
                    { vehicleDetails.qrStatus === 0 ? <View style={styles.row}><Subheading style={styles.registerQRText}>Register for new QR</Subheading></View>: <></>}
                    
                </Pressable>
                </View>
            
            <Card style={[styles.serviceCard, {marginTop: 50}]} mode='elevated'>
            <Card.Title
                left={(props) =>  <Avatar.Icon {...props} style={{backgroundColor: '#3f48cc', padding: 10}} icon= "file-document-outline" /> }
                title="Insurance Details"
                style={{backgroundColor: '#3f48cc', color: '#fff', borderTopLeftRadius: 10, borderTopRightRadius: 10, margin: 0, padding: 0}}
                titleStyle={{backgroundColor: '#3f48cc', color: '#fff', borderTopLeftRadius: 10, borderTopRightRadius: 10, margin: 0, padding: 0}}
                color= '#fff'
            />
            <Card.Content>
                <View style={styles.row}>
                    <Subheading>Company: </Subheading><Caption>{vehicleDetails.insuranceNumber === null ? 'Not Available' : vehicleDetails.insuranceNumber }</Caption>
                </View>
                <View style={styles.row}>
                    <Subheading>Expires on: </Subheading><Caption>{vehicleDetails.insuranceExpire === null ? 'Not Available' : vehicleDetails.insuranceExpire }</Caption>
                </View>
            </Card.Content>
        </Card>
        <Card style={[styles.serviceCard, {marginTop: 50}]} mode='elevated'>
            <Card.Title
                left={(props) =>  <Avatar.Icon {...props} style={{backgroundColor: '#3f48cc', padding: 10}} icon= "file-document-outline" /> }
                title="Polution Certificate"
                style={{backgroundColor: '#3f48cc', color: '#fff', borderTopLeftRadius: 10, borderTopRightRadius: 10, margin: 0, padding: 0}}
                titleStyle={{backgroundColor: '#3f48cc', color: '#fff', borderTopLeftRadius: 10, borderTopRightRadius: 10, margin: 0, padding: 0}}
                color= '#fff'
            />
            <Card.Content>
                <View style={styles.row}>
                    <Subheading>Policy Number: </Subheading><Caption>{vehicleDetails.pollutionNumber === null ? 'Not Available' : vehicleDetails.pollutionNumber }</Caption>
                </View>
                <View style={styles.row}>
                    <Subheading>Expires on: </Subheading><Caption>{vehicleDetails.pollutionExpire === null ? 'Not Available' : vehicleDetails.pollutionExpire }</Caption>
                </View>
            </Card.Content>
        </Card>
    </ScreenWrapper>
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
    registerQR: {
        // marginTop: 20,
        marginLeft: 30,
        backgroundColor: '#3f48cc', 
        width: '85%', 
        textAlign: 'center', 
        color: '#fff', 
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        fontSize: 20,
        padding: 1
    },
    registerQRText: {
        textAlign: 'center', 
        color: '#fff', 
        fontSize: 20,
        marginLeft: 30,
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