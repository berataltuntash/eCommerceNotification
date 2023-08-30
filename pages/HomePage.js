import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import { useCart } from '../CartContext';
import styles from '../styling/HomePageStyles'; // Your styles
//192.168.1.48 is the IP address of my computer on my local network.
const homeURL = 'http://10.8.63.162:8080/api/products';
const addURL = 'http://10.8.63.162:8080/api/cart/add';
const sendNotificationURL = 'http://10.8.63.162:8080/api/notification/send-message';
const HomePage = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const { user_id } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await axios.get(homeURL);
      setProducts(response.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleAddToCart = (product) => {
    const cartData = {
      productId: product.id,
      userId: user_id,
    };
    axios.post(addURL, cartData, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        console.log('Item added to cart', response);
        const notificationData = {
          messageData: `Item ${product.name} added to cart.`,
        };
  
        axios.post(sendNotificationURL, notificationData, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((notificationResponse) => {
          console.log('Notification sent:', notificationResponse);
        })
        .catch((notificationError) => {
          console.error('Error sending notification:', notificationError);
        });
      })
      .catch((error) => {
        console.error('Error adding item to cart', error);
      });
  };

  return (
    <View style={styles.homePage}>
      <Text style={styles.pageTitle}>Supportlements</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
            >
              <View style={styles.productImageContainer}>
                <Image source={{ uri: item.image_link }} style={styles.productImage} />
              </View>
              <Text style={styles.productName}>{item.name}</Text>
            </TouchableOpacity>
            <Text style={styles.productPrice}>Price: ${item.price}</Text>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => handleAddToCart(item)}
            >
              <Text style={styles.addToCartButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default HomePage;
