import { StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';

type Props = {
  children: React.ReactNode;
  intensity?: number;
  radius?: number;
  style?: object;
};

export default function GlassView({ children, intensity = 20, radius = 16, style = {} }: Props) {
  return (
    <BlurView
      intensity={intensity}
      tint="dark"
      style={[styles.blurContainer, { borderRadius: radius }, style]}
    >
      {/* Shimmer effect overlay */}
      <View style={[styles.shimmerOverlay, { borderRadius: radius }]} pointerEvents="none" />
      
      {/* Content container - allows images to show through */}
      <View style={styles.contentContainer}>
        {children}
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  shimmerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  contentContainer: {
    flex: 1,
    overflow: 'visible',
  },
});
