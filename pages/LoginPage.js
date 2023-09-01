import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useCart } from '../CartContext';
import { useNavigation } from '@react-navigation/native'
import styles from '../styling/LoginPageStyles';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsAuthenticated, setUser_id } = useCart();
  const navigation = useNavigation();

  const handleLogin = () => {
    const loginData = {
      email,
      password,
    };

    axios.post('http://192.168.1.48:8080/api/login/check-login', loginData, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => {
        if (response.status === 200) {
          setIsAuthenticated(true);
          setUser_id(response.data);
          navigation.navigate('Home');
        } else {
          alert('Login failed');
        }
      })
      .catch(error => {
        console.error('Error logging in', error);
        alert('Login failed');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <Text>
      Don't have an account?{' '}
      <Text
        style={styles.link}
        onPress={() => navigation.navigate('Signup')} // Navigate to SignupPage
      >
        Sign up here
      </Text>
</Text>
    </View>
  );
};

export default LoginPage;
