import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { getDatabase, ref, get, update } from 'firebase/database';
import { firebaseConfig } from '../../../database/firebaseConfig';

const TempAndHumidityScreen = () => {
  const [temperatureValue, setTemperatureValue] = useState(22); // Default value in Celsius
  const [humidityValue, setHumidityValue] = useState(50);

  useEffect(() => {
    const database = getDatabase();

    const tempSensitivityRef = ref(database, 'SmartBabyCradle/UserCustomization/Temperature/SensitivityLevel');
    get(tempSensitivityRef)
      .then((snapshot) => {
        const valueFromDatabase = snapshot.val();
        if (valueFromDatabase !== null) {
          setTemperatureValue(valueFromDatabase.value);
        }
      })
      .catch((error) => console.error('Error fetching temperature sensitivity level:', error));

    const humiditySensitivityRef = ref(database, 'SmartBabyCradle/UserCustomization/Humidity/SensitivityLevel');
    get(humiditySensitivityRef)
      .then((snapshot) => {
        const valueFromDatabase = snapshot.val();
        if (valueFromDatabase !== null) {
          setHumidityValue(valueFromDatabase.value);
        }
      })
      .catch((error) => console.error('Error fetching humidity sensitivity level:', error));

  }, []);

  const handleTemperatureSliderChange = (value) => {
    setTemperatureValue(value);
    updateSensitivityLevel('Temperature', value);
  };

  const handleHumiditySliderChange = (value) => {
    setHumidityValue(value);
    updateSensitivityLevel('Humidity', value);
  };

  const updateSensitivityLevel = (type, value) => {
    const database = getDatabase();
    const sensitivityRef = ref(database, `SmartBabyCradle/UserCustomization/${type}/SensitivityLevel`);

    update(sensitivityRef, { value })
      .then(() => console.log(`${type} Sensitivity level updated successfully`))
      .catch((error) => console.error(`Error updating ${type} sensitivity level:`, error));
  };

  const getTemperatureLabel = () => {
    return `Current Temperature: ${temperatureValue} °C`;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.fullScreenTitle}>Temperature and Humidity Sensitivity Settings</Text>

      <View style={styles.introContainer}>
        <Text style={styles.introText}>
          Welcome to the Temperature and Humidity Sensitivity Settings screen. Customize the sensitivity levels for temperature and humidity to ensure optimal conditions for your Smart Baby Cradle.
        </Text>
      </View>

      <View style={styles.sensorContainer}>
        <Text style={styles.title}>Temperature Sensitivity</Text>
        <Text style={styles.label}>{getTemperatureLabel()}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={60}
          value={temperatureValue}
          onValueChange={handleTemperatureSliderChange}
          step={1}
          minimumTrackTintColor="#3498db"
          maximumTrackTintColor="#bdc3c7"
          thumbTintColor="#3498db"
        />
      </View>

      <View style={styles.sensorContainer}>
        <Text style={styles.title}>Humidity Sensitivity</Text>
        <Text style={styles.label}>{`Current Humidity: ${humidityValue}%`}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          value={humidityValue}
          onValueChange={handleHumiditySliderChange}
          step={1}
          minimumTrackTintColor="#3498db"
          maximumTrackTintColor="#bdc3c7"
          thumbTintColor="#3498db"
        />
      </View>

      <View style={styles.safetyRulesContainer}>
        <Text style={styles.safetyRulesTitle}>Safety Guidelines for Sensor Placement:</Text>
        <Text style={styles.safetyRule}>1. Keep sensors in a clean and dry environment.</Text>
        <Text style={styles.safetyRule}>2. Regularly check sensors for any signs of damage or malfunction.</Text>
        <Text style={styles.safetyRule}>3. In case of alerts, take necessary actions based on the sensor type.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#ecf0f1',
  },
  fullScreenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#3498db',
    textAlign: 'center',
  },
  introContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  introText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'justify',
  },
  sensorContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: '#3498db',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#2c3e50',
  },
  slider: {
    width: '100%',
    marginTop: 10,
  },
  safetyRulesContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
  },
  safetyRulesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 10,
  },
  safetyRule: {
    fontSize: 14,
    marginBottom: 10,
    color: '#2c3e50',
    textAlign: 'left',
  },
});

export default TempAndHumidityScreen;
