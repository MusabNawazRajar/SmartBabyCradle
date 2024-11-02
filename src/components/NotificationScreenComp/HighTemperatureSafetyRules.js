import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HighTemperatureSafetyRules = ({ timestamp }) => {
  const formattedTimestamp = () => {
    const date = new Date(timestamp);
    const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthName = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert hours to 12-hour format
  
    return `${day} ${monthName}, ${year}, ${dayOfWeek} ${hours}:${minutes} ${ampm}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.ruleContainer}>
        <Text style={styles.subHeader}>High Temperature Safety Rules</Text>
        <View style={styles.timestampContainer}>
        <Text style={styles.timestampText}>Detected at: {formattedTimestamp()}</Text>
      </View>
        <View style={styles.rule}>
          <Text style={styles.ruleText}>1. Stay hydrated by drinking plenty of water.</Text>
          <Text style={styles.ruleText}>2. Avoid prolonged exposure to direct sunlight.</Text>
          <Text style={styles.ruleText}>3. Wear lightweight, loose-fitting, and light-colored clothing.</Text>
          <Text style={styles.ruleText}>4. Seek shade or air-conditioned environments during peak heat hours.</Text>
          <Text style={styles.ruleText}>5. Never leave children or pets in parked vehicles.</Text>
        </View>
      </View>
     
      <View style={styles.dangerContainer}>
        <Text style={styles.dangerHeader}>High Temperature Risks</Text>
        <View style={styles.danger}>
          <Text style={styles.dangerText}>- High temperatures can lead to heat exhaustion or heatstroke, which are life-threatening conditions.</Text>
          <Text style={styles.dangerText}>- Symptoms of heat-related illnesses include dizziness, nausea, rapid heartbeat, and confusion.</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  ruleContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    padding: 20,
  },
  subHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  rule: {
    marginTop: 10,
  },
  ruleText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
    lineHeight: 22,
  },
  timestampContainer: {
    marginBottom: 15,
  },
  timestampText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  dangerContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    padding: 20,
  },
  dangerHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#c62828',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  danger: {
    marginTop: 10,
  },
  dangerText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#c62828',
    lineHeight: 22,
  },
});

export default HighTemperatureSafetyRules;
