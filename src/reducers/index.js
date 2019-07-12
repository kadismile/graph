import { combineReducers } from 'redux'
import auth  from './authReducer'
import graphData  from './graphDataReducer'

export default combineReducers({
  auth,
  graphData
})




