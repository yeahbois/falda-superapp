import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';

export interface NavItem {
  id: string;
  label: string;
  icon?: string;
  active?: boolean;
}

export interface SidebarProps {
  items: NavItem[];
  onSelect?: (id: string) => void;
  title?: string;
}

export function Sidebar({ items, onSelect, title = 'Navigation' }: SidebarProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.list}>
        {items.map((item) => (
          <Pressable
            key={item.id}
            accessibilityRole="button"
            onPress={() => onSelect?.(item.id)}
            style={({ pressed }) => [
              styles.item,
              item.active && styles.itemActive,
              pressed && styles.itemPressed,
            ]}
          >
            <Text
              style={[
                styles.itemText,
                item.active && styles.itemTextActive,
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 240,
    backgroundColor: '#ffffff',
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
    paddingVertical: 20,
    paddingHorizontal: 16,
    height: '100%',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 16,
  },
  list: {
    gap: 6,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    cursor: Platform.select({ web: 'pointer', default: undefined }),
  },
  itemActive: {
    backgroundColor: '#e0f2fe',
  },
  itemPressed: {
    backgroundColor: '#f3f4f6',
  },
  itemText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#374151',
  },
  itemTextActive: {
    color: '#0284c7',
    fontWeight: '600',
  },
});
