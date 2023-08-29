import React, { useState, useEffect } from 'react';
//import registerNNPushToken from 'native-notify';
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
  //registerNNPushToken(10901, 'VWZuJbRZWdU0Z6u95uUovR');
  /*
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    }
  }

  useEffect(() => {
    if(requestUserPermission){
      messaging().getToken().then(token => {
        console.log(token);
      });
    }
    else{
      console.log("No permission", authStatus);
    }

    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });

    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    }); 
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  */

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