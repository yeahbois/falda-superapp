import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
  Platform,
} from 'react-native';

export interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  testID?: string;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
  testID,
}: ButtonProps) {
  return (
    <Pressable
      testID={testID}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
      onPress={disabled || loading ? undefined : onPress}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        pressed && !disabled && !loading && styles[`${variant}Pressed`],
        (disabled || loading) && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? '#ffffff' : '#0066cc'}
        />
      ) : (
        <Text
          style={[
            styles.baseText,
            styles[`${variant}Text`],
            disabled && styles.disabledText,
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    cursor: Platform.select({ web: 'pointer', default: undefined }),
    transitionProperty: Platform.select({ web: 'all', default: undefined }),
    transitionDuration: Platform.select({ web: '150ms', default: undefined }),
  } as ViewStyle,
  primary: {
    backgroundColor: '#0066cc',
  },
  primaryPressed: {
    backgroundColor: '#0052a3',
  },
  secondary: {
    backgroundColor: '#f0f4f8',
  },
  secondaryPressed: {
    backgroundColor: '#e1e8f0',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#0066cc',
  },
  outlinePressed: {
    backgroundColor: 'rgba(0, 102, 204, 0.08)',
  },
  disabled: {
    opacity: 0.5,
    cursor: Platform.select({ web: 'not-allowed', default: undefined }),
  } as ViewStyle,
  baseText: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: '#ffffff',
  },
  secondaryText: {
    color: '#1a1f36',
  },
  outlineText: {
    color: '#0066cc',
  },
  disabledText: {
    color: '#8c9ba5',
  },
});
