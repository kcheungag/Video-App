import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { fetchVideos } from '../controllers/VideoAPI';

const HomeScreen = ({ navigation }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideosData();
  }, []);

  const fetchVideosData = async () => {
    try {
      const data = await fetchVideos();
      if (data && data.list) {
        setVideos(data.list);
      } else {
        console.error('Invalid data format:', data);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const renderItem = ({ item }) => (
      <View style={styles.videoContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('VideoDetailsScreen', { videoID: item.id.toString()})}>
        <View style={styles.videoDetails}>
          <Text style={styles.videoTitle}>{item.title}</Text>
          <Text style={styles.videoTitle}>{item.id}</Text>

        </View>
        </TouchableOpacity>
      </View>  
      );

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => navigation.navigate('FavouriteListScreen')} style={styles.button}>
        <Text style={styles.buttonText}>View Favourites</Text>
      </TouchableOpacity>

      <FlatList
        data={videos}
        style={styles.videoList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'pink',
    marginTop: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
  videoList: {
    width: '100%',
  },
  videoContainer: {
    paddingTop:50,
    flexDirection: 'row',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  videoDetails: {
    flex: 1,
  },
  videoTitle: {
    fontWeight: 'bold',
    color: 'blue', 
    textDecorationLine: 'underline', 
  },
});