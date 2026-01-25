import { StyleSheet } from 'react-native';
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
      style={[styles.container, { borderRadius: radius }, style]}
    >
      {children}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
});
