import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { getDatabase, ref, get, set } from 'firebase/database';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CryingScreen = () => {
  const [isMusicOn, setIsMusicOn] = useState(false);

  useEffect(() => {
    const database = getDatabase();
    const musicRef = ref(database, 'SmartBabyCradle/UserCustomization/Music/isMusicOn');

    get(musicRef)
      .then((snapshot) => {
        const valueFromDatabase = snapshot.val();
        if (valueFromDatabase !== null) {
          setIsMusicOn(valueFromDatabase);
        }
      })
      .catch((error) => console.error('Error fetching music status:', error));
  }, []);

  const handleSwitchToggle = () => {
    const database = getDatabase();
    const musicRef = ref(database, 'SmartBabyCradle/UserCustomization/Music/isMusicOn');

    set(musicRef, !isMusicOn)
      .then(() => console.log('Music status updated successfully'))
      .catch((error) => console.error('Error updating music status:', error));

    setIsMusicOn(!isMusicOn);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer} onPress={handleSwitchToggle}>
        <Icon name="music-note" size={100} color={isMusicOn ? '#27ae60' : '#3498db'} />
      </TouchableOpacity>
      <Text style={styles.title}>Music Control</Text>
      <Text style={styles.guidelines}>
        Customize the music settings to create a soothing environment for your baby. Turn the
        music on or off based on your baby's sleep routine. Choose calming melodies for a
        comfortable atmosphere.
      </Text>
      <View style={styles.switchContainer}>
        <Text style={[styles.switchLabel, { color: isMusicOn ? '#27ae60' : '#3498db' }]}>
          {isMusicOn ? 'Music is On' : 'Music is Off'}
        </Text>
        <Switch
          trackColor={{ false: '#bdc3c7', true: '#27ae60' }}
          thumbColor={isMusicOn ? '#27ae60' : '#ecf0f1'}
          ios_backgroundColor="#bdc3c7"
          onValueChange={handleSwitchToggle}
          value={isMusicOn}
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

export default CryingScreen;
