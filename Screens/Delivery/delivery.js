import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { db } from '../../firebaseConfig'; // Make sure this path is correct
import { collection, addDoc } from 'firebase/firestore';

const DeliveryScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [item, setItem] = useState('');
  const [street, setStreet] = useState('');
  const [lane, setLane] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setCode] = useState('');
  const [province, setProvince] = useState('');
  const [phoneNo, setPhone] = useState('');
  const [preferredDate, setDate] = useState('');
  const [preferredTime, setTime] = useState('');
  const [addNote, setNote] = useState('');
  const [deliveryStatus] = useState('Pending'); // Default status
  const [message, setMessage] = useState('');

  const handleSaveDelivery = async () => {
    const userDelivery = {
      name,
      item,
      street,
      lane,
      city,
      postalCode,
      province,
      phoneNo,
      preferredDate,
      preferredTime,
      addNote,
      deliveryStatus,
    };

    try {
      // Add a new document with a generated ID
      const docRef = await addDoc(collection(db, 'Delivery'), userDelivery);
      setMessage(`Delivery saved with ID: ${docRef.id}`);
      Alert.alert('Success', 'Delivery saved successfully!');
      // Optionally navigate to another screen after saving
      navigation.navigate('Home'); // Change to your desired screen
    } catch (error) {
      console.error('Error adding Delivery: ', error);
      Alert.alert('Error', 'Could not save delivery. Please try again.');
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Enter Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.title}>Enter Item</Text>
        <TextInput
          style={styles.input}
          placeholder="Item"
          value={item}
          onChangeText={setItem}
        />
        <Text style={styles.title}>Street</Text>
        <TextInput
          style={styles.input}
          placeholder="Street"
          value={street}
          onChangeText={setStreet}
        />
        <Text style={styles.title}>Lane</Text>
        <TextInput
          style={styles.input}
          placeholder="Lane"
          value={lane}
          onChangeText={setLane}
        />
        <Text style={styles.title}>City</Text>
        <TextInput
          style={styles.input}
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />
        <Text style={styles.title}>Postal Code</Text>
        <TextInput
          style={styles.input}
          placeholder="Postal Code"
          value={postalCode}
          onChangeText={setCode}
        />
        <Text style={styles.title}>Province</Text>
        <TextInput
          style={styles.input}
          placeholder="Province"
          value={province}
          onChangeText={setProvince}
        />
        <Text style={styles.title}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNo}
          onChangeText={setPhone}
        />
        <Text style={styles.title}>Preferred Date</Text>
        <TextInput
          style={styles.input}
          placeholder="Preferred Date"
          value={preferredDate}
          onChangeText={setDate}
        />
        <Text style={styles.title}>Preferred Time</Text>
        <TextInput
          style={styles.input}
          placeholder="Preferred Time"
          value={preferredTime}
          onChangeText={setTime}
        />
        <Text style={styles.title}>Additional Notes</Text>
        <TextInput
          style={styles.input}
          placeholder="Add a note (optional)"
          value={addNote}
          onChangeText={setNote}
        />
        
        <TouchableOpacity style={styles.button} onPress={handleSaveDelivery}>
          <Text style={styles.buttonText}>Save Delivery</Text>
        </TouchableOpacity>

        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8', // light background color
    padding: 20,
  },
  title: {
    fontSize: 18, // reduced the size for more clarity
    marginBottom: 10,
    textAlign: 'left', // aligns text to the left
    color: '#333', // darker text color
    fontWeight: 'bold', // bold title
  },
  input: {
    height: 45,
    borderColor: '#ccc', // lighter border color
    borderWidth: 1,
    borderRadius: 8, // rounded corners for inputs
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff', // white background for inputs
  },
  button: {
    backgroundColor: '#007BFF', // primary button color
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff', // white text for button
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  message: {
    marginTop: 20,
    textAlign: 'center',
    color: 'green',
    fontSize: 16,
  },
});

export default DeliveryScreen;
