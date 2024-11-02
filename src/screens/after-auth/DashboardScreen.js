import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const DashboardScreen = () => {
  const data = [
    { label: 'Temperature', value: '25°C', trend: 'up' },
    { label: 'Humidity', value: '60%', trend: 'down' },
    { label: 'Crying Detection', value: 'No', trend: 'up' },
    { label: 'Body Temperature', value: '37°C', trend: 'down' },
    { label: 'Gas Detection', value: 'No', trend: 'up' },
    { label: 'Wetness Detection', value: 'No', trend: 'down' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Dashboard Overview</Text>
        <Text style={styles.subHeader}>Last 7 Days</Text>
      </View>

      <View style={styles.cardContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.card}>
            <Icon name="info-circle" size={24} color="#3498db" />
            <View style={styles.textContainer}>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.value}>{item.value}</Text>
            </View>
            <View style={styles.arrowContainer}>
              {item.trend === 'up' && (
                <Icon name="arrow-up" size={16} color="#4CAF50" />
              )}
              {item.trend === 'down' && (
                <Icon name="arrow-down" size={16} color="#FF3D00" />
              )}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ecf0f1',
  },
  header: {
    marginBottom: 24,
    borderBottomWidth: 2,
    borderColor: '#3498db',
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3498db',
  },
  subHeader: {
    fontSize: 18,
    color: '#2c3e50',
  },
  cardContainer: {
    flexDirection: 'column',
  },
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  textContainer: {
    marginLeft: 16,
    flex: 1,
  },
  label: {
    fontSize: 18,
    marginBottom: 4,
    color: '#333',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3498db',
  },
  arrowContainer: {
    marginLeft: 16,
  },
});

export default DashboardScreen;
