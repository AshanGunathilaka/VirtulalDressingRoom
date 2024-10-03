// Screens/SignUpScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig'; // Make sure this path is correct
import { useToast } from 'react-native-toast-notifications';
import { doc, setDoc } from '@firebase/firestore';


const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const [reenterpassword, setReenterpassword] = useState('');
  const toast = useToast();

  const signUp = async () => {
    try {
      if (password !== reenterpassword) {
        toast.show('Passwords do not match', { type: 'danger' });                
        return;
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userdetails = auth.currentUser;
        const user = userCredential.user;
        if(userdetails){
          await setDoc(doc(db, "user_details",userdetails.uid), {
            name: name,
            email: email,
            phonenumber: phonenumber
          });
        }
        toast.show(`User signed up with email: ${user.email}`, { type: 'success' });        
        navigation.navigate('Home');
      }
    } catch (error) {
      console.log(error);
      toast.show(`${error.message}`, { type: 'danger' });      
    }
  };

  return (
    <View style={styles.container}>
      <Text>Sign Up</Text>
      <View style={{ marginBottom: 20 }} />

      <Text>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />

      <Text>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"  
        email-address       
      />
      
      <Text>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phonenumber}
        onChangeText={setPhonenumber}
      />
      
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Text>Re-enter Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Re-enter Password"
          value={reenterpassword}
          onChangeText={setReenterpassword}
          secureTextEntry
      />
      <View style={{ marginBottom: 20 }} />
      <Button title="Sign Up" onPress={signUp} />
      <View style={{ marginBottom: 20 }} />
      <Button
        title="Already have an account? Sign In"
        onPress={() => navigation.navigate('Sign In')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
  },
});

export default SignUpScreen;
