import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import GlassCard from '../components/GlassCard';

export default function IntroScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
           
   
           {/* Main Title */}
           <Text style={styles.mainTitle}>Design Your Food Plan</Text>
   
           {/* Glass Card Content */}
           <View style={styles.centerContent}>
             <GlassCard>
               <View style={styles.cardContent}>
                 {/* Emoji */}
                 <Text style={styles.emoji}>😋</Text>
   
                 {/* Card Title */}
                 <Text style={styles.cardTitle}>Build Your Taste Profile</Text>
   
                 {/* Card Description */}
                 <Text style={styles.cardDescription}>
                   Swipe right on foods you love, left on foods you donot.
                 </Text>
   
                 {/* Start Button */}
                 <TouchableOpacity 
                   style={styles.startButton}
                   onPress={() => router.push('/swipe')}
                 >
                   <Text style={styles.startButtonText}>Start Swiping</Text>
                 </TouchableOpacity>
   
                 {/* Footer Text */}
                 <Text style={styles.footerText}>Takes about 2 minutes.</Text>
               </View>
             </GlassCard>
           </View>
         </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 14,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#0B0B0F',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
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
});
