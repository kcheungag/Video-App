import { db } from "../config/firebaseApp";
import { collection, getDocs, addDoc, writeBatch} from "firebase/firestore";

const FAVORITES_COLLECTION = "Favourite";

export const getFavorites = async (_callback) => {
  try {
    const querySnapshot = await getDocs(collection(db, FAVORITES_COLLECTION));
    const favorites = [];
    querySnapshot.forEach((doc) => {
      // Push each document data to favorites array
      favorites.push({ id: doc.id, ...doc.data() });
    });
    // Call the callback function with favorites data
    _callback(favorites, null);
  } catch (err) {
    console.log("getFavorites", err);
    // Call the callback function with error if any
    _callback(null, err);
  }
};

  
  export const addFavourite = async (videoData, videoID) => {
    try {
      // Add a new document with videoData to the "bookings" collection
      const favouriteData = {
        ...videoData,
        videoID: videoID 
      };
      const docRef = await addDoc(collection(db,  FAVORITES_COLLECTION), favouriteData);
      console.log("Favourite added with ID: ", docRef.id);
      return docRef.id; // Return the ID of the newly added favourite
    } catch (error) {
      console.error("Error adding favourite: ", error);
      throw error; // Throw the error for handling in the caller function
    }
  };

  export const clearFavorites = async (_callback) => {
    try {
        const querySnapshot = await getDocs(collection(db, FAVORITES_COLLECTION));
        const batch = writeBatch(db);
        
        querySnapshot.forEach((doc) => {
            batch.delete(doc.ref);
        });

        await batch.commit();

        console.log("Favorites collection cleared successfully");
        if (_callback) _callback(null); // Call the callback function if provided, passing null for success
    } catch (error) {
        console.error("Error clearing favorites collection:", error);
        if (_callback) _callback(error); // Call the callback function if provided, passing the error object
    }
};
