import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { musicList } from '../../../util/musicList';
import React, { useState } from 'react';
const MusicListScreen = ({ route }) => {
  const { onSelectMusic, musicNumber } = route.params;
  const [selectedId, setSelectedId] = useState(musicNumber);

  const handleItemPress = (id) => {
     console.log(id);
    onSelectMusic(id); // Pass the selected music ID to the parent component
    setSelectedId(id); // Update the selected ID
   
  };

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#27ae60' : '#fff';
    const textColor = item.id === selectedId ? '#fff' : '#333';

    return (
      <TouchableOpacity
        style={[styles.item, { backgroundColor }]}
        onPress={() => handleItemPress(item.id)}
      >
        <Icon name="music-note" size={24} color={textColor} />
        <Text style={[styles.musicName, { color: textColor }]}>{item.musicName}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={musicList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc',
  },
  musicName: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default MusicListScreen;
