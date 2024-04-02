export const fetchVideos = async () => {
    const apiURL = `https://api.dailymotion.com/user/x1audmk/videos?limit=20`;
    try {
        const response = await fetch(apiURL);
        if (response.ok) {
            const data = await response.json();
            console.log('Fetched videos:', data);
            return data;        
        } else {
            throw new Error(`Unsuccessful response from server, Status Code: ${response.status}`);
        }
    } catch (error) {
        console.error(`Error occurred while connecting to API: ${error}`);
        return [];
    }
};

export const fetchVideoByID = async ({videoID}) => {
    const apiURL = `https://api.dailymotion.com/video/${videoID}?fields=thumbnail_240_url,description,views_total,title,created_time`;
    try {
        console.log('Received ID:', videoID);
        const response = await fetch(apiURL);
        if (response.ok) {
            const data = await response.json();
            console.log(`Fetched video by ID ${videoID}:`, data);
            return data;
        } else {
            throw new Error(`Unsuccessful response from server, Status Code: ${response.status}`);
        }
    } catch (error) {
        console.error(`Error occurred while connecting to API: ${error}`);
        return null;
    }
};
