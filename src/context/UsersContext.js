// force the state to clear with fast refresh in Expo
// @refresh reset

import React, { useEffect, createContext, useState } from 'react';
import {database} from '../components/database'

export const UsersContext = createContext({});

export const UsersContextProvider = props => {
  // Initial values are obtained from the props
  const {
    users: initialUsers,
    vehicle: initialVehicle,
    userOrder: initialUserOrder,
    userQR: initialUserQR,
    mechanic: initialMechanic,
    fuelDetails: initialFuelDetails,
    
    children
  } = props;

  // Use State to store the values
  const [users, setUsers] = useState(initialUsers);
  const [vehicle, setVehicle] = useState(initialVehicle);
  const [userQR, setUserQR] = useState(initialUserQR);
  const [mechanic, setMechanic] = useState(initialMechanic);
  const [userOrder, setUserOrder] = useState(initialUserOrder);
  const [fuelDetails, setFuelDetails] = useState(initialFuelDetails);

  useEffect(() => {
    refreshUsers()
    refreshVehicle()
    refreshUserQR()
    refreshMechanic()
    refreshUserOrder()
    refreshFuelDetails()
  }, [] )

  const addNewUser = userPayload => {
    return database.insertUser(userPayload, refreshUsers)
  };

  const updateUser = userPayload => {
    return database.updateUser(userPayload, refreshUsers)
  };

  const addNewVehicle = vehiclePayload => {
    return database.insertVehicle(vehiclePayload, refreshVehicle)
  };

  const updateVehicle = vehiclePayload => {
    return database.updateVehicle(vehiclePayload, refreshVehicle)
  };  

  const addNewQRDetails = qrPayload => {
    return database.insertUserQRDetails(qrPayload, refreshUserQR)
  };

  const updateQRDetails = qrPayload => {
    return database.updateUserQRDetails(qrPayload, refreshUserQR)
  };

  

  const addNewMechanic = mechanicPayload => {
    return database.insertMechanic(mechanicPayload)
  };

  const addNewUserOrder = userOrderPayload => {
    return database.insertUserOrderDetails(userOrderPayload)
  };

  const addFuelDetails = fuelDetailsPayload => {
    return database.insertFuelDetails(fuelDetailsPayload)
  };

  // const updateMechanic = mechanicPayload => {
  //   return database.updateMechanic(mechanicPayload)
  // }; 

  function userValue(value){
    setUsers(value);
  }

  function vehicleValue(value){
    setVehicle(value);
  }

  function qrValue(value){
    setUserQR(value);
  }

  function mechanicValue(value){
    setMechanic(value);
  }

  function userOrderValue(value){
    setUserOrder(value);
  }

  function fuelDetailsValue(value){
    setFuelDetails(value);
  }

  const refreshUsers = () =>  {
    return database.getUsers(userValue)
  }

  const refreshVehicle = () =>  {
    return database.getVehicle(vehicleValue)
  }

  const refreshUserQR = () =>  {
    return database.getUserQRDetails(qrValue)
  }

  const refreshMechanic = () => {
    return database.getMechanic(mechanicValue)
  }

  const refreshUserOrder = () => {
    return database.getUserOrderDetails(userOrderValue)
  }

  const refreshFuelDetails = () => {
    return database.getFuelDetails(fuelDetailsValue)
  }

  const deleteUsers = () => {
    return database.deleteUsers(refreshUsers)
  }

  const deleteVehicle = () => {
    return database.deleteVehicle(refreshVehicle)
  }

  const deleteMechanic = () => {
    return database.deleteMechanic(refreshMechanic)
  }

  const deleteFuelDetails = () => {
    return database.deleteFuelDetails(refreshFuelDetails)
  }

  // Make the context object:
  const usersContext = {
    users,
    vehicle,
    userQR,
    mechanic,
    userOrder,
    fuelDetails,
    addNewUser,
    addNewVehicle,
    updateUser,
    updateVehicle,
    deleteUsers,
    deleteVehicle,
    addNewMechanic,
    // updateMechanic,
    refreshMechanic,
    deleteMechanic,
    addNewUserOrder,

    addNewQRDetails,
    updateQRDetails,

    addFuelDetails,
    deleteFuelDetails
  };

  // pass the value in provider and return
  return <UsersContext.Provider value={usersContext}>{children}</UsersContext.Provider>;
};