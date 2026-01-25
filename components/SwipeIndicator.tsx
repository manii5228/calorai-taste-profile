import { View, Text, StyleSheet } from 'react-native';

type Props = {
  direction: any;
};

export default function SwipeIndicator({ direction }: Props) {

  return (
    <View style={styles.container}>
      {/* Top Indicator (Up) */}
      {direction.value === 'up' && (
        <View style={[styles.indicator, styles.topIndicator, { backgroundColor: '#3B82F6' }]}>
          <Text style={[styles.label, styles.pillLabel]}>Superlike ⭐</Text>
        </View>
      )}

      {/* Bottom Indicator (Down) */}
      {direction.value === 'down' && (
        <View style={[styles.indicator, styles.bottomIndicator, { backgroundColor: '#6B7280' }]}>
          <Text style={[styles.label, styles.pillLabel]}>Unsure</Text>
        </View>
      )}

      {/* Left Indicator */}
      {direction.value === 'left' && (
        <View style={[styles.indicator, styles.leftIndicator, styles.circle, { backgroundColor: '#EF4444' }]}>
          <Text style={[styles.label, styles.circleLabel]}>No</Text>
        </View>
      )}

      {/* Right Indicator */}
      {direction.value === 'right' && (
        <View style={[styles.indicator, styles.rightIndicator, styles.circle, { backgroundColor: '#22C55E' }]}>
          <Text style={[styles.label, styles.circleLabel]}>Yes</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
    pointerEvents: 'none',
  },
  indicator: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  topIndicator: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
  },
  bottomIndicator: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
  },
  leftIndicator: {
    position: 'absolute',
    left: 20,
    top: '50%',
    marginTop: -40,
  },
  rightIndicator: {
    position: 'absolute',
    right: 20,
    top: '50%',
    marginTop: -40,
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: '700',
    color: '#FFFFFF',
  },
  pillLabel: {
    fontSize: 14,
  },
  circleLabel: {
    fontSize: 24,
  },
});
