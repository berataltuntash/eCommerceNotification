import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styling/ThankYouPageStyles'; // Your styles

const ThankYouPage = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.thankYouPage}>
      <Text style={styles.message}>Thank You for Your Purchase!</Text>
      <View style={styles.links}>
        <TouchableOpacity style={styles.returnLink} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.returnLinkText}>Return to Shopping</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.orderDetailsLink}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.orderDetailsLinkText}>Order Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ThankYouPage;
