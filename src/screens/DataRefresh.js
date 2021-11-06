import  React, { useState, useEffect, useContext } from 'react';
import {UsersContext } from '../context/UsersContext';

const URL = 'http://192.168.1.4:8080/api/';
const FuelAPI = 'https://fuelprice-api-india.herokuapp.com/price/';
const IPInfo = 'http://ipinfo.io';

export default function DataRefreash() {
    const usersContext = useContext(UsersContext)
    const { users, updateUser, vehicle, mechanic, addNewVehicle, fuelDetails, updateVehicle, addNewMechanic, refreshMechanic, addFuelDetails } = usersContext;

    const [isUserDataRefreshed, setIsUserDataRefreshed] = React.useState(false);
    // const [isUserDataRefreshed, setIsUserDataRefreshed] = React.useState(false);



    useEffect(() => {
        console.log("users: ", users);
        if(users !== undefined && users.length !== 0)
        var payload = {
            "contact": users.contactNo
        };
          getUserData(payload).then(( data ) => {
            console.log("response: ", data);
            setIsUserDataRefreshed(true);
            updateUser(data[0]);
            navigation.navigate('BottomNavigation', data[0]);
          })
        // fetchMechanicDetails();
      }, [isUserDataRefreshed, users]);

      return isUserDataRefreshed;
}
