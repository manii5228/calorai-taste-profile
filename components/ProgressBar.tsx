import { View, StyleSheet } from 'react-native';

type Props = {
  progress: number;
};

export default function ProgressBar({ progress }: Props) {
  return (
    <View style={styles.container}>
      <View style={[styles.fill, { width: `${progress * 100}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 999,
    overflow: 'hidden',
    marginHorizontal: 24,
    marginTop: 16,
  },
  fill: {
    height: '100%',
    backgroundColor: '#22C55E',
  },
});
