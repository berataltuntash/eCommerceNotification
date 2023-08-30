import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    if (!name || !surname || !email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    if (!email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      alert('Password must contain at least 8 characters.');
      return;
    }
    const userData = {
      name,
      surname,
      email,
      password
    };

    axios.post('http://10.8.63.162:8080/api/login', userData, { headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        if (response.status === 201) {

        } else {
          // Handle signup error
          console.error('Signup failed');
        }
      })
      .catch(error => {
        console.error('Error signing up', error);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Surname"
          value={surname}
          onChangeText={setSurname}
        />
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
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <Text>
        Already have an account?{' '}
        {/* Navigate to LoginPage */}
      </Text>
    </View>
  );
};

export default SignupPage;