import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import ViewNotes from '../screens/ViewNotes'
import AddNotes from '../screens/AddNotes'
import LoadingScreen from '../screens/LoadingScreen'
import LoginScreen from '../screens/Login'
import RegisterScreen from '../screens/RegisterScreen'
import AppbarScreen from '../screens/Appbar'
import QRScanScreen from '../screens/QRScanScreen'
import ProfileScreen from '../screens/Profile'
import BottomNav from '../screens/BottomNavigation'
import AddVehical from '../screens/AddVehical'
import MapScreen from '../screens/MapScreen'
import BuyNewQR from '../screens/BuyNewQR'
import QRScanResponseScreen from '../screens/QRScanResponseScreen'
import ServiceScreen from '../screens/ServiceScreen'
import VehicleDetails from '../screens/VehicleDetails'
import QRDetails from '../screens/QRDetails'
import RequestQR from '../screens/RequestQR'

const StackNavigator = createStackNavigator(
  {
    ViewNotes: {
      screen: ViewNotes
    },
    AddNotes: {
      screen: AddNotes
    },
    LoadingScreen: {
      screen: LoadingScreen
    },
    LoginScreen: {
      screen: LoginScreen
    },
    RegisterScreen: {
      screen: RegisterScreen
    },
    ServiceScreen: {
      screen: ServiceScreen
    },
    AppbarScreen: {
      screen: AppbarScreen
    },
    QRScanScreen: {
      screen: QRScanScreen
    },
    ProfileScreen: {
      screen: ProfileScreen
    },
    BottomNavigation: {
      screen: BottomNav
    },
    AddVehical: {
      screen: AddVehical
    },
    MapScreen: {
      screen: MapScreen
    },
    BuyNewQRScreen: {
      screen: BuyNewQR
    },
    QRScanResponseScreen: {
      screen: QRScanResponseScreen
    },
    VehicleDetails: {
      screen: VehicleDetails
    },
    QRDetails: {
      screen: QRDetails
    },
    RequestQR: {
      screen: RequestQR
    }
    
  },
  {
    initialRouteName: 'LoadingScreen',
    headerMode: 'none',
    mode: 'modal'
  }
)

export default createAppContainer(StackNavigator)
