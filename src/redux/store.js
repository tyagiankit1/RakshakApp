import { createStore } from 'redux'
import userReducer from './userApp'

const store = createStore(userReducer)

export default store
