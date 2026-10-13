import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import type { ChipBarProps } from '../mobile.types';

export function ChipBar(props: ChipBarProps) {
  const { items, selectedId, colors, onSelect } = props;
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {items.map((item) => {
        const selected = item.id === selectedId;
        return (
          <Pressable
            key={item.id}
            onPress={() => onSelect(item.id)}
            style={[styles.chip, { backgroundColor: selected ? colors.blue : colors.surface, borderColor: colors.line }]}
          >
            <Text style={{ color: selected ? colors.white : colors.ink, fontWeight: '700' }}>{item.label}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { gap: 8, paddingVertical: 8 },
  chip: { borderWidth: 1, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 8 },
});
