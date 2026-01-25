import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useState } from 'react';

const { width } = Dimensions.get('window');

type Props = {
  title: string;
  emoji: string;
  items: { id: number; name: string }[];
  iconType: 'heart' | 'checkmark' | 'cross';
};

export default function ItemCarousel({ title, emoji, items, iconType }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemsPerSlide = 5;
  const totalSlides = Math.ceil(items.length / itemsPerSlide);
  const carouselWidth = width - 40;

  if (items.length === 0) {
    return null;
  }

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / carouselWidth);
    setActiveIndex(Math.min(index, totalSlides - 1));
  };

  const getIcon = () => {
    switch (iconType) {
      case 'heart':
        return '♥';
      case 'checkmark':
        return '✓';
      case 'cross':
        return '✕';
      default:
        return '•';
    }
  };

  const getIconColor = () => {
    switch (iconType) {
      case 'heart':
      case 'checkmark':
      case 'cross':
        return '#3B82F6';
      default:
        return '#9CA3AF';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {emoji} {title}
        </Text>
      </View>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        style={styles.carousel}
      >
        {Array.from({ length: totalSlides }).map((_, slideIndex) => {
          const startIdx = slideIndex * itemsPerSlide;
          const endIdx = startIdx + itemsPerSlide;
          const slideItems = items.slice(startIdx, endIdx);

          return (
            <View key={slideIndex} style={[styles.slide, { width: carouselWidth }]}>
              {slideItems.map((item) => (
                <View key={item.id} style={styles.listItem}>
                  <View style={[styles.iconCircle, { borderColor: getIconColor() }]}>
                    <Text style={[styles.icon, { color: getIconColor() }]}>
                      {getIcon()}
                    </Text>
                  </View>
                  <Text style={styles.itemName}>{item.name}</Text>
                </View>
              ))}
            </View>
          );
        })}
      </ScrollView>

      {/* Dots Indicator */}
      {totalSlides > 1 && (
        <View style={styles.dotsContainer}>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                activeIndex === index && styles.activeDot,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  carousel: {
    marginHorizontal: -20,
  },
  slide: {
    paddingHorizontal: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  icon: {
    fontSize: 16,
    fontWeight: '700',
  },
  itemName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#E5E7EB',
    flex: 1,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  activeDot: {
    backgroundColor: '#22C55E',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
