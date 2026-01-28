import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { foods as foodsData, cuisines as cuisinesData } from '../constants/foods';
import GlassView from '../components/GlassView';
import ItemCarousel from '../components/ItemCarousel';
import { useState } from 'react';
import { buildTasteProfile } from '../utils/tasteProfiler';
import { getDietType, getLifestyleHighlights, getTopCuisines } from '../utils/insigths';

const { width } = Dimensions.get('window');

export default function ResultsScreen() {
  const { likes, dislikes, notSure, superLike } = useLocalSearchParams();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState(0);

  // Handle foods being either array or object with foods property
  const foods = Array.isArray(foodsData) ? foodsData : (foodsData as any).foods || [];
  const cuisines = Array.isArray(cuisinesData) ? cuisinesData : (cuisinesData as any).cuisines || [];

  const likedIds: number[] = likes ? JSON.parse(likes as string) : [];
  const dislikedIds: number[] = dislikes ? JSON.parse(dislikes as string) : [];
  const notSureIds: number[] = notSure ? JSON.parse(notSure as string) : [];
  const superLikeIds: number[] = superLike ? JSON.parse(superLike as string) : [];

  const likedFoods = foods.filter((f: any) => likedIds.includes(f.id));
  const dislikedFoods = foods.filter((f: any) => dislikedIds.includes(f.id));
  const notSureFoods = foods.filter((f: any) => notSureIds.includes(f.id));
  const superLikeFoods = foods.filter((f: any) => superLikeIds.includes(f.id));

  // Build taste profile using utility function
  const profile = buildTasteProfile(foods, likedIds, superLikeIds, notSureIds, cuisines);
  const dietType = getDietType(profile.tagScores);
  const highlights = getLifestyleHighlights(profile.tagScores);
  const topCuisineNames = getTopCuisines(profile.cuisineScores);
  const topCuisines = cuisines.filter((c: any) => topCuisineNames.includes(c.name));

  // Get top categories for highlights
  const getTopCategories = () => {
    const categoryMap: Record<string, number> = {};
    foods.forEach((f: any) => {
      if (likedIds.includes(f.id)) {
        categoryMap[f.category] = (categoryMap[f.category] || 0) + 1;
      }
    });
    return Object.entries(categoryMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([cat, count]) => ({
        name: cat.charAt(0).toUpperCase() + cat.slice(1),
        emoji: getEmojiForyCategory(cat),
      }));
  };

  const getEmojiForyCategory = (category: string) => {
    const emojiMap: Record<string, string> = {
      vegetables: '🥬',
      fruits: '🍎',
      grains: '🌾',
      protein: '🍗',
      dairy: '🥛',
      oils: '🫗',
      spices: '🌶️',
      carb: '🌾',
    };
    return emojiMap[category.toLowerCase()] ;
  };

  const topCategories = getTopCategories();

  // Lifestyle goals (derived from preferences)
  const lifestyleGoals = [];
  if (superLikeFoods.length > 5) lifestyleGoals.push('Active');
  if (likedFoods.length > 6) lifestyleGoals.push('Fitness Focused');
  if (notSureFoods.length > 3) lifestyleGoals.push('Experimental');
  if (dislikedFoods.length > 4) lifestyleGoals.push('Picky Eater');
  if (likedFoods.some((f: any) => f.category === 'vegetables')) lifestyleGoals.push('Health Conscious');

  if (lifestyleGoals.length === 0) {
    lifestyleGoals.push('Food Explorer', 'Balanced Diet');
  }

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
    <View style={styles.container}>

      {/* MAIN SCROLL VIEW FOR ALL CONTENT */}
      <ScrollView style={styles.mainScroll} showsVerticalScrollIndicator={false}>
        
        {/* Title */}
        <Text style={styles.title}>Your Taste Profile</Text>

        {/* SECTION 1: Key Highlights - Horizontal Carousel (Diet + Cuisines + Categories) */}
        <View style={styles.highlightsSection}>
          <Text style={styles.sectionTitle}>Key Highlights</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            style={styles.highlightsCarousel}
          >
            {/* Diet Type Item */}
            <View style={styles.highlightItem}>
              <View style={styles.dietBadge}>
                <Text style={styles.dietBadgeText}>{dietType}</Text>
              </View>
              <Text style={styles.highlightLabel}>Diet Style</Text>
            </View>

            {/* Cuisines Items */}
            {topCuisines.map((cuisine: any) => (
              <View key={`cuisine-${cuisine.id}`} style={styles.highlightItem}>
                <Text style={styles.highlightEmoji}>{cuisine.emoji}</Text>
                <Text style={styles.highlightLabel}>{cuisine.name}</Text>
              </View>
            ))}

            {/* Food Categories Items */}
            {topCategories.map((cat, idx) => (
              <View key={`cat-${idx}`} style={styles.highlightItem}>
                <Text style={styles.highlightEmoji}>{cat.emoji}</Text>
                <Text style={styles.highlightLabel}>{cat.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* SECTION 2: Taste Highlights */}
        {highlights.length > 0 && (
          <View style={styles.lifestyleSection}>
            <GlassCard title="Taste Highlights">
              <View style={styles.goalsContainer}>
                {highlights.map((highlight, idx) => (
                  <View key={idx} style={styles.highlightListItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.highlightListText}>{highlight}</Text>
                  </View>
                ))}
              </View>
            </GlassCard>
          </View>
        )}

        {/* SECTION 4: Food Categories Carousel */}
        <Text style={styles.sectionTitle}>Foods You Love</Text>
        <View style={styles.categoryCarouselWrapper}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={handleScroll}
            style={styles.categoryCarousel}
            scrollEnabled={true}
            decelerationRate="fast"
            snapToInterval={width - 40}
            snapToAlignment="center"
          >
            {categories.map((category) => (
              <View key={category.id} style={[styles.categorySlide, { width: width - 40 }]}>
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
        </View>

      </ScrollView>

      {/* Footer Buttons - Always at Bottom */}
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
    </View>
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
  mainScroll: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 24,
    letterSpacing: 0.2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    marginTop: 28,
  },
  card: {
    padding: 20,
    marginBottom: 24,
    borderRadius: 24,
    overflow: 'hidden',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  dietTypeText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  dietBadge: {
    backgroundColor: '#22C55E',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  dietBadgeText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  cuisinesRow: {
    flexDirection: 'row',
    gap: 20,
  },
  cuisineItem: {
    alignItems: 'center',
  },
  cuisineEmoji: {
    fontSize: 36,
    marginBottom: 6,
  },
  cuisineLabel: {
    color: '#E5E7EB',
    fontSize: 14,
    fontWeight: '500',
  },
  highlightsSection: {
    marginBottom: 28,
    borderRadius: 24,
    overflow: 'hidden',
  },
  highlightsCarousel: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  highlightItem: {
    marginHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  highlightEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  highlightLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#E5E7EB',
    textAlign: 'center',
  },
  lifestyleSection: {
    backgroundColor: 'transparent',
    marginBottom: 28,
    borderRadius: 24,
    overflow: 'hidden',
  },
  goalsContainer: {
    gap: 12,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  goalCheckmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  goalCheckmarkText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  goalText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#E5E7EB',
  },
  highlightListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bullet: {
    color: '#22C55E',
    marginRight: 8,
    fontSize: 18,
  },
  highlightListText: {
    color: '#E5E7EB',
    fontSize: 15,
  },
  categoryCarouselWrapper: {
    marginBottom: 100,
    borderRadius: 24,
    overflow: 'hidden',
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
  categoryCarousel: {
    marginHorizontal: -20,
  },
  categorySlide: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  categoryDotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
    marginTop: 8,
  },
  categoryDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  activeCategoryDot: {
    backgroundColor: '#22C55E',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '500',
  },
  footerButtons: {
    flexDirection: 'column',
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: 20,
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
