import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useCart } from '../CartContext';
import styles from '../styling/CheckoutPageStyles'; 

const CheckoutPage = ({ navigation }) => {
  const [address, setAddress] = useState('');
  const [creditCardNo, setCreditCardNo] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCVV] = useState('');
  const { user_id } = useCart();

  const handlePay = () => {
    if (!address || !creditCardNo || !expiryMonth || !expiryYear || !cvv) {
      alert('Please fill in all fields.');
      return;
    }

    if (!/^\d{16}$/.test(creditCardNo)) {
      alert('Credit card number must be 16 digits.');
      return;
    }

    if (!/^\d{3}$/.test(cvv)) {
      alert('CVV must be a 3-digit number.');
      return;
    }

    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    const parsedExpiryMonth = Number(expiryMonth);
    const parsedExpiryYear = Number(expiryYear);

    if (
      parsedExpiryYear < currentYear ||
      (parsedExpiryYear === currentYear && parsedExpiryMonth < currentMonth)
    ) {
      alert('Invalid expiry date.');
      return;
    }


    axios
      .post('http://10.8.63.162:8080/api/order', user_id, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(() => {
        navigation.navigate('ThankYou');
      })
      .catch((error) => {
        console.error('Error creating order', error);
      });
  };


  return (
    <View style={styles.checkoutPage}>
      <Text style={styles.pageTitle}>Checkout</Text>
      <View style={styles.addressBlock}>
        <Text style={styles.label}>Shipping Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your address"
          value={address}
          onChangeText={setAddress}
        />
      </View>
      <View style={styles.paymentBlock}>
        <Text style={styles.label}>Payment Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Credit Card Number"
          value={creditCardNo}
          onChangeText={setCreditCardNo}
          keyboardType="numeric"
        />
        <View style={styles.expiryCVVBlock}>
          <TextInput
            style={styles.expiryInput}
            placeholder="MM"
            value={expiryMonth}
            onChangeText={setExpiryMonth}
            keyboardType="numeric"
            maxLength={2}
          />
          <Text>/</Text>
          <TextInput
            style={styles.expiryInput}
            placeholder="YY"
            value={expiryYear}
            onChangeText={setExpiryYear}
            keyboardType="numeric"
            maxLength={2}
          />
          <TextInput
            style={styles.cvvInput}
            placeholder="CVV"
            value={cvv}
            onChangeText={setCVV}
            keyboardType="numeric"
            maxLength={3}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.payButton} onPress={handlePay}>
        <Text style={styles.payButtonText}>Pay</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckoutPage;
