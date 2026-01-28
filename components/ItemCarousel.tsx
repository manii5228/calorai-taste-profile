import { View, Text, StyleSheet } from 'react-native';

type Props = {
  title: string;
  emoji: string;
  items: { id: number; name: string }[];
  iconType: 'heart' | 'checkmark' | 'cross';
};

export default function ItemCarousel({ title, emoji, items, iconType }: Props) {
  if (items.length === 0) {
    return null;
  }

  const getIcon = () => {
    switch (iconType) {
      case 'heart':
        return '♥';
      case 'checkmark':
        return '✓';
      case 'cross':
        return '✕';
      default:
        return '•';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {emoji} {title}
        </Text>
      </View>

      <View style={styles.listContainer}>
        {items.map((item) => (
          <View key={item.id} style={styles.listItem}>
            <View style={styles.iconCircle}>
              <Text style={[styles.icon, { color: '#FFFFFF' }]}>
                {getIcon()}
              </Text>
            </View>
            <Text style={styles.itemName}>{item.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 20,
    overflow: 'hidden',
    paddingBottom: 8,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 0,
  },
  listContainer: {
    paddingHorizontal: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    marginBottom: 4,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 16,
    fontWeight: '700',
  },
  itemName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#E5E7EB',
    flex: 1,
  },
});
