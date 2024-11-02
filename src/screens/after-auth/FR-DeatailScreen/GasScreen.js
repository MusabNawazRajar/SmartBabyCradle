import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { getDatabase, ref, get, update } from 'firebase/database';

const GasScreen = () => {
  const [sensitivityValue, setSensitivityValue] = useState(2000);
  const [sensitivityLevel, setSensitivityLevel] = useState('Moderate Sensitivity');

  useEffect(() => {
    const database = getDatabase();
    const sensitivityRef = ref(database, 'SmartBabyCradle/UserCustomization/Gas/SensitivityLevel');

    get(sensitivityRef)
      .then((snapshot) => {
        const valueFromDatabase = snapshot.val();
        if (valueFromDatabase !== null) {
          setSensitivityValue(valueFromDatabase.value);
          setSensitivityLevel(getLabel(valueFromDatabase.value));
        }
      })
      .catch((error) => console.error('Error fetching sensitivity level:', error));
  }, []);

  const handleSliderChange = (value) => {
    setSensitivityValue(value);
    setSensitivityLevel(getLabel(value));
    updateSensitivityLevel(value);
  };

  const updateSensitivityLevel = (value) => {
    const database = getDatabase();
    const sensitivityRef = ref(database, 'SmartBabyCradle/UserCustomization/Gas/SensitivityLevel');

    update(sensitivityRef, { value })
      .then(() => console.log('Sensitivity level updated successfully'))
      .catch((error) => console.error('Error updating sensitivity level:', error));
  };

  const getLabel = (value) => {
    if (value > 1750) {
      return 'Low Sensitivity';
    } else if (value > 1000) {
      return 'Moderate Sensitivity';
    } else {
      return 'High Sensitivity';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gas Sensitivity Settings</Text>
      <Text style={styles.description}>
        Adjust the sensitivity level to customize gas detection based on your environment.
      </Text>

      <View style={styles.card}>
        <View style={styles.subHeaderContainer}>
          <Text style={styles.subHeader}>Safety Guidelines</Text>
        </View>

        <View style={styles.safetyRulesContainer}>
          <Text style={styles.safetyRule}>1. Keep the gas sensor in a well-ventilated area.</Text>
          <Text style={styles.safetyRule}>2. Regularly check the sensor for any signs of damage or malfunction.</Text>
          <Text style={styles.safetyRule}>3. In case of a gas detection alert, ventilate the area immediately.</Text>
        </View>
      </View>

      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={500}
          maximumValue={5000}
          value={sensitivityValue}
          onValueChange={handleSliderChange}
          step={1}
          minimumTrackTintColor="#3498db"
          maximumTrackTintColor="#bdc3c7"
          thumbTintColor="#3498db"
        />
        <Text style={styles.value}>{sensitivityValue}</Text>
        <Text style={styles.label}>{sensitivityLevel}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#3498db',
    borderBottomWidth: 2,
    borderColor: '#3498db',
    paddingBottom: 10,
    width: '100%',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#7f8c8d',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 3,
    marginBottom: 20,
    width: '100%',
  },
  subHeaderContainer: {
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  safetyRulesContainer: {
    marginBottom: 20,
    width: '100%',
  },
  safetyRule: {
    fontSize: 14,
    marginBottom: 10,
    color: '#2c3e50',
    textAlign: 'left',
  },
  sliderContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  slider: {
    width: '100%',
  },
  value: {
    fontSize: 24,
    marginTop: 10,
    color: '#3498db',
  },
  label: {
    fontSize: 20,
    color: '#2c3e50',
  },
});

export default GasScreen;
