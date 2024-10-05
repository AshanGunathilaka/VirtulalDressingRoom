import { View, Text, Image, Button, StyleSheet, FlatList, ActivityIndicator, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { db } from '.././firebaseConfig'; // Make sure this path is correct
import { collection, getDocs } from 'firebase/firestore';

export default function Map() {
  const [Places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(''); // State to handle the search query

  useEffect(() => {
    const fetchData = async () => {
      try {
        const placesCollection = collection(db, 'Display'); // Replace 'Places' with your collection name
        const placesSnapshot = await getDocs(placesCollection);
        
        const placesList = placesSnapshot.docs.map(doc => ({
          id: doc.id, // Firestore document ID
          ...doc.data(), // The rest of the data
        }));

        setPlaces(placesList);
        setFilteredPlaces(placesList); // Initialize filteredPlaces with the full list
      } catch (error) {
        console.error("Error fetching places: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      const filteredData = Places.filter(place =>
        place.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredPlaces(filteredData);
    } else {
      setFilteredPlaces(Places); // Reset to the full list when search is cleared
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // Render each item in a grid view
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <Button title="Add to Cart" onPress={() => {/* Add your goal handling logic here */}} />
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by title..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredPlaces}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}  // Set the number of columns to 2 for a grid layout
        contentContainerStyle={styles.grid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  grid: {
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    margin: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center', // Center image and content
    justifyContent: 'center',
    maxWidth: '48%',  // Ensure cards take up 48% of the screen width to fit two cards per row
  },
  image: {
    width: 150,
    height: 100,  // Adjust the image size to be larger
    borderRadius: 8,
    marginBottom: 10,
  },
  content: {
    flex: 1,
    alignItems: 'center',  // Center the content inside the card
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,  // Larger font for title
    marginBottom: 5,
    
  },
  description: {
    color: '#666',
    fontSize: 14,
    textAlign: 'justify',  // Align the description text
  },
});
