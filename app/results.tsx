import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function ResultsScreen() {
  const { likes, dislikes } = useLocalSearchParams();

  const likedFoods = likes ? JSON.parse(likes as string) : [];
  const dislikedFoods = dislikes ? JSON.parse(dislikes as string) : [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Taste Profile</Text>

      <Text style={styles.label}>Liked</Text>
      <Text style={styles.value}>{likedFoods.length}</Text>

      <Text style={styles.label}>Disliked</Text>
      <Text style={styles.value}>{dislikedFoods.length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 24,
  },
  label: {
    color: '#aaa',
    marginTop: 16,
  },
  value: {
    color: '#fff',
    fontSize: 20,
  },
});
