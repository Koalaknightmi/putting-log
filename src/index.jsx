import ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";

import "@fontsource/roboto";

import store from './store';
import App from "./App";
import theme from './styles/theme';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import * as serviceWorker from './serviceWorker';
import {SocketProvider} from "./components/socket"

const rrfConfig = {
  userProfile: "userstesting",
  useFirestoreForProfile: true,
  profileFactory: (user, profileData, firebase) => {
    const profile = {
      email: user.email || user.providerData[0].email,
      userName:user.displayName,
      role:"user",
      nameColor: "black",
      ratings: {
        openOnline: { rt: 1000, rd: 350, rv: 0.6 },
        teamsOnline: { rt: 1000, rd: 350, rv: 0.6 }
      },
      gamesPlayed: 0,
      tournaments: [],
      friends: [],
      monthScore: 0,
      allTimeScore: 0,
      profileImgURL: ``,
      state: "",
      banned: false,
      challenge: {
        active: false,
        opponent: "",
        time: 0
      },
      useDefaultImg:true,
      useCustomImg:false,
    }
    if(user.photoURL){
      profile.useDefaultImg = false
      profile.profileImgURL = user.photoURL
    }
    if (user.providerData && user.providerData.length) {
      profile.providerData = user.providerData
    }
    console.log(profile)
    return profile
  }
};

firebase.initializeApp(JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG_JSON));
firebase.firestore();
firebase.firestore().enablePersistence({synchronizeTabs:true});

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, //since we are using Firestore
};

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ReactReduxFirebaseProvider {...rrfProps}>
        <SocketProvider>
          <App />
        </SocketProvider>
      </ReactReduxFirebaseProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.register();