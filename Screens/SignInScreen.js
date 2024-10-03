// Screens/SignInScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Make sure this path is correct
import { useToast } from 'react-native-toast-notifications';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  
  const toast = useToast();

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.show(`User signed in with email: ${user.email}`, { type: 'success' });        
        navigation.navigate('Address');
      })
      .catch((error) => {
        console.log(error);
        toast.show(`${error.message}`, { type: 'danger' });
      });
  };

  return (
    <View style={styles.container}>      
      <Text style={styles.title}>Sign In</Text>
      <View style={{ marginBottom: 20 }} />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"   
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View style={styles.buttonContainer}>
        <Button title="Sign In" onPress={signIn} color="#424ef5" />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Don't have an account? Sign Up"
          onPress={() => navigation.navigate('Sign Up')}
          color="#424ef5"
        />
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#6200EE', 
  },
  label: {
    fontSize: 16,
    color: '#333', 
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff', 
    borderRadius: 8, 
  },
  buttonContainer: {
    marginVertical: 10,
    borderRadius: 10,
  },
});

export default SignInScreen;
