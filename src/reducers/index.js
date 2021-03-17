import { combineReducers } from 'redux';
import {firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore";
import puttsReducer from './putts';
import socketReducer from './socket/index'

const rootReducer = combineReducers({
  socketState: socketReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  puttsState: puttsReducer,
});
 
export default rootReducer;