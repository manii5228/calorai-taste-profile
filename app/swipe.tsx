import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
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
import { foods } from '../constants/foods';
import SwipeCard from '../components/SwipeCard';
import ProgressBar from '../components/ProgressBar';
import GlassCard from '../components/GlassCard';

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
  const [showOnboarding, setShowOnboarding] = useState(true);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
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

  const onSwipeComplete = (direction: 'left' | 'right'| 'up'| 'down') => {
    const food = foods[index];
    if (!food) return;

    const newLikes =
      direction === 'right' ? [...likes, food.id] : likes;
    const newDislikes =
      direction === 'left' ? [...dislikes, food.id] : dislikes;
    const newsuperLike =
      direction === 'up' ? [...superLike, food.id] : superLike;
    const newNotSure =
      direction === 'down' ? [...notSure, food.id] : notSure;
    
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

  const swipeUp = () => {
    translateY.value = withSpring(-height, {}, () =>
      runOnJS(onSwipeComplete)('up')
    );
  };

  const swipeDown = () => {
    translateY.value = withSpring(height, {}, () =>
      runOnJS(onSwipeComplete)('down')
    );
  };

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
    })
    .onEnd(() => {
      if (translateX.value > SWIPE_THRESHOLD) swipeRight();
      else if (translateX.value < -SWIPE_THRESHOLD) swipeLeft();
      else if (translateY.value > SWIPE_VERTICAL_THRESHOLD) swipeDown();
      else if (translateY.value < -SWIPE_VERTICAL_THRESHOLD) swipeUp();
      else {
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
      <ProgressBar progress={index / foods.length} />

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

      <SwipeActions
        onLike={swipeRight}
        onDislike={swipeLeft}
        onSuperLike={swipeUp}
        onNotSure={swipeDown}
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
