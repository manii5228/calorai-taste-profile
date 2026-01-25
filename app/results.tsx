import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { foods } from '@/constants/foods';
import GlassView from '@/components/GlassView';

export default function ResultsScreen() {
  const { likes, dislikes, notSure, superLike } = useLocalSearchParams();

  const likedIds: number[] = likes ? JSON.parse(likes as string) : [];
  const dislikedIds: number[] = dislikes ? JSON.parse(dislikes as string) : [];
  const notSureIds: number[] = notSure ? JSON.parse(notSure as string) : [];
  const superLikeIds: number[] = superLike ? JSON.parse(superLike as string) : [];

  const likedFoods = foods.filter(f => likedIds.includes(f.id));
  const dislikedFoods = foods.filter(f => dislikedIds.includes(f.id));
  const notSureFoods = foods.filter(f => notSureIds.includes(f.id));
  const superLikeFoods = foods.filter(f => superLikeIds.includes(f.id));

 

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Your Taste Profile</Text>

      <GlassCard title="Summary">
        <Text style={styles.stat}>Liked {likedFoods.length} foods</Text>
        <Text style={styles.stat}>Disliked {dislikedFoods.length} foods</Text>
        <Text style={styles.stat}>Not Sure {notSureFoods.length} foods</Text>
        <Text style={styles.stat}>Super Liked {superLikeFoods.length} foods</Text>
      </GlassCard>

      <GlassCard title="Not Sure">
        {notSureFoods.map(food => (
          <Text key={food.id} style={styles.item}>
            {food.name}
          </Text>
        ))}
      </GlassCard>

      <GlassCard title="Super Like">
        {superLikeFoods.map(food => (
          <Text key={food.id} style={styles.item}>
            {food.name}
          </Text>
        ))}
      </GlassCard>

      <GlassCard title="You Like">
        {likedFoods.map(food => (
          <Text key={food.id} style={styles.item}>
            {food.name}
          </Text>
        ))}
      </GlassCard>

      <GlassCard title="You Dislike">
        {dislikedFoods.map(food => (
          <Text key={food.id} style={styles.itemMuted}>
            {food.name}
          </Text>
        ))}
      </GlassCard>
    </ScrollView>
  );
}

/* ---------- Glass Section ---------- */

function GlassCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <GlassView intensity={22} radius={20}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{title}</Text>
        {children}
      </View>
    </GlassView>
  );
}

/* ---------- Styles (Figma-aligned) ---------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0F',
  },
  content: {
    padding: 20,
    paddingBottom: 48,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  card: {
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  stat: {
    color: '#E5E7EB',
    fontSize: 15,
    marginBottom: 6,
  },
  item: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 6,
  },
  itemMuted: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 6,
  },
  muted: {
    color: '#9CA3AF',
    fontSize: 13,
  },
});
