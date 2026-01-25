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
    width: 340,
    padding: 18,
  },
  image: {
    width: '100%',
    height: 240,
    borderRadius: 14,
    marginBottom: 14,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
});
