/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

// Set up background message handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Message handled in background:', remoteMessage);
  });
  
  // Set up initial notification handler
  messaging().getInitialNotification().then((remoteMessage) => {
    console.log('Initial notification handled:', remoteMessage);
  });

AppRegistry.registerComponent(appName, () => App);
