// frRegistration.js

import React, { useContext, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/after-auth/HomeScreen';
import DashboardScreen from '../screens/after-auth/DashboardScreen';
import { AuthContext } from '../store/auth-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'react-native';
import CryingScreen from '../screens/after-auth/FR-DeatailScreen/CryingScreen';
import GasScreen from '../screens/after-auth/FR-DeatailScreen/GasScreen';
import WetnessScreen from '../screens/after-auth/FR-DeatailScreen/WetnessScreen';
import FanScreen from '../screens/after-auth/FR-DeatailScreen/FanScreen';
import MusicScreen from '../screens/after-auth/FR-DeatailScreen/MusicScreen';
import CradleScreen from '../screens/after-auth/FR-DeatailScreen/CradleScreen';
import TempAndHumidityScreen from '../screens/after-auth/FR-DeatailScreen/TempAndHumidityScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BabyTemperatureScreen from '../screens/after-auth/FR-DeatailScreen/BabyTemperatureScreen';
import NotificationListScreen from '../screens/after-auth/NotificationListScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import HelpScreen from '../screens/after-auth/FR-DeatailScreen/HelpScreen';
import NotificationDetailScreen from '../screens/after-auth/sub-detail-screens/NotificationDetailScreen';
import MusicListScreen from '../screens/after-auth/sub-detail-screens/MusicListScreen';
import HumdityScreen from '../screens/after-auth/FR-DeatailScreen/HumdityScreen';
import TemperatureScreen from '../screens/after-auth/FR-DeatailScreen/TemperatureScreen';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export function AuthenticatedScreens() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          display: 'flex',
        },
      })}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({color, size, focused}) => (
            <Icon name="home" color={focused ? 'green' : 'gray'} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{
          title: 'Dashboard',
          tabBarIcon: ({color, size, focused}) => (
            <Icon
              name="dashboard"
              color={focused ? 'green' : 'gray'}
              size={size}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="NotificationListScreen"
        component={NotificationListScreen}
        options={{
          title: 'Notification',
          tabBarIcon: ({color, size, focused}) => (
            <Icon name="bell" color={focused ? 'green' : 'gray'} size={size} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export function Navigation() {
  const authCtx = useContext(AuthContext);


  useEffect(() => {
    async function fetchToken() {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        
        if (storedToken) {
          authCtx.authenticate(storedToken);
        }
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    }

    fetchToken();
  }, [authCtx]);

  return (
    <>
      <StatusBar
        backgroundColor={authCtx.isAuthenticated ? '#D90026' : '#000000'}
        barStyle="light-content"
      />
      <NavigationContainer>
        {!authCtx.isAuthenticated && <AuthStack />}
        {authCtx.isAuthenticated && (
          <Stack.Navigator
            screenOptions={{
              headerTitle: 'Smart Baby Cradle',
              headerRight: () => (
                <Icon
                  name="sign-out"
                  size={25}
                  color="white"
                  style={{marginRight: 15}}
                  onPress={() => authCtx.logout()}
                />
              ),
              headerStyle: {
                backgroundColor: '#D90026',
              },
              headerTintColor: 'white',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}>
            <Stack.Screen
              name="AuthenticatedScreens"
              component={AuthenticatedScreens}
            />
            <Stack.Screen name="CryingScreen" component={CryingScreen} />
            <Stack.Screen
              name="BabyTemperatureScreen"
              component={BabyTemperatureScreen}
            />
            <Stack.Screen name="GasScreen" component={GasScreen} />
            <Stack.Screen name="WetnessScreen" component={WetnessScreen} />
            <Stack.Screen name="FanScreen" component={FanScreen} />
            <Stack.Screen name="MusicScreen" component={MusicScreen} />
            <Stack.Screen name="CradleScreen" component={CradleScreen} />
            <Stack.Screen name="HelpScreen" component={HelpScreen} />
            <Stack.Screen name="NotificationDetailScreen" component={NotificationDetailScreen} />
            <Stack.Screen name="MusicListScreen" component={MusicListScreen} />
            <Stack.Screen
              name="TempAndHumidityScreen"
              component={TempAndHumidityScreen}
            />
            <Stack.Screen
              name="HumdityScreen"
              component={HumdityScreen}
            />
            <Stack.Screen
              name="TemperatureScreen"
              component={TemperatureScreen}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </>
  );
}