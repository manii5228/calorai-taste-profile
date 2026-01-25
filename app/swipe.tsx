import { View, StyleSheet, Dimensions } from 'react-native';
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
import SwipeActions from '@/components/SwipeActions';
import { foods } from '@/constants/foods';
import SwipeCard from '@/components/SwipeCard';
import ProgressBar from '@/components/ProgressBar';

const { width,height } = Dimensions.get('window');
const SWIPE_VERTICAL_THRESHOLD = height * 0.25;
const SWIPE_THRESHOLD = width * 0.25;

export default function SwipeScreen() {
  const [index, setIndex] = useState(0);
  const [likes, setLikes] = useState<number[]>([]);
  const [notSure, setNotSure] = useState<number[]>([]);
  const [superLikes, setSuperLikes] = useState<number[]>([]);
  const [dislikes, setDislikes] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const router = useRouter();

  const handleFinish = (finalLikes: number[], finalDislikes: number[], finalNotSure: number[], finalsuperLikes: number[]) => {
    router.replace({
      pathname: '/results',
      params: {
        likes: JSON.stringify(finalLikes),
        dislikes: JSON.stringify(finalDislikes),
        notSure: JSON.stringify(finalNotSure),
        superLikes: JSON.stringify(finalsuperLikes),
      },
    });
  };

  const onSwipeComplete = (direction: 'left' | 'right'| 'down'| 'up') => {
    const food = foods[index];
    if (!food) return;

    const newLikes =
      direction === 'right' ? [...likes, food.id] : likes;
    const newDislikes =
      direction === 'left' ? [...dislikes, food.id] : dislikes;
    const newNotSure =
      direction === 'up' ? [...notSure, food.id] : notSure;
    const newSuperLikes =
      direction === 'down' ? [...superLikes, food.id] : superLikes;

    setLikes(newLikes);
    setDislikes(newDislikes);
    setNotSure(newNotSure);
    setSuperLikes(newSuperLikes);
    translateX.value = 0;
    translateY.value = 0;

    if (index === foods.length - 1) {
      setFinished(true);
      runOnJS(handleFinish)(newLikes, newDislikes, newNotSure, newSuperLikes);
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
    translateY.value = withSpring(-width, {}, () =>
      runOnJS(onSwipeComplete)('up')
    );
  };

  const swipeDown = () => {
    translateY.value = withSpring(width, {}, () =>
      runOnJS(onSwipeComplete)('down')
    );
  }
  

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
    })
    .onEnd(() => {
      if (translateX.value > SWIPE_THRESHOLD) swipeRight();
      else if (translateX.value < -SWIPE_THRESHOLD) swipeLeft();
      else if (translateY.value > SWIPE_THRESHOLD) swipeDown();
      else if (translateY.value < -SWIPE_THRESHOLD) swipeUp();
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
        onNotSure={swipeUp}
        onSuperLike={swipeDown}
      />
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
