import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { useState } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import SwipeActions from '../components/SwipeActions';
import SwipeIndicator from '../components/SwipeIndicator';
import { foods } from '../constants/foods';
import SwipeCard from '../components/SwipeCard';
import ProgressBar from '../components/ProgressBar';

const { width,height } = Dimensions.get('window');
const SWIPE_VERTICAL_THRESHOLD = height * 0.25;
const SWIPE_THRESHOLD = width * 0.25;

export default function SwipeScreen() {
  const [index, setIndex] = useState(0);
  const [likes, setLikes] = useState<number[]>([]);
  const [dislikes, setDislikes] = useState<number[]>([]);
  const [superLike, setsuperLike] = useState<number[]>([]);
  const [notSure, setNotSure] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const swipeDirection = useSharedValue<'left' | 'right' | 'up' | 'down' | 'none'>('none');
  const router = useRouter();
  const handleFinish = (
    finalLikes: number[],
    finalDislikes: number[],
    finalsuperLike: number[],
    finalNotSure: number[]
  ) => {
    router.replace({
      pathname: '/results',
      params: {
        likes: JSON.stringify(finalLikes),
        dislikes: JSON.stringify(finalDislikes),
        superLike: JSON.stringify(finalsuperLike),
        notSure: JSON.stringify(finalNotSure),
      },
    });
  };

  const onSwipeComplete = (direction: 'left' | 'right' | 'up' | 'down') => {
    const food = foods[index];
    if (!food) return;

    const newLikes = direction === 'right' ? [...likes, food.id] : likes;
    const newDislikes = direction === 'left' ? [...dislikes, food.id] : dislikes;
    const newsuperLike = direction === 'up' ? [...superLike, food.id] : superLike;
    const newNotSure = direction === 'down' ? [...notSure, food.id] : notSure;

    setLikes(newLikes);
    setDislikes(newDislikes);
    setsuperLike(newsuperLike);
    setNotSure(newNotSure);
    translateX.value = 0;
    translateY.value = 0;

    if (index === foods.length - 1) {
      setFinished(true);
      runOnJS(handleFinish)(newLikes, newDislikes, newsuperLike, newNotSure);
    } else {
      setIndex(prev => prev + 1);
    }
  };

  const handleSwipeComplete = (direction: 'left' | 'right' | 'up' | 'down') => {
    onSwipeComplete(direction);
  };

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      'worklet';
      translateX.value = e.translationX;
      translateY.value = e.translationY;

      // Determine swipe direction
      const absX = Math.abs(e.translationX);
      const absY = Math.abs(e.translationY);

      if (absX > absY) {
        // Horizontal swipe
        if (e.translationX > 50) {
          swipeDirection.value = 'right';
        } else if (e.translationX < -50) {
          swipeDirection.value = 'left';
        } else {
          swipeDirection.value = 'none';
        }
      } else {
        // Vertical swipe
        if (e.translationY > 50) {
          swipeDirection.value = 'down';
        } else if (e.translationY < -50) {
          swipeDirection.value = 'up';
        } else {
          swipeDirection.value = 'none';
        }
      }
    })
    .onEnd(() => {
      'worklet';
      swipeDirection.value = 'none';
      const transX = translateX.value;
      const transY = translateY.value;

      if (transX > SWIPE_THRESHOLD) {
        translateX.value = withSpring(width, {}, () =>
          runOnJS(handleSwipeComplete)('right')
        );
      } else if (transX < -SWIPE_THRESHOLD) {
        translateX.value = withSpring(-width, {}, () =>
          runOnJS(handleSwipeComplete)('left')
        );
      } else if (transY > SWIPE_VERTICAL_THRESHOLD) {
        translateY.value = withSpring(height, {}, () =>
          runOnJS(handleSwipeComplete)('down')
        );
      } else if (transY < -SWIPE_VERTICAL_THRESHOLD) {
        translateY.value = withSpring(-height, {}, () =>
          runOnJS(handleSwipeComplete)('up')
        );
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-width / 2, 0, width / 2],
      [-15, 0, 15],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotateZ: `${rotate}deg` },
      ],
    };
  });

  if (finished) {
    return <View style={styles.container} />;
  }

 

  if (finished) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
     

      <Text style={styles.mainTitle}>Design Your Food Plan</Text>

      <ProgressBar progress={index / foods.length} />

      <View style={styles.cardWrapper}>
        {/* Swipe Indicators */}
        <SwipeIndicator direction={swipeDirection} />

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

      <SwipeActions
        onLike={() => {
          translateX.value = withSpring(width, {}, () =>
            runOnJS(handleSwipeComplete)('right')
          );
        }}
        onDislike={() => {
          translateX.value = withSpring(-width, {}, () =>
            runOnJS(handleSwipeComplete)('left')
          );
        }}
        onSuperLike={() => {
          translateY.value = withSpring(-height, {}, () =>
            runOnJS(handleSwipeComplete)('up')
          );
        }}
        onNotSure={() => {
          translateY.value = withSpring(height, {}, () =>
            runOnJS(handleSwipeComplete)('down')
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0F',
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
    backgroundColor: '#00FF00',
    opacity: 0.8,
  },
  mainTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '600',
    paddingTop: 80,
    paddingHorizontal: 20,
    marginBottom: 20,
    textAlign: 'left',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  cardContent: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 60,
    marginBottom: 16,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  cardDescription: {
    color: '#C0C0C0',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 28,
    maxWidth: 280,
  },
  startButton: {
    backgroundColor: '#00FF00',
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 24,
    marginBottom: 16,
  },
  startButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  footerText: {
    color: '#808080',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
  },
  cardWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
