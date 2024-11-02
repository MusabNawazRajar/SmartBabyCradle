import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

const HelpScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Smart Baby Cradle Help</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Crying Detection System</Text>
        <Text style={styles.description}>
          The crying detection system automatically identifies when your baby is crying.
          When a cry is detected, the cradle initiates rocking to comfort the baby.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cradle Rocking</Text>
        <Text style={styles.description}>
          The cradle rocking feature provides a gentle motion to help soothe your baby to sleep.
          You can customize rocking settings based on your baby's preferences.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Temperature and Humidity Detection</Text>
        <Text style={styles.description}>
          Temperature and humidity sensors monitor the baby's environment.
          You can adjust sensitivity levels to ensure a comfortable and safe atmosphere.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Body Temperature Detection</Text>
        <Text style={styles.description}>
          Track your baby's body temperature for health monitoring.
          Set temperature alerts and customize sensitivity levels as needed.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Wetness Detection</Text>
        <Text style={styles.description}>
          The wetness detection system alerts you when the baby's diaper needs changing.
          Keep your baby dry and comfortable with timely notifications.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gas Detection</Text>
        <Text style={styles.description}>
          Gas sensors ensure a safe environment by detecting harmful gases.
          Customize sensitivity levels to receive alerts and take necessary actions.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Audio Interactive</Text>
        <Text style={styles.description}>
          Stay connected with your baby through audio interaction.
          Listen to your baby's sounds and communicate with them remotely for added reassurance.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ecf0f1',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#3498db',
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#3498db',
    paddingBottom: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#3498db',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#2c3e50',
  },
});

export default HelpScreen;
