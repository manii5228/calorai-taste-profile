import { StyleSheet, View, Platform, Text } from 'react-native';
import { BlurView } from 'expo-blur';

type Props = {
  children: React.ReactNode;
  title?: string;
};

export default function GlassCard({ children, title }: Props) {
  if (Platform.OS === 'android') {
    return (
      <View style={styles.android}>
        {title && <Text style={styles.title}>{title}</Text>}
        {children}
      </View>
    );
  }

  return (
    <BlurView intensity={20} tint="dark" style={styles.ios}>
      {title && <Text style={styles.title}>{title}</Text>}
      {children}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  ios: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    overflow: 'hidden',

    shadowOpacity: 0.35,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
  },
  android: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
});
