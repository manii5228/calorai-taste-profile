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
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
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
