import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BabyTemperatureScreen = () => {
  const [babyTemperatureCelsius, setBabyTemperatureCelsius] = useState(36.5); // Assume a static initial temperature in Celsius

  useEffect(() => {
    // You can implement logic to fetch real-time temperature data from your data source here
    // For demonstration purposes, we'll use a static value
  }, []); 

  const babyTemperatureFahrenheit = (babyTemperatureCelsius * 9/5) + 32;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Icon name="baby" size={50} color="#3498db" />
        <Text style={styles.title}>Baby's Body Temperature</Text>
        <Text style={styles.temperature}>{babyTemperatureCelsius}°C / {babyTemperatureFahrenheit}°F</Text>
      </View>

      <View style={styles.safetyRulesContainer}>
        <Text style={styles.safetyRulesTitle}>Safety Guidelines for Baby:</Text>
        <Text style={styles.safetyRule}>1. Keep the baby in a comfortable environment with a suitable temperature.</Text>
        <Text style={styles.safetyRule}>2. Dress the baby in layers to maintain a comfortable body temperature.</Text>
        <Text style={styles.safetyRule}>3. Avoid direct exposure to extreme temperatures.</Text>
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 3,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    color: '#3498db',
    marginTop: 10,
  },
  temperature: {
    fontSize: 24,
    color: '#2c3e50',
    marginTop: 10,
  },
  safetyRulesContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    width: '80%',
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

export default BabyTemperatureScreen;
