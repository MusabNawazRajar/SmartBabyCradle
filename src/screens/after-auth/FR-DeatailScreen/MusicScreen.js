import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { getDatabase, ref, get, set } from 'firebase/database';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const MusicScreen = () => {
  const [isMusicOn, setIsMusicOn] = useState(false);
  const [musicVolume, setMusicVolume] = useState(15);
  const [musicNumber, setMusicNumber] = useState(1);

  const navigation = useNavigation();

  useEffect(() => {
    // Fetch and set the initial value of isMusicOn from the database
    fetchIsMusicOn();
    fetchMusicVolume();
    fetchMusicNumber();
  }, []);

  const fetchIsMusicOn = () => {
    const musicOnRef = ref(getDatabase(), 'SmartBabyCradle/UserCustomization/Music/isMusicOn');
    get(musicOnRef)
      .then(snapshot => {
        const value = snapshot.val();
        if (value !== null) {
          setIsMusicOn(value);
        }
      })
      .catch(error => console.error('Error fetching isMusicOn:', error));
  };

  const fetchMusicVolume = () => {
    const musicVolumeRef = ref(getDatabase(), 'SmartBabyCradle/UserCustomization/Music/musicVolume');
    get(musicVolumeRef)
      .then(snapshot => {
        const value = snapshot.val();
        if (value !== null) {
          setMusicVolume(value);
        }
      })
      .catch(error => console.error('Error fetching musicVolume:', error));
  };

  const fetchMusicNumber = () => {
    const musicNumberRef = ref(getDatabase(), 'SmartBabyCradle/UserCustomization/Music/musicNumber');
    get(musicNumberRef)
      .then(snapshot => {
        const value = snapshot.val();
        if (value !== null) {
          setMusicNumber(value);
        }
      })
      .catch(error => console.error('Error fetching musicNumber:', error));
  };

  const updateIsMusicOn = (value) => {
    const musicOnRef = ref(getDatabase(), 'SmartBabyCradle/UserCustomization/Music/isMusicOn');
    set(musicOnRef, value)
      .then(() => console.log('isMusicOn updated successfully'))
      .catch(error => console.error('Error updating isMusicOn:', error));
  };

  const updateMusicVolume = (value) => {
    const musicVolumeRef = ref(getDatabase(), 'SmartBabyCradle/UserCustomization/Music/musicVolume');
    set(musicVolumeRef, value)
      .then(() => console.log('musicVolume updated successfully'))
      .catch(error => console.error('Error updating musicVolume:', error));
  };

  const updateMusicNumber = (value) => {
    const musicNumberRef = ref(getDatabase(), 'SmartBabyCradle/UserCustomization/Music/musicNumber');
    set(musicNumberRef, value)
      .then(() => console.log('musicNumber updated successfully'))
      .catch(error => console.error('Error updating musicNumber:', error));
  };

  const handleSwitchToggle = () => {
    const updatedValue = !isMusicOn;
    updateIsMusicOn(updatedValue);
    setIsMusicOn(updatedValue);
  };

  const handleVolumeChange = (volume) => {
    const roundedVolume = Math.floor(volume);
    setMusicVolume(roundedVolume);
    updateMusicVolume(roundedVolume);
  };

  const handleMusicListPress = () => {
    navigation.navigate('MusicListScreen', {
      onSelectMusic: onSelectMusic,
      musicNumber: musicNumber,
    });
  };

  const onSelectMusic = useCallback((id) => {
    setMusicNumber(id);
    updateMusicNumber(id);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      onSelectMusic: onSelectMusic,
    });
  }, [navigation, onSelectMusic]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer} onPress={handleSwitchToggle}>
        <Icon name="music-note" size={100} color={isMusicOn ? '#27ae60' : '#3498db'} />
      </TouchableOpacity>
      <Text style={styles.title}>Music Control</Text>
      <Text style={styles.guidelines}>
        Customize the music settings to create a soothing environment for your baby. Turn the
        music on or off based on your baby's sleep routine. Choose calming melodies for a
        comfortable atmosphere.
      </Text>
      <View style={styles.switchContainer}>
        <Text style={[styles.switchLabel, { color: isMusicOn ? '#27ae60' : '#3498db' }]}>
          {isMusicOn ? 'Music is On' : 'Music is Off'}
        </Text>
        <Switch
          trackColor={{ false: '#bdc3c7', true: '#27ae60' }}
          thumbColor={isMusicOn ? '#27ae60' : '#ecf0f1'}
          ios_backgroundColor="#bdc3c7"
          onValueChange={handleSwitchToggle}
          value={isMusicOn}
        />
      </View>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={30}
        minimumTrackTintColor="#3498db"
        maximumTrackTintColor="#bdc3c7"
        thumbTintColor="#3498db"
        value={musicVolume}
        onValueChange={handleVolumeChange}
      />
      <Text style={styles.volumeLabel}>Volume: <Text style={styles.maroonText}>{musicVolume}</Text></Text>
      <Text style={styles.volumeLabel}>Number: <Text style={styles.maroonText}>{musicNumber}</Text></Text>
      
      <TouchableOpacity style={styles.musicListButton} onPress={handleMusicListPress}>
        <Text style={styles.musicListButtonText}>Music List</Text>
      </TouchableOpacity>
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
  iconContainer: {
    backgroundColor: 'rgba(52, 152, 219, 0.1)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3498db',
    marginTop: 20,
  },
  guidelines: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 18,
    marginRight: 10,
  },
  slider: {
    width: '80%',
    marginTop: 20,
  },
  volumeLabel: {
    fontSize: 16,
    marginTop: 10,
    color: '#3498db',
  },
  musicListButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  musicListButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  volumeLabel: {
    fontSize: 16,
    marginTop: 10,
    color: 'green',
    fontWeight: 'bold', // Add bold font weight
    textTransform: 'uppercase', // Convert text to uppercase
    letterSpacing: 1, // Add letter spacing
  },
  maroonText: {
    color: '#800000', // Maroon color
    fontWeight: 'bold', // Add bold font weight
  },
  
  
});

export default MusicScreen;