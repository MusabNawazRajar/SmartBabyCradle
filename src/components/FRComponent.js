// FRComponent.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { fetchFirebaseIsActive } from '../database/fetchData';

function FRComponent({ item, onPress }) {
  const IconComponent = item.vendor === 'Ionicons' ? Ionicons : MaterialCommunityIcons;
  const navigation = useNavigation();

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const unsubscribe = fetchFirebaseIsActive('SmartBabyCradle/' + item.pathDb, setIsActive);

    return () => {
      unsubscribe();
    };
  }, [item.pathDb]);

  return (
    <TouchableOpacity onPress={() => navigation.navigate(item.navigationScreen)}>
      <View style={[
        styles.container,
        isActive ? { backgroundColor: item.activationColor } : { backgroundColor: 'white' }
      ]}>
        <View style={styles.box}>
          <IconComponent name={item.iconName} size={75} color={isActive ? 'white' : 'black'} />
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={[
              styles.text,
              { color: isActive ? 'white' : 'black' }
            ]}>
              {item.title}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderRadius: 8,
    elevation: 7,
    margin: 10,
  },
  box: {
    height: 160,
    width: 160,
    borderRadius: 8,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default FRComponent;
