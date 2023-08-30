import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { useCart } from '../CartContext';

const ProfilePage = () => {
  const { isAuthenticated, user_id } = useCart();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      axios.get(`http://10.8.63.162:8080/api/login`, { params: { id:user_id } })
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error('Error fetching user data', error);
        });
    }
  }, [isAuthenticated, user_id]);

  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <Text>Please log in to view your profile.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {user && (
        <>
          
          <Text>Name: {user.name}</Text>
          <Text>Surname: {user.surname}</Text>
          <Text>Email: {user.email}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 20,
  },
});

export default ProfilePage;
