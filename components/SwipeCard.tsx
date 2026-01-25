import { View, Text, Image, StyleSheet } from 'react-native';
import GlassView from './GlassView';

type Props = {
  name: string;
  image: any;
};

export default function SwipeCard({ name, image }: Props) {
  return (
    <GlassView intensity={30} radius={24}>
      <View style={styles.container}>
        <Image source={image} style={styles.image} />
        <Text style={styles.title}>{name}</Text>
      </View>
    </GlassView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 320,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
