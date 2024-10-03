import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { db } from '../firebaseConfig'; // Make sure this path is correct
import { collection, addDoc } from 'firebase/firestore';

const AddressScreen = ({ navigation }) => {
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [message, setMessage] = useState('');

  const handleSaveAddress = async () => {
    const userAddress = {
      street,
      city,
      state,
      zip,
    };

    try {
      // Add a new document with a generated ID
      const docRef = await addDoc(collection(db, 'addresses'), userAddress);
      setMessage(`Address saved with ID: ${docRef.id}`);
      Alert.alert('Success', 'Address saved successfully!');
      // Optionally navigate to another screen after saving
      navigation.navigate('Home'); // Change to your desired screen
    } catch (error) {
      console.error("Error adding address: ", error);
      Alert.alert('Error', 'Could not save address. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Street"
        value={street}
        onChangeText={setStreet}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="State"
        value={state}
        onChangeText={setState}
      />
      <TextInput
        style={styles.input}
        placeholder="ZIP Code"
        value={zip}
        onChangeText={setZip}
      />
      <Button title="Save Address" onPress={handleSaveAddress} />
      
      {message ? <Text style={styles.message}>{message}</Text> : null}

      <Button title="Profile"  onPress={() => navigation.navigate('Profile')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
  },
  message: {
    marginTop: 20,
    textAlign: 'center',
    color: 'green',
  },
});

export default AddressScreen;
