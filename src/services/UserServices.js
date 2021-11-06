import axios from 'axios'

const URL = 'http://192.168.1.4:8080/api/';
const SmsAPI = 'http://182.18.144.182/Api/smsapi/JsonPost';
const FuelAPI = 'https://fuelprice-api-india.herokuapp.com/price/';
const IPInfo = 'http://ipinfo.io';


export const sendOtp = async (payload) => {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    const response = await axios.post(SmsAPI, payload)
    console.log(" sendOtp response service: ", response.data)
    return response.data;
}

export const getUserData = async (payload) => {
    const response = await axios.post(URL+'getUserByContact', payload)
    console.log("getUserByContact response service: ", response.data)
    return response.data;
}

export const saveUserData = async (payload) => {
    const response = await axios.post(URL+'addNewUser', payload)
    console.log("addNewUser response service: ", response.data)
    return response.data;
}

export const saveUserVehicle = async (payload) => {
    const response = await axios.post(URL+'addNewVehicle', payload)
    console.log("addNewVehicle response service: ", response.data)
    return response.data;
}

export const updateUserData = async (payload) => {
    const response = await axios.post(URL+'updateUser', payload)
    console.log("updateUser response service: ", response.data)
    return response.data;
}

export const getIpInfo = async () => {
    const response = await axios.get(IPInfo)
    console.log("IPInfo response service: ", response.data)
    return response.data;
}

export const getStateFuelPrice = async (state) => {
    const response = await axios.get(FuelAPI+state)
    console.log("FuelAPI response service: ", response.data)
    return response.data;
}

export const getMechanicDetails = async () => {
    const response = await axios.get(URL+'getAllMechanicDetails')
    console.log("getAllMechanicDetails response service: ", response.data)
    return response.data;
}

export const getUserVehicle = async (payload) => {
    const response = await axios.post(URL+'getVehicleListByUser', payload)
    console.log("getVehicleListByUser response service: ", response.data)
    return response.data;
}
export const getUserOrder = async (payload) => {
    const response = await axios.post(URL+'getVehicleListByUser', payload)
    console.log("getUserOrder response service: ", response.data)
    return response.data;
}
export const getUserQR = async (payload) => {
    const response = await axios.post(URL+'getQRListByUser', payload)
    console.log("getUserQR response service: ", response.data.qrList)
    return response.data.qrList;
}