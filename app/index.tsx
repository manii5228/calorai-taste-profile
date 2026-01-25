import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import GlassCard from '../components/GlassCard';

export default function IntroScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <GlassCard>
        <Text style={styles.title}>Discover Your Taste</Text>
        <Text style={styles.subtitle}>
          Swipe foods you love or dislike so CalorAI can personalize your meals.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/swipe')}
        >
          <Text style={styles.buttonText}>Start Swiping</Text>
        </TouchableOpacity>
      </GlassCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#0B0B0F',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#22C55E',
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
});
