import { combineReducers } from 'redux';
import {firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore";
import socketReducer from './socket/index'

const rootReducer = combineReducers({
  socketState: socketReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});
 
export default rootReducer;