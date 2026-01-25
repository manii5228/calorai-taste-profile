import { View, Pressable, StyleSheet, Text } from 'react-native';
import * as Haptics from 'expo-haptics';


type Props = {
  onLike: () => void;
  onDislike: () => void;
  onSuperLike: () => void;
  onNotSure: () => void;
};

export default function SwipeActions({ onLike, onDislike, onSuperLike, onNotSure }: Props) {
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, styles.dislike]}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          onDislike();
        }}
      >
        <Text style={styles.icon}>✕</Text>
      </Pressable>

      <Pressable
        style={[styles.button, styles.notSure]}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          onNotSure();
        }}
      >
        <Text style={styles.icon}>?</Text>
      </Pressable>

      <Pressable
        style={[styles.button, styles.superLike]}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          onSuperLike();
        }}
      >
        <Text style={styles.icon}>★</Text>
      </Pressable>

      <Pressable
        style={[styles.button, styles.like]}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          onLike();
        }}
      >
        <Text style={styles.icon}>♥</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  dislike: {
    backgroundColor: '#EF4444', // red
  },
  like: {
    backgroundColor: '#22C55E', // green
  },
  notSure: {
    backgroundColor: '#6B7280', // gray
  },
  superLike: {
    backgroundColor: '#3B82F6', // blue
  },
  icon: {
    fontSize: 28,
    color: '#FFF',
    fontWeight: '600',
  },
});
