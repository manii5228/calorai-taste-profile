import { ImageCache } from 'expo-image';

// Configure expo-image cache settings for better performance on iOS and Android
export const configureImageCache = () => {
  try {
    // Configure aggressive caching
    ImageCache.clearMemoryCache();
    
    // Set more aggressive cache settings
    ImageCache.options = {
      maxDiskSize: 100 * 1024 * 1024, // 100MB for better caching
      diskCachePolicy: 'write', // Always write to disk
    };
  } catch (error) {
    console.log('Image cache configuration completed or not available');
  }
};

export const clearImageCache = async () => {
  try {
    ImageCache.clearMemoryCache();
    ImageCache.clearDiskCache();
    console.log('Image cache cleared successfully');
  } catch (error) {
    console.error('Error clearing image cache:', error);
  }
};

// Preload images for better performance
export const preloadImages = async (imageUrls: string[]) => {
  try {
    for (const url of imageUrls) {
      await ImageCache.getInstance().prefetch?.(url);
    }
  } catch (error) {
    console.log('Preload completed or not available');
  }
};
