import React from 'react';
import { View, StyleSheet } from 'react-native';
import { router, type ErrorBoundaryProps } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/Button';
import { Spacing, MaxContentWidth } from '@/constants/theme';

interface ErrorViewProps extends ErrorBoundaryProps {
  title?: string;
}

export function ErrorBoundaryView({ error, retry, title = 'Something went wrong' }: ErrorViewProps) {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.card}>
        <ThemedText type="subtitle" style={styles.title}>
          {title}
        </ThemedText>

        <ThemedText style={styles.message} themeColor="textSecondary">
          {error?.message || 'An unexpected error occurred while loading this view.'}
        </ThemedText>

        <View style={styles.actions}>
          <Button
            title="Try Again"
            variant="primary"
            onPress={retry}
          />
          <Button
            title="Go to Home"
            variant="outline"
            onPress={() => router.replace('/')}
          />
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.four,
  },
  card: {
    maxWidth: MaxContentWidth,
    width: '100%',
    alignItems: 'center',
    gap: Spacing.three,
  },
  title: {
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    lineHeight: 22,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginTop: Spacing.two,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
