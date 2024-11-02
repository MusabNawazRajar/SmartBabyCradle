// App.js
import React, {useContext, useEffect, useState} from 'react';
import AuthContextProvider, {AuthContext} from './src/store/auth-context';
import 'firebase/compat/database';
import {AppProvider} from './src/store/app-context';
import {
  getFirebaseReference,
  getFirebaseValueInArryaOfObjects,
  handleReferenceAndState,
} from './src/database/fetchData';
import {Navigation} from './src/util/frScreenRegistrations';
import VIForegroundService from '@voximplant/react-native-foreground-service';
import BackgroundService from 'react-native-background-actions';

import {serverKey} from './important/serverKey';

// Import the required Firebase modules
import 'firebase/auth';
import 'firebase/database';

import {firebaseConfig} from './firebaseConfig';

import firebase from 'firebase/compat/app'; // Make sure to use 'firebase/compat/app'
import {Alert, Text} from 'react-native';
import {sendNotification, sendNotificationBool} from './src/util/notification';

import messaging from '@react-native-firebase/messaging';

const SERVER_KEY = serverKey;

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

let isBGrunning = BackgroundService.isRunning();

const veryIntensiveTask = async taskDataArguments => {
  // Example of an infinite loop task
  const {delay} = taskDataArguments;
  await new Promise(async resolve => {
    for (let i = 0; BackgroundService.isRunning(); i++) {
      const notificationValues = await getFirebaseValueInArryaOfObjects(
        'Notification',
      );

      if (notificationValues) {
        notificationValues.forEach(async ({key, ...notificationValue}) => {
          const {
            Timestamp,
            isNotified,
            isOpened,
            threshholdByUser,
            type,
            value,
          } = notificationValue;

          await sendNotification(notificationValue);
          try {
            // Getting reference to the notification node
            const ref = firebase
              .database()
              .ref(`SmartBabyCradle/Notification/${key}`);
            // Updating isNotified to true
            await ref.update({isNotified: true});
            console.log(
              `Updated isNotified to true for notification with key: ${key}`,
            );
          } catch (error) {
            console.error(
              `Error updating isNotified for notification with key: ${key}`,
              error,
            );
          }
        });
      }
      await sleep(delay);
    }
  });
};

const options = {
  taskName: 'Baby Cradle Monitoring',
  taskTitle: 'Smart Baby Cradle',
  taskDesc: 'Monitoring your baby for a peaceful sleep',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: 'yourSchemeHere://chat/jane',
  parameters: {
    delay: 5000,
  },
};

const createChannel = async () => {
  const channelConfig = {
    id: 'channelId',
    name: 'Channel name',
    description: 'Channel description',
    enableVibration: false,
  };
  await VIForegroundService.getInstance().createNotificationChannel(
    channelConfig,
  );
};

const startForegroundService = async () => {
  const notificationConfig = {
    channelId: 'channelId',
    id: 3456,
    title: 'Title',
    text: 'Some text',
    icon: 'ic_icon',
    button: 'Some text',
  };
  try {
    await VIForegroundService.getInstance().startService(notificationConfig);
  } catch (e) {
    console.error(e);
  }
};

const stopForegroundService = async () => {
  await VIForegroundService.getInstance().stopService();
};

const startBackgroundServices = async () => {
  await BackgroundService.start(veryIntensiveTask, options);
  await BackgroundService.updateNotification({
    taskDesc: 'Caring for Your Little One.',
  });
};

const stopBackgroundServices = async () => {
  await BackgroundService.stop();
};
//i comment it due to crash
// startForegroundService();
startBackgroundServices();

// stopBackgroundServices();
// stopForegroundService();

// Functions to add and remove data change listeners
const addDataListener = (ref, onChange) => ref.on('value', onChange);
const removeDataListener = (ref, onChange) => ref.off('value', onChange);

export default function App() {
  // State variables
  const [babyTemperature, setBabyTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [gasDetected, setGasDetected] = useState(false);
  const [wetnessDetected, setWetnessDetected] = useState(false);
  const [cryingDetection, setCryingDetection] = useState(false);
  const [cradleStatus, setCradleStatus] = useState(false);

  const configurations = [
    {
      ref: getFirebaseReference('BabyTemperature'),
      stateUpdater: setBabyTemperature,
      label: 'BabyTemperature',
    },
    {
      ref: getFirebaseReference('Temperature'),
      stateUpdater: setTemperature,
      label: 'Temperature',
    },
    {
      ref: getFirebaseReference('Humidity'),
      stateUpdater: setHumidity,
      label: 'Humidity',
    },
    {
      ref: getFirebaseReference('GasDetection'),
      stateUpdater: setGasDetected,
      label: 'GasDetection',
    },
    {
      ref: getFirebaseReference('Wetness'),
      stateUpdater: setWetnessDetected,
      label: 'Wetness',
    },
    {
      ref: getFirebaseReference('BabyCries'),
      stateUpdater: setCryingDetection,
      label: 'BabyCries',
    },
  ];

  useEffect(handleReferenceAndState(configurations), []);

  const value = {
    wetnessDetected,
    setWetnessDetected,
    gasDetected,
    setGasDetected,
    temperature,
    setTemperature,
    humidity,
    setHumidity,
    cryingDetection,
    setCryingDetection,
  };

  return (
    <>
      <AuthContextProvider>
        <AppProvider value={value}>
          <Navigation />
        </AppProvider>
      </AuthContextProvider>
    </>
  );
}
