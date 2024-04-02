import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity,  } from 'react-native';
import { getFavorites, clearFavorites } from '../controllers/FavouritesDB';
import { useNavigation } from '@react-navigation/native';

const FavouriteListScreen = () => {
  const [favourites, setFavourites] = useState([]);
  const navigation = useNavigation();

  useEffect(
    useCallback(() => {
      fetchFavourites();
    }, [])
  );

  const fetchFavourites = () => {
    getFavorites((data, error) => {
      if (error) {
        console.error("Error fetching favorites:", error);
      } else {
        console.log("Favorites:", data);
        // Ensure the fetched data is not empty before setting it
        if (Array.isArray(data) && data.length > 0) {
          setFavourites(data);
        }
      }
    });
  };
  
  
  const renderItem = ({ item }) => {
    // Check if item is not null or undefined, and if item.id exists
    if (!item || !item.id) {
      return null; 
    }
  
    return (
      <TouchableOpacity onPress={() => navigation.navigate('VideoDetailsScreen', { videoID: item.videoID.videoID.toString() })}>
        <View style={styles.favContainer}>
          <View style={styles.listContainer}>
            <Text style={styles.boldText}>{item.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  

  const deleteAndRefresh = async () => {
    try {
      await clearFavorites();
      fetchFavourites();
      setFavourites([])
    } catch (error) {
      console.error('Error deleting favourites:', error);
    }
  };

  return (
    <View style={{ flex: 1}}>
      {favourites.length > 0 && (
        <TouchableOpacity onPress={() => deleteAndRefresh()}>
        <View style={{ backgroundColor: 'pink', marginTop: 5 }}>
          <Text style={styles.buttonText}>Clear Favourites</Text>
        </View>
      </TouchableOpacity>
      
      )}

      {favourites.length > 0 ? (
        <FlatList
          data={favourites}
          style={styles.favList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text>No favourites found.</Text>
      )}
    </View>
  );
};

export default FavouriteListScreen;

const styles = {
  favList:{
    alignContent:"stretch",
    width:"100%",
  },
  favContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  listContainer: {
    flex: 1,
  },
  boldText: {
    fontWeight: 'bold',
  },
};

