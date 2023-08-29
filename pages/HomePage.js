import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import { useCart } from '../CartContext';
import styles from '../styling/HomePageStyles'; // Your styles

const homeURL = 'http://192.168.1.48:8080/api/products';
const addURL = 'http://192.168.1.48:8080/api/cart/add';
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
      })
      .catch((error) => {
        console.error('Error adding item to cart', error);
      });
  };

  return (
    <View style={styles.homePage}>
      <Text style={styles.pageTitle}>Welcome to the E-commerce Store</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
            >
              <Image source={{ uri: item.Image }} style={styles.productImage} />
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
