import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Platform,
} from 'react-native';
import { Button } from '../components/Button';
import { Sidebar } from '../components/Sidebar';

export function HomeScreen() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;
  const [activeTab, setActiveTab] = useState('overview');
  const [clickCount, setClickCount] = useState(0);

  const navItems = [
    { id: 'overview', label: 'Overview', active: activeTab === 'overview' },
    { id: 'platforms', label: '6 Platforms', active: activeTab === 'platforms' },
    { id: 'settings', label: 'Settings', active: activeTab === 'settings' },
  ];

  return (
    <View style={styles.root}>
      {isLargeScreen && (
        <Sidebar
          items={navItems}
          onSelect={(id) => setActiveTab(id)}
          title="Falda SuperApp"
        />
      )}

      <ScrollView
        contentContainerStyle={styles.content}
        style={styles.scrollArea}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Universal 6-Platform Architecture</Text>
          <Text style={styles.subtitle}>
            One codebase running natively on iOS, Android, Web, Windows, macOS, and Linux.
          </Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              Platform: {Platform.OS.toUpperCase()} {Platform.isTV ? '(TV)' : ''}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Interactive Component Demo</Text>
          <Text style={styles.cardBody}>
            Pressed count: {clickCount} times
          </Text>
          <View style={styles.buttonRow}>
            <Button
              title="Primary Action"
              onPress={() => setClickCount((c) => c + 1)}
              variant="primary"
            />
            <Button
              title="Reset"
              onPress={() => setClickCount(0)}
              variant="secondary"
            />
          </View>
        </View>

        <View style={styles.grid}>
          <PlatformCard
            name="iOS & Android"
            tech="React Native + Expo CNG"
            status="Native Binary"
          />
          <PlatformCard
            name="Web"
            tech="react-native-web + Expo Static"
            status="PWA / Static Web"
          />
          <PlatformCard
            name="Windows"
            tech="WinUI 3 / react-native-windows"
            status="MSI / AppX"
          />
          <PlatformCard
            name="macOS"
            tech="AppKit / react-native-macos"
            status="DMG / App"
          />
          <PlatformCard
            name="Linux"
            tech="react-native-web + Tauri Shell"
            status="AppImage / DEB"
          />
        </View>
      </ScrollView>
    </View>
  );
}

function PlatformCard({
  name,
  tech,
  status,
}: {
  name: string;
  tech: string;
  status: string;
}) {
  return (
    <View style={styles.platformCard}>
      <Text style={styles.platformName}>{name}</Text>
      <Text style={styles.platformTech}>{tech}</Text>
      <View style={styles.statusPill}>
        <Text style={styles.statusText}>{status}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
  },
  scrollArea: {
    flex: 1,
  },
  content: {
    padding: 24,
    maxWidth: 960,
    width: '100%',
    alignSelf: 'center',
    gap: 20,
  },
  header: {
    gap: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 24,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#e2e8f0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  cardBody: {
    fontSize: 15,
    color: '#475569',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  platformCard: {
    flexBasis: '48%',
    flexGrow: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 8,
  },
  platformName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
  },
  platformTech: {
    fontSize: 13,
    color: '#64748b',
  },
  statusPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#dbeafe',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1d4ed8',
  },
});
