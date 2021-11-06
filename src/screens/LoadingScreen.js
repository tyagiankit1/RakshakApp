import  React, { useState, useEffect, useContext } from 'react';

import Background from '../components/Background';
import Logo from '../components/Logo'; 
import {BarCodeScanner} from 'expo-barcode-scanner';
import * as Location from 'expo-location';
import {UsersContext } from '../context/UsersContext'
import { getIpInfo, getStateFuelPrice, getUserData, getMechanicDetails, getUserVehicle, getUserQR } from '../services/UserServices';
const axios = require('axios');

const URL = 'http://192.168.1.4:8080/api/';

export default function LoadingScreen({ navigation }) {
  const usersContext = useContext(UsersContext)
  const { 
    users, 
    updateUser,
    fuelDetails,
    deleteFuelDetails,
    addFuelDetails,
    mechanic,
    addNewMechanic, 
    deleteMechanic,   
    vehicle, 
    addNewVehicle, 
    updateVehicle,
    userQR, 
    addNewQRDetails, 
    updateQRDetails
   } = usersContext;
  
  const [isUserDataRefreshed, setIsUserDataRefreshed] = React.useState(false);
  const [isUserVehicleRefreshed, setIsUserVehicleRefreshed] = React.useState(false);
  const [isUserQRRefreshed, setIsUserQRRefreshed] = React.useState(false);
  const [isFuelRefreshed, setIsFuelRefreshed] = React.useState(false);
  const [isMechanicRefreashed, setIsMechanicRefreashed] = React.useState(false);

  useEffect(() => {
    (async () => {
      await Location.requestForegroundPermissionsAsync();
      await BarCodeScanner.requestPermissionsAsync();
    })();
  }, []);


  // User details
  useEffect(() => {
    // console.log('users: ', users);
    // console.log('mechanic: ', mechanic);
    setTimeout(() => {
      console.log('users: ', users);
      if(users !== undefined && users.length !== 0 && !isUserDataRefreshed){
        var payload = {
          "contact": users.contactNo
        };
        getUserData(payload).then(( data ) => {
          setIsUserDataRefreshed(true);
          updateUser(data[0]);
          navigation.navigate('BottomNavigation', data );
        })
      }else if((users === undefined || users.length === 0) && !isUserDataRefreshed){
        
          setIsUserDataRefreshed(true);
          setIsUserVehicleRefreshed(true);
          console.log("Load Login screen from loading page: ", users);
          navigation.navigate('LoginScreen');
        
      } 
    }, 6000);
  }, [isUserDataRefreshed, users]);

  // Vehicle details
  useEffect(() => {
    if(users !== undefined && users.length !== 0 && vehicle !== undefined && !isUserVehicleRefreshed){
    var payload = {
      "userID": users.userID
    };
    console.log('payload: ', payload)
    getUserVehicle(payload).then(( data ) => {
        console.log('veh data: ', data)
        setIsUserVehicleRefreshed(true);
        if(vehicle.length === 0 ){
          for(let i=0; i< data.length; i++){
            addNewVehicle(data[i]);
          }
        } else{
          for(let i=0; i< data.length; i++){
            let temp = vehicle.filter(veh => veh.vehicleID === data[i].vehicleID )
            if(temp.length === 0){
              addNewVehicle(data[i]);
            }else{
              updateVehicle(data[i]);
            }            
          }
        }        
        // moveForward();
      })
    }
  }, [isUserVehicleRefreshed, vehicle]);

  // QR Details
  useEffect(() => {
    if(users !== undefined && users.length !== 0 && userQR !== undefined && !isUserQRRefreshed){
    var payload = {
      "userID": users.userID
    };
    console.log('payload: ', payload)
    getUserQR(payload).then(( data ) => {
        console.log('qr data: ', data)
        setIsUserQRRefreshed(true);
        if(userQR.length === 0 ){
          for(let i=0; i< data.length; i++){
            addNewQRDetails(data[i]);
          }
        } else{
          for(let i=0; i< data.length; i++){
            let temp = userQR.filter(veh => veh.qrCode === data[i].qrCode )
            if(temp.length === 0){
              addNewQRDetails(data[i]);
            }else{
              updateQRDetails(data[i]);
            }            
          }
        }        
        // moveForward();
      })
    }
  }, [isUserQRRefreshed, userQR]);

  // Mechanic details
  useEffect(() => {
    if(mechanic !== undefined && mechanic.length === 0 && !isMechanicRefreashed){
      getMechanicDetails().then(( data ) => {
        deleteMechanic();
        setIsMechanicRefreashed(true);
          addNewMechanic(data);
          // moveForward();
      })
    }
  }, [isMechanicRefreashed, mechanic]);

  // Fuel details
  useEffect(() => {
    if(fuelDetails !== undefined && fuelDetails.length === 0 && !isFuelRefreshed){
      getIpInfo().then(( data ) => {
        let state = data.region.replace(' ', '-');
        getStateFuelPrice(state).then(( data ) => {
          if(fuelDetails !== undefined && fuelDetails.length === 0){
            deleteFuelDetails();
            addFuelDetails({state: state, list: data});
            setIsFuelRefreshed(true);
            // moveForward();
          }  
        })
      })
    }
  }, [isFuelRefreshed, fuelDetails]);


  return (
    <Background>
      <Logo />
    </Background>
  );
}
