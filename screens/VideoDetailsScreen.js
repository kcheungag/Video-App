import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { fetchVideoByID } from '../controllers/VideoAPI';
import { addFavourite } from '../controllers/FavouritesDB';

const VideoDetailsScreen = ({ route, navigation }) => {
  const id = route.params;
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        console.log('Route params:', route.params);
        const data = await fetchVideoByID(id);
        console.log('Fetched videoData:', data);
        setVideoData(data);
      } catch (error) {
        console.error('Error fetching video details:', error);
      }
    };

    fetchVideoDetails();
  }, [id]);

  const handleAddToFavourites = () => {
    if (videoData && id) { // Ensure videoData and id are defined
      addFavourite(videoData, id);
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {videoData && (
        <>
          <View style={styles.videoContainer}>
            <Image source={{ uri: videoData.thumbnail_240_url }} style={styles.videoImage} />
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>{videoData.title}</Text>
            <TouchableOpacity onPress={handleAddToFavourites} style={styles.addButton}>
              <Text style={styles.addButtonText}>Add to Favorites</Text>
            </TouchableOpacity>
            <Text style={styles.description}>{videoData.description}</Text>
            <Text style={styles.views}>{videoData.views_total} views</Text>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default VideoDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoContainer: {
    paddingTop:50,
    width: '100%',
    aspectRatio: 16 / 9, // Assuming the video aspect ratio is 16:9
    marginBottom: 10,
  },
  videoImage: {
    width: '100%',
    aspectRatio: 16 / 9, // Assuming the video aspect ratio is 16:9
    resizeMode: 'cover',
  },
  detailsContainer: {
    paddingTop:50,
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  addButton: {
    backgroundColor: 'pink',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  addButtonText: {
    fontWeight: 'bold',
  },
  description: {
    marginBottom: 10,
  },
  views: {
    color: 'grey',
    fontSize: 12,
  },
});
