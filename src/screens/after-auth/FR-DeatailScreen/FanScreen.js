import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { getDatabase, ref, get, set } from 'firebase/database';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FanScreen = () => {
  const [isFanOn, setIsFanOn] = useState(false);

  useEffect(() => {
    const database = getDatabase();
    const fanRef = ref(database, 'SmartBabyCradle/UserCustomization/Fan/isFanOn');

    get(fanRef)
      .then((snapshot) => {
        const valueFromDatabase = snapshot.val();
        if (valueFromDatabase !== null) {
          setIsFanOn(valueFromDatabase);
        }
      })
      .catch((error) => console.error('Error fetching fan status:', error));
  }, []);

  const handleSwitchToggle = () => {
    const database = getDatabase();
    const fanRef = ref(database, 'SmartBabyCradle/UserCustomization/Fan/isFanOn');

    set(fanRef, !isFanOn)
      .then(() => console.log('Fan status updated successfully'))
      .catch((error) => console.error('Error updating fan status:', error));

    setIsFanOn(!isFanOn);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer} onPress={handleSwitchToggle}>
        <Icon name="fan" size={100} color={isFanOn ? '#27ae60' : '#3498db'} />
      </TouchableOpacity>
      <Text style={styles.title}>Fan Control</Text>
      <Text style={styles.guidelines}>
        Adjust the fan settings to ensure optimal comfort for your baby. Turn the fan on or off
        based on the room temperature. Always keep an eye on your baby's comfort level.
      </Text>
      <View style={styles.switchContainer}>
        <Text style={[styles.switchLabel, { color: isFanOn ? '#27ae60' : '#3498db' }]}>
          {isFanOn ? 'Fan is On' : 'Fan is Off'}
        </Text>
        <Switch
          trackColor={{ false: '#bdc3c7', true: '#27ae60' }}
          thumbColor={isFanOn ? '#27ae60' : '#ecf0f1'}
          ios_backgroundColor="#bdc3c7"
          onValueChange={handleSwitchToggle}
          value={isFanOn}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  iconContainer: {
    backgroundColor: 'rgba(52, 152, 219, 0.1)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3498db',
    marginTop: 20,
  },
  guidelines: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 18,
    marginRight: 10,
  },
});

export default FanScreen;
