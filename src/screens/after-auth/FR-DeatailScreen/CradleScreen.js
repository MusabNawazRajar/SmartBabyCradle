import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { getDatabase, ref, get, set } from 'firebase/database';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CradleScreen = () => {
  const [isCradleOn, setIsCradleOn] = useState(false);

  useEffect(() => {
    const database = getDatabase();
    const cradleRef = ref(database, 'SmartBabyCradle/UserCustomization/Cradle/isCradleOn');

    get(cradleRef)
      .then((snapshot) => {
        const valueFromDatabase = snapshot.val();
        if (valueFromDatabase !== null) {
          setIsCradleOn(valueFromDatabase);
        }
      })
      .catch((error) => console.error('Error fetching cradle status:', error));
  }, []);

  const handleSwitchToggle = () => {
    const database = getDatabase();
    const cradleRef = ref(database, 'SmartBabyCradle/UserCustomization/Cradle/isCradleOn');

    set(cradleRef, !isCradleOn)
      .then(() => console.log('Cradle status updated successfully'))
      .catch((error) => console.error('Error updating cradle status:', error));

    setIsCradleOn(!isCradleOn);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer} onPress={handleSwitchToggle}>
        <Icon name="baby-carriage" size={100} color={isCradleOn ? '#27ae60' : '#3498db'} />
      </TouchableOpacity>
      <Text style={styles.title}>Cradle Control</Text>
      <Text style={styles.guidelines}>
        Customize the cradle settings to ensure a peaceful sleep for your baby. Turn the cradle on
        or off based on your baby's sleep routine. Adjust the rocking motion for maximum comfort.
      </Text>
      <View style={styles.switchContainer}>
        <Text style={[styles.switchLabel, { color: isCradleOn ? '#27ae60' : '#3498db' }]}>
          {isCradleOn ? 'Cradle is On' : 'Cradle is Off'}
        </Text>
        <Switch
          trackColor={{ false: '#bdc3c7', true: '#27ae60' }}
          thumbColor={isCradleOn ? '#27ae60' : '#ecf0f1'}
          ios_backgroundColor="#bdc3c7"
          onValueChange={handleSwitchToggle}
          value={isCradleOn}
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

export default CradleScreen;
