import { View, StyleSheet, Dimensions } from 'react-native';
import { useState } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';

import SwipeActions from '@/components/SwipeActions';
import { foods } from '../constants/foods';
import SwipeCard from '../components/SwipeCard';
import ProgressBar from '../components/ProgressBar';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.25;

export default function SwipeScreen() {
  const [index, setIndex] = useState(0);
  const [likes, setLikes] = useState<number[]>([]);
  const [dislikes, setDislikes] = useState<number[]>([]);
  const router = useRouter();

  const translateX = useSharedValue(0);

  const onSwipeComplete = (direction: 'left' | 'right') => {
  const food = foods[index];
  if (!food) return;

  if (direction === 'right') {
    setLikes(prev => [...prev, food.id]);
  } else {
    setDislikes(prev => [...prev, food.id]);
  }

  translateX.value = 0;

  if (index + 1 >= foods.length) {
    router.replace({
      pathname: '/results',
      params: {
        likes: JSON.stringify([...likes, direction === 'right' ? food.id : null].filter(Boolean)),
        dislikes: JSON.stringify([...dislikes, direction === 'left' ? food.id : null].filter(Boolean)),
      },
    });
    return;
  }

  setIndex(prev => prev + 1);
};

  
  const swipeLeft = () => {
    translateX.value = withSpring(-width, {}, () =>
      runOnJS(onSwipeComplete)('left')
    );
  };

  const swipeRight = () => {
    translateX.value = withSpring(width, {}, () =>
      runOnJS(onSwipeComplete)('right')
    );
  };

  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      translateX.value = event.translationX;
    })
    .onEnd(() => {
      if (translateX.value > SWIPE_THRESHOLD) {
        translateX.value = withSpring(width, {}, () =>
          runOnJS(onSwipeComplete)('right')
        );
      } else if (translateX.value < -SWIPE_THRESHOLD) {
        translateX.value = withSpring(-width, {}, () =>
          runOnJS(onSwipeComplete)('left')
        );
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const progress = index / foods.length;

  return (
  <View style={styles.container}>
    <ProgressBar progress={progress} />

    <View style={styles.cardWrapper}>
      {foods[index] && (
        <GestureDetector gesture={panGesture}>
          <Animated.View style={animatedStyle}>
            <SwipeCard
              name={foods[index].name}
              image={foods[index].image}
            />
          </Animated.View>
        </GestureDetector>
      )}
    </View>

    <SwipeActions onLike={swipeRight} onDislike={swipeLeft} />
  </View>
);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0F',
  },
  cardWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
