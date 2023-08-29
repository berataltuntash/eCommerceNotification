import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styling/NavbarStyles';
import { useCart } from '../CartContext';

const Navbar = () => {
  const navigation = useNavigation();
  const { isAuthenticated } = useCart();
  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleNavigation('Home')}>
        <Text style={styles.link}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('Cart')}>
        <Text style={styles.link}>Shopping Cart</Text>
      </TouchableOpacity>
      {isAuthenticated ? (
        <TouchableOpacity onPress={() => handleNavigation('Profile')}>
          <Text style={styles.link}>Profile</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => handleNavigation('Login')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default Navbar;
