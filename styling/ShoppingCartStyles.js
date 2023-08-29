const styles = {
    shoppingCart: {
      flex: 1,
      padding: 16,
    },
    pageTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    cartItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    productImage: {
      width: 100,
      height: 100,
      resizeMode: 'cover',
      marginRight: 16,
    },
    itemDetails: {
      flex: 1,
    },
    itemName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    price: {
      fontSize: 16,
      marginBottom: 8,
    },
    quantityControls: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    quantityButton: {
      backgroundColor: 'blue',
      padding: 4,
      borderRadius: 4,
      marginRight: 8,
    },
    quantity: {
      fontSize: 18,
      marginHorizontal: 8,
    },
    removeItemButton: {
      backgroundColor: 'red',
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 4,
      alignSelf: 'flex-start',
    },
    removeItemButtonText: {
      color: 'white',
    },
    total: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 16,
    },
    checkoutButton: {
      backgroundColor: 'green',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 4,
      marginTop: 16,
    },
    checkoutButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  };
  
  export default styles;
  