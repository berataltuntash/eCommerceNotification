import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import axios from 'axios';
import { useCart } from '../CartContext';
import styles from '../styling/ProfilePageStyles';

const ProfilePage = () => {
  const { isAuthenticated, user_id } = useCart();
  const [user, setUser] = useState(null);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      axios.get(`http://192.168.1.48:8080/api/login`, { params: { id:user_id } })
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error('Error fetching user data', error);
        });

        axios.get(`http://192.168.1.48:8080/api/order/user`, { params: { userid: user_id } })
        .then(response => {
          setOrderItems(response.data);
        })
        .catch(error => {
          console.error('Error fetching user order items', error);
        });
    }
  }, [isAuthenticated, user_id]);

  return (
    <View style={styles.container}>
    {user && (
      <>
        <Text>Name: {user.name}</Text>
        <Text>Surname: {user.surname}</Text>
        <Text>Email: {user.email}</Text>
        <Text>Your Previous Purchases:</Text>
        {orderItems.map(orderItem => (
            <View key={orderItem.id} style={styles.orderItem}>
              <Image
                source={{ uri: orderItem.product.image_link }} // Replace with the actual image URL
                style={styles.orderItemImage}
              />
              <View style={styles.orderItemDetails}>
                <Text>Product: {orderItem.product.name}</Text>
                <Text>Quantity: {orderItem.quantity}</Text>
                <Text>Price: {orderItem.product.price}</Text>
                <Text>Date: {new Date(orderItem.order.date).toLocaleString()}</Text>
              </View>
            </View>
          ))}
        </>
      )}
    </View>
  );
};
export default ProfilePage;
