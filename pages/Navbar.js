import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the appropriate icon library
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
        <Text>
          <Icon name="home-outline" size={24} color="white" /> {/* Wrap the icon in a Text component */}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('Cart')}>
        <Text>
          <Icon name="cart-outline" size={24} color="white" /> {/* Wrap the icon in a Text component */}
        </Text>
      </TouchableOpacity>
      {isAuthenticated ? (
        <TouchableOpacity onPress={() => handleNavigation('Profile')}>
          <Text>
            <Icon name="person-outline" size={24} color="white" /> {/* Wrap the icon in a Text component */}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => handleNavigation('Login')}>
          <Text>
            <Icon name="log-in-outline" size={24} color="white" /> {/* Wrap the icon in a Text component */}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Navbar;
