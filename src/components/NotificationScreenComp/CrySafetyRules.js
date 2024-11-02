import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const CrySafetyRules = ({ timestamp }) => {
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
        <Text style={styles.title}>Cry Safety Rules</Text>
        <View style={styles.timestampContainer}>
        <Text style={styles.timestampText}>Detected at: {formattedTimestamp()}</Text>

        </View>
        <View style={styles.ruleContainer}>
          <Text style={styles.subHeader}>Safety Rules</Text>
          <View style={styles.rule}>
            <Text style={styles.ruleText}>
              1. Always respond promptly to your baby's cries to provide comfort and care.
            </Text>
            <Text style={styles.ruleText}>
              2. Check for common reasons behind crying, such as hunger, discomfort, or tiredness, and address them accordingly.
            </Text>
            <Text style={styles.ruleText}>
              3. Comfort your baby with gentle rocking, soothing sounds, or skin-to-skin contact to calm them down.
            </Text>
            <Text style={styles.ruleText}>
              4. Establish a consistent bedtime routine to help your baby feel secure and reduce nighttime crying episodes.
            </Text>
            <Text style={styles.ruleText}>
              5. Seek medical advice if your baby's crying seems excessive or unusual, as it could indicate an underlying health issue.
            </Text>
          </View>
        </View>
        <View style={styles.dangerContainer}>
          <Text style={styles.dangerHeader}>Cry Dangers</Text>
          <View style={styles.danger}>
            <Text style={styles.dangerText}>
              - Prolonged crying episodes can lead to exhaustion, stress, and irritability in both the baby and caregivers.
            </Text>
            <Text style={styles.dangerText}>
              - Ignoring or mishandling a baby's cries may affect their emotional development and bonding with caregivers.
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
    textDecorationLine: 'underline',
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

export default CrySafetyRules;
