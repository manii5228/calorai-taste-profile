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
      {/* First glass layer - provides base glass effect */}
      <View style={[styles.glassLayer1, { borderRadius: radius }]}>
        {/* Second glass layer - adds depth and shimmer */}
        <View style={[styles.glassLayer2, { borderRadius: radius }]}>
          {/* Content wrapper */}
          <View style={styles.contentWrapper}>
            {children}
          </View>
        </View>
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  glassLayer1: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    padding: 0,
    overflow: 'hidden',
  },
  glassLayer2: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  contentWrapper: {
    flex: 1,
  },
});
