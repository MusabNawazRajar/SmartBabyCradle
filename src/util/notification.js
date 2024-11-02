import database from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';
import {serverKey} from '../../important/serverKey';
import {Alert} from 'react-native';
import firebase from '@react-native-firebase/app';
import {firebaseConfig} from '../../firebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig); // Initialize firebase with your firebaseConfig
}

const SERVER_KEY = serverKey;

export const sendNotification = async notificationValue => {
  try {
    const {threshholdByUser, type, value} = notificationValue;

    const token = await messaging().getToken();

    console.log('Sending notification with token:', token);

    const response = await fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `key=${SERVER_KEY}`,
      },
      body: JSON.stringify({
        to: token,
        notification: {
          title:
            type === 'wetness' || type === 'gas' || type === 'cry'
              ? `${type} Detection`
              : `High ${type}`,
          body:
            type === 'wetness' || type === 'gas' || type === 'cry'
              ? `${type} is Detected, please check`
              : `${type} has ${value} exceed than ${threshholdByUser}, Please alert`,
        },
      }),
    });

    console.log('Notification response:', response);
  } catch (error) {
    console.error('Error sending notification:', error);
    Alert.alert('Notification Error', 'Failed to send notification');
  }
};
