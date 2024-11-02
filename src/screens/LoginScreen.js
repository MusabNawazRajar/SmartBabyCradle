import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../store/auth-context';
import { login } from '../util/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state
  const [loadingMessage, setLoadingMessage] = useState('Logging in...'); // Added loading message state

  const authContext = useContext(AuthContext);

  const handleLogin = async () => {
    if (email.trim() === '' || password.trim() === '') {
      setShowFeedback(true);
      Alert.alert('Error', 'Please fill in both email and password fields.');
      return;
    }

    try {
      setLoading(true);
      setLoadingMessage('Logging in...'); // Set loading message
      const token = await login(email, password);
      authContext.authenticate(token);
      navigation.replace('AuthenticatedScreens');
    } catch (error) {
      setShowFeedback(true);
      setLoadingMessage('Error: Invalid email or password'); // Set loading message on error
      Alert.alert('Error', 'Invalid email or password. Please try again.');
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
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>
          <Icon name="sign-in" size={20} color="white" /> LOGIN
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signUpBtn} onPress={() => navigation.replace('SignUpScreen')}>
        <Text style={styles.signUpText}>SIGN UP</Text>
      </TouchableOpacity>

      {
        /*
 <TouchableOpacity style={styles.forgotPasswordBtn}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

        */
      }
     

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
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  signUpBtn: {
    width: '80%',
    backgroundColor: '#5c5c5c',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  signUpText: {
    color: 'white',
  },
  forgotPasswordBtn: {
    marginTop: 10,
  },
  forgotPasswordText: {
    color: '#fb5b5a',
    textDecorationLine: 'underline',
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

export default LoginScreen;
