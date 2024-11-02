import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const WetnessSafetyRules = ({ timestamp }) => {
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
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Wetness Safety Rules</Text>
        <View style={styles.timestampContainer}>
        <Text style={styles.timestampText}>Detected at: {formattedTimestamp()}</Text>
      </View>
        <View style={styles.ruleContainer}>
          <Text style={styles.subHeader}>Safety Rules</Text>
          <View style={styles.rule}>
            <Text style={styles.ruleText}>
              1. Change diapers frequently to keep the baby dry and prevent diaper rash.
            </Text>
            <Text style={styles.ruleText}>
              2. Use a diaper cream or ointment to protect the baby's skin from wetness and irritation.
            </Text>
            <Text style={styles.ruleText}>
              3. Ensure proper cleaning and hygiene during diaper changes to prevent infections.
            </Text>
            <Text style={styles.ruleText}>
              4. Choose diapers that are absorbent and comfortable for the baby.
            </Text>
            <Text style={styles.ruleText}>
              5. Monitor the baby's diaper for signs of wetness and change as needed.
            </Text>
          </View>
        </View>
       
        <View style={styles.dangerContainer}>
          <Text style={styles.dangerHeader}>Wetness Dangers</Text>
          <View style={styles.danger}>
            <Text style={styles.dangerText}>
              - Prolonged exposure to wetness can cause diaper rash and skin irritation.
            </Text>
            <Text style={styles.dangerText}>
              - Diaper rash may lead to discomfort, pain, and infection if not treated promptly.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
    textDecorationLine: 'underline', // Underline the title
  },
  ruleContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    padding: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#c62828',
    textAlign: 'center',
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

export default WetnessSafetyRules;
