import React, { useState } from 'react';
import * as Device from 'expo-device';
import {
  Platform,
  StyleSheet,
  View,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { type ErrorBoundaryProps } from 'expo-router';

import { AnimatedIcon } from '@/components/animated-icon';
import { Button } from '@/components/Button';
import { ErrorBoundaryView } from '@/components/error-boundary-view';
import { HintRow } from '@/components/hint-row';
import { Sidebar } from '@/components/Sidebar';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function ErrorBoundary(props: ErrorBoundaryProps) {
  return <ErrorBoundaryView {...props} title="Home Screen Error" />;
}

function getDevMenuHint() {
  if (Platform.OS === 'web') {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }
  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }
  const shortcut = Platform.OS === 'android' ? 'cmd+m (or ctrl+m)' : 'cmd+d';
  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

const PLATFORMS = [
  {
    name: 'iOS & Android',
    tech: 'React Native + Expo CNG',
    status: 'Native Binary',
    description: 'Continuous Native Generation via Expo Prebuild with native tab navigation.',
  },
  {
    name: 'Web',
    tech: 'react-native-web + Expo Static',
    status: 'PWA / Static Web',
    description: 'SEO-ready static export bundled for browsers and search crawlers.',
  },
  {
    name: 'Windows',
    tech: 'WinUI 3 / Fluent Design',
    status: 'Desktop Native',
    description: 'Platform-adaptive sidebar and components adhering to Windows Fluent design.',
  },
  {
    name: 'macOS',
    tech: 'AppKit / Native Menus',
    status: 'Desktop Native',
    description: 'Native windowing and desktop menu integration for Apple Silicon and Intel.',
  },
  {
    name: 'Linux',
    tech: 'WebKitGTK + Tauri Shell',
    status: 'AppImage / DEB',
    description: 'Ultra-lightweight native Rust shell wrapping the optimized web bundle.',
  },
];

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;
  const theme = useTheme();

  const [activeTab, setActiveTab] = useState<'overview' | 'platforms' | 'interactive'>('overview');
  const [clickCount, setClickCount] = useState(0);

  const navItems = [
    { id: 'overview', label: 'Overview', active: activeTab === 'overview' },
    { id: 'platforms', label: '6 Platforms', active: activeTab === 'platforms' },
    { id: 'interactive', label: 'Interactive Demo', active: activeTab === 'interactive' },
  ];

  return (
    <ThemedView style={styles.root}>
      {isLargeScreen && (
        <Sidebar
          items={navItems}
          onSelect={(id) => setActiveTab(id as 'overview' | 'platforms' | 'interactive')}
          title="Falda SuperApp"
        />
      )}

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollArea}
      >
        <SafeAreaView style={styles.container}>
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <AnimatedIcon />
            <ThemedText type="title" style={styles.title}>
              Falda SuperApp
            </ThemedText>
            <ThemedText style={styles.subtitle} themeColor="textSecondary">
              One unified codebase running across iOS, Android, Web, Windows, macOS, and Linux.
            </ThemedText>

            <View style={[styles.platformBadge, { backgroundColor: theme.backgroundElement }]}>
              <ThemedText type="smallBold">
                ACTIVE PLATFORM: {Platform.OS.toUpperCase()} {Platform.isTV ? '(TV)' : ''}
              </ThemedText>
            </View>
          </View>

          {/* Interactive State Demo */}
          {(activeTab === 'overview' || activeTab === 'interactive') && (
            <ThemedView type="backgroundElement" style={styles.card}>
              <ThemedText type="subtitle">Interactive Component Demo</ThemedText>
              <ThemedText themeColor="textSecondary">
                State updates are synchronized universally across all 6 target platforms.
              </ThemedText>
              <ThemedText type="smallBold">
                Action counter: {clickCount} {clickCount === 1 ? 'time' : 'times'}
              </ThemedText>
              <View style={styles.buttonRow}>
                <Button
                  title="Increment"
                  onPress={() => setClickCount((c) => c + 1)}
                  variant="primary"
                />
                <Button
                  title="Reset Counter"
                  onPress={() => setClickCount(0)}
                  variant="secondary"
                />
              </View>
            </ThemedView>
          )}

          {/* 6-Platform Architecture Grid */}
          {(activeTab === 'overview' || activeTab === 'platforms') && (
            <View style={styles.gridSection}>
              <ThemedText type="subtitle" style={styles.sectionHeader}>
                Universal 6-Platform Targets
              </ThemedText>
              <View style={styles.grid}>
                {PLATFORMS.map((item) => (
                  <ThemedView key={item.name} type="backgroundElement" style={styles.platformCard}>
                    <View style={styles.platformCardHeader}>
                      <ThemedText type="smallBold" style={styles.platformName}>
                        {item.name}
                      </ThemedText>
                      <View style={styles.statusPill}>
                        <ThemedText style={styles.statusText}>{item.status}</ThemedText>
                      </View>
                    </View>
                    <ThemedText type="code" style={styles.platformTech}>
                      {item.tech}
                    </ThemedText>
                    <ThemedText type="small" themeColor="textSecondary">
                      {item.description}
                    </ThemedText>
                  </ThemedView>
                ))}
              </View>
            </View>
          )}

          {/* Developer Guidance */}
          {activeTab === 'overview' && (
            <ThemedView type="backgroundElement" style={styles.stepContainer}>
              <HintRow
                title="Unified Entrypoint"
                hint={<ThemedText type="code">src/app/index.tsx</ThemedText>}
              />
              <HintRow title="Dev tools" hint={getDevMenuHint()} />
              <HintRow
                title="Features & Docs"
                hint={<ThemedText type="code">src/app/explore.tsx</ThemedText>}
              />
            </ThemedView>
          )}

          {Platform.OS === 'web' && <WebBadge />}
        </SafeAreaView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.four,
    maxWidth: MaxContentWidth,
    width: '100%',
    alignSelf: 'center',
    gap: Spacing.four,
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.three,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    maxWidth: 520,
    lineHeight: 22,
  },
  platformBadge: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: Spacing.two,
    marginTop: Spacing.one,
  },
  card: {
    borderRadius: Spacing.four,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    flexWrap: 'wrap',
  },
  gridSection: {
    gap: Spacing.three,
  },
  sectionHeader: {
    marginBottom: Spacing.one,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
  },
  platformCard: {
    flexBasis: '47%',
    flexGrow: 1,
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  platformCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: Spacing.one,
  },
  platformName: {
    fontSize: 15,
  },
  platformTech: {
    fontSize: 12,
  },
  statusPill: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1d4ed8',
  },
  stepContainer: {
    gap: Spacing.three,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
});
