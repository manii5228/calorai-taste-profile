import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

type Props = {
  name: string;
  image: string;
};

export default function SwipeCard({ name, image }: Props) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.label}>
        <Text style={styles.text}>{name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width * 0.9,
    height: width * 1.2,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  label: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 12,
    borderRadius: 12,
  },
  text: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '600',
  },
});
