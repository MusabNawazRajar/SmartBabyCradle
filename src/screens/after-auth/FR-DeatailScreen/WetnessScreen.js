import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { getDatabase, ref, get, update } from 'firebase/database';
import { firebaseConfig } from '../../../database/firebaseConfig';

const WetnessScreen = () => {
  let wetnessSensivityLevel = 200;
  const [sensitivityValue, setSensitivityValue] = useState(wetnessSensivityLevel);

  useEffect(() => {
    const database = getDatabase();
    const sensitivityRef = ref(database, 'SmartBabyCradle/UserCustomization/Wetness/SensitivityLevel');

    get(sensitivityRef)
      .then((snapshot) => {
        const valueFromDatabase = snapshot.val();
        if (valueFromDatabase !== null) {
          setSensitivityValue(valueFromDatabase.value);
        }
      })
      // .catch((error) => console.error('Error fetching sensitivity level:', error));
  }, []);

  const handleSliderChange = (value) => {
    setSensitivityValue(value);
    updateSensitivityLevel(value);
  };

  const updateSensitivityLevel = (value) => {
    const database = getDatabase();
    const sensitivityRef = ref(database, 'SmartBabyCradle/UserCustomization/Wetness/SensitivityLevel');

    update(sensitivityRef, { value })
      // .then(() => console.log('Sensitivity level updated successfully'))
      // .catch((error) => console.error('Error updating sensitivity level:', error));
  };

  const getLabel = () => {
    if (sensitivityValue < 2000) {
      return 'High Sensitivity';
    } else if (sensitivityValue < 2500) {
      return 'Middle Sensitivity';
    } else {
      return 'Low Sensitivity';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Wetness Sensitivity Settings</Text>
      <Text style={styles.description}>
        Adjust the sensitivity level to customize wetness detection based on your environment. Ensure the following safety rules:
      </Text>

      <View style={styles.card}>
        <Text style={styles.subHeader}>Safety Guidelines</Text>
        <View style={styles.safetyRulesContainer}>
          <Text style={styles.safetyRule}>1. Keep the wetness sensor in a dry and clean area.</Text>
          <Text style={styles.safetyRule}>2. Regularly check the sensor for any signs of damage or malfunction.</Text>
          <Text style={styles.safetyRule}>3. In case of a wetness detection alert, dry the area immediately.</Text>
        </View>
      </View>

      <Text style={styles.label}>{getLabel()}</Text>
      <Text style={styles.value}>{sensitivityValue}</Text>
      <Slider
        style={styles.slider}
        minimumValue={wetnessSensivityLevel}
        maximumValue={3000}
        value={sensitivityValue}
        onValueChange={handleSliderChange}
        step={1}
        minimumTrackTintColor="#3498db"
        maximumTrackTintColor="#bdc3c7"
        thumbTintColor="#3498db"
      />
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
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#3498db',
    paddingBottom: 5,
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
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
    color: '#2c3e50',
  },
  value: {
    fontSize: 18,
    marginBottom: 20,
    color: '#3498db',
  },
  slider: {
    width: '80%',
    marginTop: 20,
  },
});

export default WetnessScreen;
