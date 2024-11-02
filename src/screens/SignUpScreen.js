import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../store/auth-context';
import { createUser } from '../util/auth';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state
  const [loadingMessage, setLoadingMessage] = useState('Signing up...'); // Added loading message state

  const authContext = useContext(AuthContext);

  const isValidEmail = (email) => {
    return email.includes('@');
  };

  const handleSignUp = async () => {
    if (
      !isValidEmail(email) ||
      email !== confirmEmail ||
      password !== confirmPassword ||
      password.length < 6
    ) {
      setShowFeedback(true);
      Alert.alert('Error', 'Please check your input and try again.');
      return;
    }

    try {
      setLoading(true);
      setLoadingMessage('Signing up...'); // Set loading message
      const token = await createUser(email, password);
      authContext.authenticate(token);
      navigation.replace('AuthenticatedScreens');
    } catch (error) {
      setShowFeedback(true);
      setLoadingMessage('Error: Unable to sign up'); // Set loading message on error
      Alert.alert('Error', 'Unable to sign up. Please try again.');
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000); // Hide loading after 2 seconds (you can adjust the time)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>
      SBC System
      </Text>

      <View style={[styles.inputView, showFeedback && styles.inputError]}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      <View style={[styles.inputView, showFeedback && styles.inputError]}>
        <TextInput
          style={styles.inputText}
          placeholder="Confirm Email"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setConfirmEmail(text)}
        />
      </View>

      <View style={[styles.inputView, showFeedback && styles.inputError]}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <View style={[styles.inputView, showFeedback && styles.inputError]}>
        <TextInput
          style={styles.inputText}
          placeholder="Confirm Password"
          placeholderTextColor="#003f5c"
          secureTextEntry
          onChangeText={(text) => setConfirmPassword(text)}
        />
      </View>

      <TouchableOpacity style={styles.signUpBtn} onPress={handleSignUp}>
        <Text style={styles.signUpText}>SIGN UP</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.replace('LoginScreen')}>
        <Text style={styles.loginText}>
          <Icon name="sign-in" size={20} color="white" /> LOGIN
        </Text>
      </TouchableOpacity>

      {loading && (
        <View style={styles.overlay}>
          <View style={styles.overlayContent}>
            <ActivityIndicator size="large" color="#fb5b5a" />
            <Text style={styles.overlayText}>{loadingMessage}</Text>
          </View>
        </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#5c5c5c',
    marginBottom: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputView: {
    width: '80%',
    backgroundColor: '#d9d9d9',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputError: {
    backgroundColor: 'yellow',
  },
  inputText: {
    height: 50,
    color: '#003f5c',
  },
  signUpBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  signUpText: {
    color: 'white',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#5c5c5c',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  loginText: {
    color: 'white',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  overlayText: {
    marginTop: 10,
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
