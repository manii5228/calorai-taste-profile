import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { foods as foodsData } from '../constants/foods';
import GlassView from '../components/GlassView';
import ItemCarousel from '../components/ItemCarousel';
import { useState } from 'react';

const { width } = Dimensions.get('window');

export default function ResultsScreen() {
  const { likes, dislikes, notSure, superLike } = useLocalSearchParams();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState(0);

  // Handle foods being either array or object with foods property
  const foods = Array.isArray(foodsData) ? foodsData : (foodsData as any).foods || [];

  const likedIds: number[] = likes ? JSON.parse(likes as string) : [];
  const dislikedIds: number[] = dislikes ? JSON.parse(dislikes as string) : [];
  const notSureIds: number[] = notSure ? JSON.parse(notSure as string) : [];
  const superLikeIds: number[] = superLike ? JSON.parse(superLike as string) : [];

  const likedFoods = foods.filter((f: any) => likedIds.includes(f.id));
  const dislikedFoods = foods.filter((f: any) => dislikedIds.includes(f.id));
  const notSureFoods = foods.filter((f: any) => notSureIds.includes(f.id));
  const superLikeFoods = foods.filter((f: any) => superLikeIds.includes(f.id));

  // Get top category preference
  const getTopCategory = () => {
    const allFoods = [...likedFoods];
    const categoryMap: Record<string, number> = {};
    allFoods.forEach((f: any) => {
      categoryMap[f.category] = (categoryMap[f.category] || 0) + 1;
    });
    const topCat = Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0];
    return topCat ? { name: topCat[0].charAt(0).toUpperCase() + topCat[0].slice(1), count: topCat[1] } : { name: 'N/A', count: 0 };
  };

  const topCategory = getTopCategory();

  const categories = [
    { id: 0, name: '♥ Foods You Love', emoji: '♥', items: likedFoods, icon: 'heart' },
    { id: 1, name: '⭐ Super Likes', emoji: '⭐', items: superLikeFoods, icon: 'heart' },
    { id: 2, name: '? Not Sure', emoji: '?', items: notSureFoods, icon: 'checkmark' },
    { id: 3, name: '😒 Foods You Hate', emoji: '😒', items: dislikedFoods, icon: 'cross' },
  ];

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / (width - 40));
    setActiveCategory(Math.min(index, categories.length - 1));
  };

 

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.logoContainer}>
        <View style={styles.beatsLogo} />
      </View>

      <Text style={styles.title}>Your Taste Profile</Text>

      {/* Summary Stats */}
      <GlassCard title="Summary">
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{superLikeFoods.length}</Text>
            <Text style={styles.statLabel}>Super Likes</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{likedFoods.length}</Text>
            <Text style={styles.statLabel}>Likes</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{notSureFoods.length}</Text>
            <Text style={styles.statLabel}>Not Sure</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{dislikedFoods.length}</Text>
            <Text style={styles.statLabel}>Dislikes</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.topCategory}>
          <Text style={styles.topCategoryLabel}>Top Category</Text>
          <Text style={styles.topCategoryName}>{topCategory.name}</Text>
          <Text style={styles.topCategoryCount}>{topCategory.count} items</Text>
        </View>
      </GlassCard>

      {/* Category Carousel Slider */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        style={styles.categoryCarousel}
      >
        {categories.map((category) => (
          <View key={category.id} style={{ width: width - 40 }}>
            {category.items.length > 0 ? (
              <ItemCarousel
                title={category.name}
                emoji={category.emoji}
                items={category.items}
                iconType={category.icon as 'heart' | 'checkmark' | 'cross'}
              />
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  No items in this category
                </Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Category Dots */}
      <View style={styles.categoryDotsContainer}>
        {categories.map((_, index) => (
          <View
            key={index}
            style={[
              styles.categoryDot,
              activeCategory === index && styles.activeCategoryDot,
            ]}
          />
        ))}
      </View>

      {/* Footer Buttons - Stacked Vertically */}
      <View style={styles.footerButtons}>
        <TouchableOpacity
          style={styles.retakeButton}
          onPress={() => router.push('/swipe')}
        >
          <Text style={styles.retakeButtonText}>Retake Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
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
    paddingBottom: 100,
  },
  logoContainer: {
    position: 'absolute',
    top: 50,
    right: 30,
    zIndex: 10,
  },
  beatsLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#22C55E',
    opacity: 0.9,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 18,
    letterSpacing: 0.2,
  },
  card: {
    padding: 18,
    marginBottom: 18,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#22C55E',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginVertical: 14,
  },
  topCategory: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  topCategoryLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 6,
  },
  topCategoryName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  topCategoryCount: {
    fontSize: 13,
    color: '#22C55E',
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  categoryName: {
    fontSize: 15,
    color: '#E5E7EB',
    fontWeight: '500',
  },
  categoryCount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22C55E',
  },
  footerButtons: {
    flexDirection: 'column',
    gap: 12,
    marginTop: 24,
    marginBottom: 20,
  },
  retakeButton: {
    width: '100%',
    backgroundColor: '#22C55E',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  retakeButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
  },
  shareButton: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1.5,
    borderColor: '#22C55E',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareButtonText: {
    color: '#22C55E',
    fontSize: 16,
    fontWeight: '700',
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
