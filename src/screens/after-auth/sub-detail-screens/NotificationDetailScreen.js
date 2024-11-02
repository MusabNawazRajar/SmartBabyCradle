import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import GasSafetyRules from '../../../components/NotificationScreenComp/GasSafetyRules';
import HighTemperatureSafetyRules from '../../../components/NotificationScreenComp/HighTemperatureSafetyRules';
import WetnessSafetyRules from '../../../components/NotificationScreenComp/WetnessSafetyRules';
import HumiditySafetyRules from '../../../components/NotificationScreenComp/HumiditySafetyRules';
import CrySafetyRules from '../../../components/NotificationScreenComp/CrySafetyRules';

const NotificationDetailScreen = ({ route }) => {
  const { notificationData } = route.params;
  const [notification, setNotification] = useState({
    Timestamp: '',
    threshholdByUser: 0,
    type: '',
    value: 0,
  });

  useEffect(() => {
    const notificationsRef = firebase
      .database()
      .ref(`SmartBabyCradle/Notification/${notificationData.key}`);

    // Attach an event listener to retrieve the data when the component mounts
    notificationsRef.once('value', snapshot => {
      const notificationData = snapshot.val();
      setNotification(notificationData);

      // Update isOpened to true when notification is viewed
      notificationsRef.update({ isOpened: true });
    });

    // Detach the event listener when the component unmounts
    return () => {
      notificationsRef.off();
    };
  }, []);

  return (
    <View style={styles.container}>
      {notification.type === 'cry' && (
        <CrySafetyRules timestamp={notification.Timestamp} />
      )}
      {notification.type === 'wetness' && (
        <WetnessSafetyRules timestamp={notification.Timestamp} />
      )}
      {notification.type === 'temperature' && (
        <HighTemperatureSafetyRules timestamp={notification.Timestamp} />
      )}
      {notification.type === 'humidity' && (
        <HumiditySafetyRules timestamp={notification.Timestamp} />
      )}
      {notification.type === 'gas' && (
        <GasSafetyRules timestamp={notification.Timestamp} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NotificationDetailScreen;
