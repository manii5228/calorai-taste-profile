import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import GlassView from './GlassView';

type Props = {
  name: string;
  image: string;
};

export default function SwipeCard({ name, image }: Props) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

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
            source={{ uri: image }}
            style={styles.image}
            onLoadStart={() => setImageLoading(true)}
            onLoadEnd={() => setImageLoading(false)}
            onError={() => {
              setImageError(true);
              setImageLoading(false);
            }}
          />
          {imageError && (
            <Text style={styles.errorText}>Image not available</Text>
          )}
        </View>
        <Text style={styles.title}>{name}</Text>
      </View>
    </GlassView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 340,
    padding: 18,
  },
  imageContainer: {
    width: '100%',
    height: 240,
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
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    textAlign: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
});
