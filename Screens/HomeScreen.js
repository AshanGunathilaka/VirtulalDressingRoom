// Screens/HomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Welcome to Home Screen!</Text>
      <Button
        title="Go to Sign In"
        onPress={() => navigation.navigate('Sign In')}
      />


    <Text>Go to Delivery Schedule</Text>
     <Button
       title="Delivery Schedule"
       onPress={() => navigation.navigate('Delivery')}
     />

<Text>Item Display</Text>
     <Button
       title="Item Display"
       onPress={() => navigation.navigate('Display')}
     />
    </View>
    
    
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
