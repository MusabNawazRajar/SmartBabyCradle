const sendNotification = async temp => {
    try {
      const token = await messaging().getToken();
      const timestamp = new Date().toISOString();
  
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
            title: 'Temperature Notification',
            body: `Temperature is ${temp}°C`,
          },
        }),
      });
  
      console.log('Notification response:', response);
  
      // Log the notification details to Firebase Realtime Database
      await database().ref('/SBC/Notified').set({
        value: temp,
        timestamp: timestamp,
      });
    } catch (error) {
      console.error('Error sending notification:', error);
      Alert.alert('Notification Error', 'Failed to send notification');
    }
  };
  
  const scheduleNotification = async temp => {
    const timestamp = new Date().toISOString();
    const scheduledTimestamp = new Date(Date.now() + 1 * 60 * 1000).toISOString(); // Set delay to 1 minute
  
    console.log('Scheduling notification for 1 minute later');
  
    // Log the notification details to Firebase Realtime Database
    await database().ref('/SBC/Notified').set({
      value: temp,
      timestamp: timestamp,
      scheduledTimestamp: scheduledTimestamp,
    });
  };
  
  const checkAndSendNotification = async () => {
    try {
      const tempLimit = await fetchData();
      const previousNotifiedValue = await database()
        .ref('/SBC/Notified/value')
        .once('value');
  
      if (!previousNotifiedValue.exists()) {
        // Notify only if no previous value
        sendNotification(tempLimit);
      } else if (tempLimit > previousNotifiedValue.val()) {
        // Notify if the current temperature is higher
        sendNotification(tempLimit);
      } else {
        // Schedule a notification for 5 minutes later with the same value
        scheduleNotification(tempLimit);
      }
    } catch (error) {
      console.error('Error checking and sending notification:', error);
    }
  };