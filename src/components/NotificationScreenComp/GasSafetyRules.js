import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const GasSafetyRules = ({ timestamp }) => {
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
        <Text style={styles.title}>Gas Safety Rules</Text>
        <View style={styles.timestampContainer}>
          <Text style={styles.timestampText}>Detected at: {formattedTimestamp()}</Text>
        </View>
        <View style={styles.ruleContainer}>
          <Text style={styles.subHeader}>Safety Rules</Text>
          <View style={styles.rule}>
            <Text style={styles.ruleText}>
              1. Ensure proper ventilation in rooms with gas appliances.
            </Text>
            <Text style={styles.ruleText}>
              2. Install carbon monoxide detectors in your home.
            </Text>
            <Text style={styles.ruleText}>
              3. Regularly inspect gas appliances for leaks and damage.
            </Text>
            <Text style={styles.ruleText}>
              4. Keep gas appliances well-maintained and serviced.
            </Text>
            <Text style={styles.ruleText}>
              5. Educate everyone in your household about gas safety procedures.
            </Text>
          </View>
        </View>
        <View style={styles.dangerContainer}>
          <Text style={styles.dangerHeader}>Gas Leakage Dangers</Text>
          <View style={styles.danger}>
            <Text style={styles.dangerText}>
              - Gas leaks can lead to carbon monoxide poisoning, which is
              particularly dangerous for babies and young children.
            </Text>
            <Text style={styles.dangerText}>
              - Symptoms of carbon monoxide poisoning include headaches,
              dizziness, nausea, and even death.
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
  timestampContainer: {
    marginBottom: 15,
  },
  timestampText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
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

export default GasSafetyRules;
