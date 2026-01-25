import { View, Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  onLike: () => void;
  onDislike: () => void;
};

export default function SwipeActions({ onLike, onDislike }: Props) {
  return (
    <View style={styles.container}>
      <Pressable style={[styles.button, styles.dislike]} onPress={onDislike}>
        <Text style={styles.icon}>✕</Text>
      </Pressable>

      <Pressable style={[styles.button, styles.like]} onPress={onLike}>
        <Text style={styles.icon}>♥</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 48,
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  dislike: {
    backgroundColor: '#EF4444',
  },
  like: {
    backgroundColor: '#22C55E',
  },
  icon: {
    fontSize: 28,
    color: '#FFF',
    fontWeight: '600',
  },
});
