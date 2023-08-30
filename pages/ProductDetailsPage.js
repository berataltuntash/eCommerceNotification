import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useCart } from '../CartContext';
import styles from '../styling/ProductDetailsPageStyles'; // Your styles

const ProductDetailsPage = ({ route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const { user_id } = useCart();

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`http://192.168.1.48:8080/api/products/${productId}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product details', error);
    }
  };

  const handleAddToCart = () => {
    const cartData = {
      productId: product.id,
      userId: user_id,
    };
    console.log(cartData);
    axios.post('http://192.168.1.48:8080/api/cart/add', cartData, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        console.log('Item added to cart', response);
      })
      .catch((error) => {
        console.error('Error adding item to cart', error);
      });
  };

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.productDetails}>
        <Image source={{ uri: product.image_link }} style={styles.productImage} />
        <View style={styles.infoBlock}>
          <Text style={styles.itemName}>{product.name}</Text>
          <Text style={styles.price}>Price: ${product.price}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}
          >
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductDetailsPage;
