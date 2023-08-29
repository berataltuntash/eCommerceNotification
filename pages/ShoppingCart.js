import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import { useCart } from '../CartContext';
import styles from '../styling/ShoppingCartStyles'; // Your styles

const ShoppingCart = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user_id } = useCart();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = () => {
    axios.get('http://192.168.1.48:8080/api/cart', { params: { user_id } })
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching cart items', error);
      });
  };

  const handleIncrement = (productId) => {
    const cartData = {
      productId: productId,
      userId: user_id,
    };

    axios.post('http://192.168.1.48:8080/api/cart/add', cartData, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then(() => {
        fetchCartItems();
      })
      .catch((error) => {
        console.error('Error incrementing item', error);
      });
  };

  const handleDecrement = (productId) => {
    const cartData = {
      productId: productId,
      userId: user_id,
    };

    axios.delete('http://192.168.1.48:8080/api/cart/decrement', {
      data: cartData,
      headers: { 'Content-Type': 'application/json' },
    })
      .then(() => {
        fetchCartItems();
      })
      .catch((error) => {
        console.error('Error decrementing item', error);
      });
  };

  const handleRemoveItem = (productId) => {
    const cartData = {
      productId: productId,
      userId: user_id,
    };

    axios.delete('http://192.168.1.48:8080/api/cart/delete', {
      data: cartData,
      headers: { 'Content-Type': 'application/json' },
    })
      .then(() => {
        fetchCartItems();
      })
      .catch((error) => {
        console.error('Error removing item', error);
      });
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty. Add items to your cart before checking out.');
      return;
    }

    navigation.navigate('Checkout');
  };

  return (
    <View style={styles.shoppingCart}>
      <Text style={styles.pageTitle}>Shopping Cart</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.product.Image }} style={styles.productImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.product.name}</Text>
              <Text style={styles.price}>Price: ${item.product.price}</Text>
              <View style={styles.quantityControls}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => handleDecrement(item.product.id)}
                >
                  <Text>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => handleIncrement(item.product.id)}
                >
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.removeItemButton}
                onPress={() => handleRemoveItem(item.product.id)}
              >
                <Text style={styles.removeItemButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Text style={styles.total}>Total Price: ${getTotalPrice()}</Text>
      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={handleCheckout}
      >
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShoppingCart;
