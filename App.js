import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CartProvider } from './CartContext';
import HomePage from './pages/HomePage';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CheckoutPage from './pages/CheckoutPage';
import ThankYouPage from './pages/ThankYouPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Navbar from './pages/Navbar';
import ProfilePage from './pages/ProfilePage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="Cart" component={ShoppingCart} />
          <Stack.Screen name="ProductDetails" component={ProductDetailsPage} />
          <Stack.Screen name="Checkout" component={CheckoutPage} />
          <Stack.Screen name="ThankYou" component={ThankYouPage} />
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Signup" component={SignupPage} />
          <Stack.Screen name="Profile" component={ProfilePage} />
        </Stack.Navigator>
        <Navbar />
      </NavigationContainer>
    </CartProvider>
  );
};

export default App;