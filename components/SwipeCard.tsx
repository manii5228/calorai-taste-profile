import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { Image } from 'expo-image';
import GlassView from './GlassView';

type Props = {
  name: string;
  image: string;
};

export default function SwipeCard({ name, image }: Props) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    // Reset loading state when image URL changes
    setImageLoading(true);
    setImageError(false);
    setRetryCount(0);
  }, [image]);

  const handleImageError = (error: any) => {
    console.error('Image loading failed:', error, 'for URL:', image);
    
    // Retry up to 2 times
    if (retryCount < 2) {
      setRetryCount(prev => prev + 1);
      setImageLoading(true);
      return;
    }
    
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
    setRetryCount(0);
  };

  return (
    <GlassView intensity={30} radius={24}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {imageLoading && !imageError && (
            <ActivityIndicator 
              size="large" 
              color="#22C55E" 
              style={styles.loader}
            />
          )}
          <Image
            key={`${image}-${retryCount}`}
            source={{ uri: image }}
            style={[styles.image, imageError && { opacity: 0 }]}
            onLoadStart={() => setImageLoading(true)}
            onLoadEnd={handleImageLoad}
            onError={handleImageError}
            contentFit="cover"
            transition={300}
            cachePolicy="memory-disk"
            priority="high"
          />
          {imageError && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>📸</Text>
              <Text style={styles.errorText}>Image not available</Text>
              <Text style={styles.errorSubtext}>{name}</Text>
            </View>
          )}
        </View>
        <Text style={styles.title}>{name}</Text>
      </View>
    </GlassView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 420,
    width: 340,
    padding: 18,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },
  imageContainer: {
    width: '100%',
    height: 320,
    borderRadius: 14,
    marginBottom: 14,
    backgroundColor: '#1a1a1f',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
  },
  loader: {
    position: 'absolute',
    zIndex: 10,
  },
  errorContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    textAlign: 'center',
  },
  errorSubtext: {
    color: '#9CA3AF',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
  },
});

