import { StyleSheet, View, Platform } from 'react-native';
import { BlurView } from 'expo-blur';

type Props = {
  children: React.ReactNode;
};

export default function GlassCard({ children }: Props) {
  if (Platform.OS === 'android') {
    return <View style={styles.android}>{children}</View>;
  }

  return (
    <BlurView intensity={25} tint="dark" style={styles.ios}>
      {children}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  ios: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
  },
  android: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: 24,
  },
});
