import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import type { SidebarProps } from './Sidebar';

/**
 * Windows Native / WinUI 3 Specific Sidebar Override
 * Adheres to Fluent Design System standards (Mica-inspired style, pill indicator, accent colors)
 */
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
            {item.active && <View style={styles.indicator} />}
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
    width: 260,
    backgroundColor: '#f3f3f3', // Fluent NavigationPane background
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
    paddingVertical: 24,
    paddingHorizontal: 12,
    height: '100%',
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: '#5c5c5c',
    letterSpacing: 0.5,
    marginBottom: 14,
    paddingHorizontal: 8,
  },
  list: {
    gap: 4,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 5,
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
    left: 2,
    width: 3,
    height: 16,
    borderRadius: 2,
    backgroundColor: '#0078d4', // Windows Accent Blue
  },
  itemActive: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  itemPressed: {
    backgroundColor: '#eaeaea',
  },
  itemText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#1b1b1b',
    marginLeft: 6,
  },
  itemTextActive: {
    color: '#0078d4',
    fontWeight: '600',
  },
});
