import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { frObjects } from '../../util/frObjects';
import HeadCard from '../../components/HeadCard';
import FRComponent from '../../components/FRComponent';
import { AppContext } from '../../store/app-context';
import { calculateTimeDifference, fetchFirebaseTimestamp } from '../../util/time';
import { getOverwrittenData } from '../../database/fetchData';
import Ionicons from 'react-native-vector-icons/Ionicons';
import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from '../../store/auth-context';

function HomeScreen({ navigation }) {
  const [isTimeDifferenceExceeded, setIsTimeDifferenceExceeded] = useState(false);



  const { wetnessDetected, gasDetected, temperature, humidity, cryingDetection } =
    useContext(AppContext);

  const headerData = [
    { title: 'Temperature', value: temperature + '°C' },
    { title: 'Humidity', value: humidity + '%' },
    // Add more items as needed
  ];

  const authCtx = useContext(AuthContext);

  const [email, setEmail] = useState("");

  //  Reference Websit: https://stackoverflow.com/questions/77481263/jwtdecode-invalidtokenerror-invalid-token-specified-invalid-base64-for-part

  useEffect(() => {
    async function fetchToken() {
      try {
        const token = await authCtx.token;
        const decoded = jwtDecode(token);
        const userEmail = decoded.email; // Extract email from decoded token
        setEmail(userEmail); // Save email to state variable
        console.log(decoded);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }

    fetchToken();
  }, [authCtx.token]); // Ensure the effect runs when token changes



  useEffect(() => {
    const fetchData = async () => {
      const result = await calculateTimeDifference();
      setIsTimeDifferenceExceeded(result);
    };
    fetchData();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      {isTimeDifferenceExceeded ? (
        <View style={styles.cardContainer}>
          <Ionicons name="warning-outline" size={24} color="red" style={styles.warningIcon} />
          <Text style={styles.cardText}>
            Do not rely on the current readings, The data may be outdated.
          </Text>
        </View>
      ) : null}

      {
        /*
 <Text>{email}</Text>

        */


      }

     

      <FlatList
        ListHeaderComponent={
          <TouchableOpacity
            onPress={() => navigation.navigate('TempAndHumidityScreen')}>
            <View style={styles.centeredHeader}>
              <HeadCard data={headerData} />
            </View>
          </TouchableOpacity>
        }
        data={frObjects}
        renderItem={({ item }) => (
          <FRComponent
            item={item}
            onPress={() => navigation.navigate(item.navigationScreen)}
          />
        )}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center', // Center items vertically
    alignItems: 'center',
  },
  cardContainer: {
    padding: 10,
    backgroundColor: 'lightgray',
    marginVertical: 10,
    borderRadius: 8,
    alignSelf: 'stretch',
    flexDirection: 'row', // Align icon and text horizontally
    alignItems: 'center', // Center items vertically
  },
  cardText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    flex: 1, // Allow text to take remaining space
  },
  warningIcon: {
    marginRight: 10, // Add spacing between icon and text
  },
  timestampText: {
    fontSize: 12,
    textAlign: 'center',
  },
  centeredHeader: {
    alignItems: 'center',
  },
});

export default HomeScreen;
