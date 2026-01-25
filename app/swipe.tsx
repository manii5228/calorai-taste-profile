import { View, Text, StyleSheet } from 'react-native';

export default function SwipeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Swipe Screen (Coming Next)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFF',
    fontSize: 18,
  },
});
