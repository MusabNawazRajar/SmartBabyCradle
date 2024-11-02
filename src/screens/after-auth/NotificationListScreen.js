import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import {firebaseConfig} from '../../database/firebaseConfig';
import {useNavigation} from '@react-navigation/native';

// Initialize Firebase app if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    const notificationsRef = firebase
      .database()
      .ref('SmartBabyCradle/Notification');
    const handleData = snapshot => {
      if (snapshot.val()) {
        const data = Object.entries(snapshot.val()).map(([key, value]) => ({
          key,
          isOpened: false,
          ...value,
        }));
        setNotifications(data.reverse()); // Reverse the order of notifications
        console.log(notifications);
        setLoading(false);
      } else {
        setNotifications([]);
        setLoading(false);
      }
    };

    notificationsRef.on('value', handleData);

    return () => {
      notificationsRef.off('value', handleData);
    };
  }, []);

  const handleNotificationPress = notification => {
    const notificationRef = firebase
      .database()
      .ref(`SmartBabyCradle/Notification/${notification.key}`);
    notificationRef.update({isOpened: true});
    navigation.navigate('NotificationDetailScreen', {
      notificationKey: notification.key,
      notificationData: notification,
    });
  };


  const formatNotificationTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hours % 12 || 12}:${minutes} ${ampm}`;
    return formattedTime;
  };
  

  const renderNotificationItem = ({ item }) => {
    console.log(item.Timestamp); // Move inside the JSX block
    return (
      <TouchableOpacity onPress={() => handleNotificationPress(item)}>
        <View style={[styles.notificationItem, { backgroundColor: item.isOpened ? '#fff' : '#ccc' }]}>
          <View style={styles.notificationIcon}>
            <Icon name="bell" size={20} color="red" />
          </View>
          <Text style={styles.notificationText}>{generateNotificationMessage(item)}</Text>
          <Text style={styles.notificationTime}>{formatNotificationTime(item.Timestamp)}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  

  const generateNotificationMessage = item => {
    switch (item.type) {
      case 'gas':
        return `Gas detected!`;
      case 'temperature':
        return `Temperature is high (${item.value}°C)`;
      case 'humidity':
        return `Humidity is high (${item.value}%)`;
      case 'wetness':
        return `Wetness detected!`;
      case 'cry':
        return 'Baby Cry Detected';
      default:
        return '';
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          keyExtractor={item => item.key.toString()}
          renderItem={renderNotificationItem}
        />
      ) : (
        <Text style={styles.noNotificationText}>No notifications found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ccc', // Set background color to gray
    borderRadius: 8,
    marginBottom: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    elevation: 2,
  },
  notificationIcon: {
    marginRight: 12,
    padding: 10,
    backgroundColor: '#fff', // Set background color to white
    borderRadius: 999, // large value for circular shape
  },
  notificationText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  noNotificationText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#333',
  },
  notificationTime: {
    fontSize: 12,
    color: '#888',
  },
  
});

export default NotificationScreen;
