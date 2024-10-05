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

  const validateFields = () => {
    // Check if required fields are filled
    if (!name || !item || !street || !city || !postalCode || !province || !phoneNo || !preferredDate || !preferredTime) {
      Alert.alert('Error', 'Please fill all required fields.');
      return false;
    }
    // Validate phone number (assuming it's 10 digits)
    if (!/^\d{10}$/.test(phoneNo)) {
      Alert.alert('Error', 'Please enter a valid phone number.');
      return false;
    }
    // Validate postal code (assuming 5-6 digit postal code)
    if (!/^\d{5,6}$/.test(postalCode)) {
      Alert.alert('Error', 'Please enter a valid postal code.');
      return false;
    }
    return true;
  };

  const handleSaveDelivery = async () => {
    if (!validateFields()) {
      return; // Stop if validation fails
    }

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
          keyboardType="numeric"
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
          keyboardType="numeric"
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
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'left',
    color: '#333',
    fontWeight: 'bold',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
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
